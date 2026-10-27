import { connection } from "next/server";
import { BreedsBrowse } from "@/components/breeds-browse";
import { getLocalReadyBreeds } from "@/lib/breeds/content";
import { getReadyBreeds } from "@/lib/breeds/notion";
import type { Breed } from "@/lib/breeds/types";

async function loadBrowseBreeds(): Promise<{
  breeds: Breed[];
  source: "notion" | "local";
  message?: string;
}> {
  const notion = await getReadyBreeds();
  if (notion.status === "ok" && notion.breeds.length > 0) {
    return { breeds: notion.breeds, source: "notion" };
  }

  const local = await getLocalReadyBreeds();
  if (local.length > 0) {
    return { breeds: local, source: "local" };
  }

  if (notion.status === "missing_credentials") {
    return {
      breeds: [],
      source: "local",
      message:
        "No local breed pages in content/breeds, and Notion is not connected. Add Ready markdown exports or set NOTION_API_KEY.",
    };
  }

  if (notion.status === "error") {
    return {
      breeds: [],
      source: "local",
      message: notion.message ?? "Could not load breeds.",
    };
  }

  return {
    breeds: [],
    source: "local",
    message:
      "No Ready breeds yet. Mark a breed Ready in Notion, or add a markdown export under content/breeds.",
  };
}

export async function BreedsList() {
  await connection();
  const { breeds, source, message } = await loadBrowseBreeds();

  if (breeds.length === 0) {
    return (
      <div className="rounded-md border border-[var(--brand)]/15 bg-white/40 px-5 py-6 text-[var(--muted)]">
        <p className="font-medium text-[var(--foreground)]">
          No published breeds yet
        </p>
        <p className="mt-2 text-sm leading-relaxed">{message}</p>
      </div>
    );
  }

  return <BreedsBrowse breeds={breeds} source={source} />;
}
