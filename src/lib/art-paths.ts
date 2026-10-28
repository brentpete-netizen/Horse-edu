import { existsSync } from "node:fs";
import path from "node:path";
import { withBasePath } from "@/lib/base-path";

export type ArtKind = "colors" | "features";

const EXTS = [".webp", ".png", ".jpg", ".jpeg"] as const;

/** When Grok export names differ from catalog slugs, try these stems too. */
const ART_FILE_ALIASES: Partial<Record<ArtKind, Record<string, string[]>>> = {
  colors: {
    paint: ["tobiano_pinto", "overo_pinto"],
    appaloosa: ["appaloosa_blanket", "leopard_appaloosa"],
  },
};

function resolveFileStem(
  kind: ArtKind,
  dir: string,
  stem: string,
): string | null {
  for (const ext of EXTS) {
    if (existsSync(path.join(dir, `${stem}${ext}`))) {
      return withBasePath(`/${kind}/${stem}${ext}`);
    }
  }
  return null;
}

/** Public URL for Grok Imagine art if the file exists under public/{kind}/. */
export function resolveArtPath(kind: ArtKind, slug: string): string | null {
  const dir = path.join(process.cwd(), "public", kind);
  const direct = resolveFileStem(kind, dir, slug);
  if (direct) return direct;

  for (const alias of ART_FILE_ALIASES[kind]?.[slug] ?? []) {
    const hit = resolveFileStem(kind, dir, alias);
    if (hit) return hit;
  }
  return null;
}

export function resolveArtPathMap(
  kind: ArtKind,
  slugs: string[],
): Record<string, string | null> {
  const map: Record<string, string | null> = {};
  for (const slug of slugs) {
    map[slug] = resolveArtPath(kind, slug);
  }
  return map;
}
