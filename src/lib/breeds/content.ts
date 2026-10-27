import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { slugifyBreedName } from "./slug";
import type { Breed } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "breeds");

function sectionBody(markdown: string, heading: string): string | null {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `## ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n## |\\n---|$)`,
    "i",
  );
  const match = markdown.match(re);
  if (!match) return null;
  const body = match[1]
    .trim()
    .replace(/\n+$/, "")
    .replace(/^[-*]\s+/gm, "")
    .trim();
  return body || null;
}

function tableValue(markdown: string, label: string): string | null {
  const re = new RegExp(
    `\\|\\s*\\*\\*${label}\\*\\*\\s*\\|\\s*(.+?)\\s*\\|`,
    "i",
  );
  const match = markdown.match(re);
  if (!match) return null;
  return match[1]
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*/g, "")
    .trim();
}

function markdownLinkUrl(cell: string): string | null {
  const match = cell.match(/\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
  return match?.[1] ?? null;
}

function splitList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function sourcesPlain(markdown: string): string | null {
  const body = sectionBody(markdown, "Sources");
  if (!body) return null;
  return body
    .split("\n")
    .map((line) =>
      line
        .replace(/^[-*]\s+/, "")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
        .trim(),
    )
    .filter(Boolean)
    .join("\n");
}

/** Local `/breeds/...` path or absolute URL from Image notes / table. */
function imageUrlFromMarkdown(markdown: string): string | null {
  const imageSection = sectionBody(markdown, "Image notes") ?? "";
  const mdImage = imageSection.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
  if (mdImage?.[1]) return mdImage[1].trim();

  const tableImage = tableValue(markdown, "Image");
  if (tableImage && (/^https?:\/\//i.test(tableImage) || tableImage.startsWith("/"))) {
    return tableImage;
  }
  return null;
}

function parseBreedMarkdown(slug: string, markdown: string): Breed | null {
  const titleMatch = markdown.match(/^#\s+(.+)\s*$/m);
  if (!titleMatch) return null;

  const name = titleMatch[1].trim();
  const associationCell = markdown.match(
    /\|\s*\*\*Official association\*\*\s*\|\s*(.+?)\s*\|/i,
  )?.[1];

  return {
    id: `local:${slug}`,
    name,
    slug: slugifyBreedName(name) || slug,
    status: "Ready",
    type: tableValue(markdown, "Type"),
    origin: tableValue(markdown, "Origin"),
    temperament: tableValue(markdown, "Temperament"),
    primaryUses: splitList(tableValue(markdown, "Primary uses")),
    typicalColors: splitList(tableValue(markdown, "Typical colors")),
    heightHands:
      tableValue(markdown, "Height")?.replace(/\s*hands\b/i, "").trim() ?? null,
    shortDescription: sectionBody(markdown, "Overview"),
    keyCharacteristics: sectionBody(markdown, "Key characteristics"),
    historyNotes: sectionBody(markdown, "History"),
    sources: sourcesPlain(markdown),
    officialAssociation: associationCell
      ? markdownLinkUrl(associationCell)
      : null,
    imageUrl: imageUrlFromMarkdown(markdown),
    lastUpdated: null,
  };
}

/** Ready breed pages exported under content/breeds/*.md */
export async function getLocalReadyBreeds(): Promise<Breed[]> {
  let files: string[];
  try {
    files = await readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const breeds: Breed[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/i, "");
    const markdown = await readFile(path.join(CONTENT_DIR, file), "utf8");
    const breed = parseBreedMarkdown(slug, markdown);
    if (breed) breeds.push(breed);
  }

  return breeds.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getLocalReadyBreedBySlug(
  slug: string,
): Promise<Breed | null> {
  const breeds = await getLocalReadyBreeds();
  return breeds.find((b) => b.slug === slug) ?? null;
}
