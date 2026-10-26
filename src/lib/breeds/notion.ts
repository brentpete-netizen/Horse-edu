import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client";
import { slugifyBreedName } from "./slug";
import type { Breed, BreedsResult } from "./types";

const READY_STATUS = "Ready";

/** Horse Breeds data source (collection) id — public identifier, not a secret. */
export const DEFAULT_DATA_SOURCE_ID =
  "a52b7896-d472-4792-ad64-542b24a2f3ce";

/** Horse Breeds database id from the Notion URL — public identifier, not a secret. */
export const DEFAULT_DATABASE_ID = "6da68778-bc0d-4252-a722-19ad9f7ca46b";

function getCredentials():
  | { ok: true; apiKey: string; dataSourceId: string }
  | { ok: false; message: string } {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      message:
        "NOTION_API_KEY is not set. Add a Notion internal integration token and share the Horse Breeds database with it.",
    };
  }

  const dataSourceId =
    process.env.NOTION_DATA_SOURCE_ID?.trim() || DEFAULT_DATA_SOURCE_ID;

  return { ok: true, apiKey, dataSourceId };
}

function richTextToPlain(
  items: PageObjectResponse["properties"][string] | undefined,
): string | null {
  if (!items) return null;
  if (items.type === "title") {
    const text = items.title.map((t) => t.plain_text).join("").trim();
    return text || null;
  }
  if (items.type === "rich_text") {
    const text = items.rich_text.map((t) => t.plain_text).join("").trim();
    return text || null;
  }
  return null;
}

function selectName(
  prop: PageObjectResponse["properties"][string] | undefined,
): string | null {
  if (!prop) return null;
  if (prop.type === "select") return prop.select?.name ?? null;
  if (prop.type === "status") return prop.status?.name ?? null;
  return null;
}

function multiSelectNames(
  prop: PageObjectResponse["properties"][string] | undefined,
): string[] {
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select.map((o) => o.name);
}

function urlValue(
  prop: PageObjectResponse["properties"][string] | undefined,
): string | null {
  if (!prop || prop.type !== "url") return null;
  return prop.url;
}

function dateStart(
  prop: PageObjectResponse["properties"][string] | undefined,
): string | null {
  if (!prop || prop.type !== "date") return null;
  return prop.date?.start ?? null;
}

function firstFileUrl(
  prop: PageObjectResponse["properties"][string] | undefined,
): string | null {
  if (!prop || prop.type !== "files" || prop.files.length === 0) return null;
  const file = prop.files[0];
  if (file.type === "external") return file.external.url;
  if (file.type === "file") return file.file.url;
  return null;
}

export function pageToBreed(page: PageObjectResponse): Breed | null {
  const props = page.properties;
  const name = richTextToPlain(props.Name);
  if (!name) return null;

  return {
    id: page.id,
    name,
    slug: slugifyBreedName(name),
    status: selectName(props.Status),
    type: selectName(props.Type),
    origin: selectName(props.Origin),
    temperament: selectName(props.Temperament),
    primaryUses: multiSelectNames(props["Primary uses"]),
    typicalColors: multiSelectNames(props["Typical colors"]),
    heightHands: richTextToPlain(props["Height (hands)"]),
    shortDescription: richTextToPlain(props["Short description"]),
    keyCharacteristics: richTextToPlain(props["Key characteristics"]),
    historyNotes: richTextToPlain(props["History notes"]),
    sources: richTextToPlain(props.Sources),
    officialAssociation: urlValue(props["Official association"]),
    imageUrl: firstFileUrl(props.Image),
    lastUpdated: dateStart(props["Last updated"]),
  };
}

async function queryReadyPages(
  client: Client,
  dataSourceId: string,
): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = [];
  let startCursor: string | undefined;

  do {
    const response = await client.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: startCursor,
      page_size: 100,
      filter: {
        property: "Status",
        select: { equals: READY_STATUS },
      },
      sorts: [{ property: "Name", direction: "ascending" }],
    });

    for (const result of response.results) {
      if (isFullPage(result)) {
        pages.push(result);
      }
    }

    startCursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (startCursor);

  return pages;
}

/**
 * Fetch breeds with Status = Ready from Notion.
 * Soft-fails when credentials are missing or the API errors — never throws for missing env.
 */
export async function getReadyBreeds(): Promise<BreedsResult> {
  const credentials = getCredentials();
  if (!credentials.ok) {
    console.warn(`[breeds] ${credentials.message}`);
    return {
      breeds: [],
      status: "missing_credentials",
      message: credentials.message,
    };
  }

  try {
    const client = new Client({ auth: credentials.apiKey });
    const pages = await queryReadyPages(client, credentials.dataSourceId);
    const breeds = pages
      .map(pageToBreed)
      .filter((b): b is Breed => b !== null);

    if (breeds.length === 0) {
      return {
        breeds: [],
        status: "empty",
        message:
          "No breeds with Status = Ready yet. Mark breeds as Ready in Notion to publish them.",
      };
    }

    return { breeds, status: "ok" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Notion API error";
    console.error("[breeds] Notion query failed:", message);
    return {
      breeds: [],
      status: "error",
      message: `Could not load breeds from Notion: ${message}`,
    };
  }
}

export async function getReadyBreedBySlug(
  slug: string,
): Promise<{ breed: Breed | null; status: BreedsResult["status"]; message?: string }> {
  const result = await getReadyBreeds();
  if (result.status !== "ok") {
    return { breed: null, status: result.status, message: result.message };
  }
  const breed = result.breeds.find((b) => b.slug === slug) ?? null;
  return {
    breed,
    status: breed ? "ok" : "empty",
    message: breed ? undefined : "Breed not found or not Ready.",
  };
}
