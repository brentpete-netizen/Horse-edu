import { existsSync } from "node:fs";
import path from "node:path";

export type ArtKind = "colors" | "features";

const EXTS = [".webp", ".png", ".jpg", ".jpeg"] as const;

/** Public URL for Grok Imagine art if the file exists under public/{kind}/. */
export function resolveArtPath(kind: ArtKind, slug: string): string | null {
  const dir = path.join(process.cwd(), "public", kind);
  for (const ext of EXTS) {
    if (existsSync(path.join(dir, `${slug}${ext}`))) {
      return `/${kind}/${slug}${ext}`;
    }
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
