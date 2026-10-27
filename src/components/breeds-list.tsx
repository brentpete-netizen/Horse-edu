import { BreedsBrowse } from "@/components/breeds-browse";
import { getLocalReadyBreeds } from "@/lib/breeds/content";
import { getReadyBreeds } from "@/lib/breeds/notion";
import { allowNotionBreeds } from "@/lib/site-mode";
import type { Breed } from "@/lib/breeds/types";

async function loadBrowseBreeds(): Promise<{
  breeds: Breed[];
  source: "notion" | "local";
  message?: string;
}> {
  if (allowNotionBreeds()) {
    const notion = await getReadyBreeds();
    if (notion.status === "ok" && notion.breeds.length > 0) {
      return { breeds: notion.breeds, source: "notion" };
    }
  }

  const local = await getLocalReadyBreeds();
  if (local.length > 0) {
    return { breeds: local, source: "local" };
  }

  return {
    breeds: [],
    source: "local",
    message:
      "No Ready breeds yet. Add markdown under content/breeds, or set NOTION_API_KEY for live Notion (Vercel).",
  };
}

export async function BreedsList() {
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
