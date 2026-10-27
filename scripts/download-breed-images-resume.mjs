import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const curated = JSON.parse(
  readFileSync(join(root, "scripts/curated-breed-images.json"), "utf8"),
);
const metaPath = join(root, "scripts/breed-image-meta.json");
const meta = existsSync(metaPath)
  ? JSON.parse(readFileSync(metaPath, "utf8"))
  : {};
const outDir = join(root, "public/breeds");
mkdirSync(outDir, { recursive: true });

for (const [slug, img] of Object.entries(curated)) {
  if (meta[slug]?.localPath) {
    console.log("have", slug);
    continue;
  }
  if (img.error || !img.fileUrl) continue;

  let ok = false;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const ext = (img.mime || "image/jpeg").includes("png") ? "png" : "jpg";
    const filename = `${slug}.${ext}`;
    const dest = join(outDir, filename);
    // Prefer Commons thumbnail ~1600px for large originals
    const url =
      (img.width || 0) > 2500
        ? img.fileUrl.replace(
            /\/commons\//,
            "/commons/thumb/",
          ) // may not work for all; fall back to original
        : img.fileUrl;

    let fetchUrl = img.fileUrl;
    // Use Special:FilePath redirect which is stable
    const title = img.title.replace(/^File:/, "");
    fetchUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title)}?width=1600`;

    console.log("fetch", slug, "attempt", attempt);
    const res = await fetch(fetchUrl, {
      headers: { "User-Agent": "HorseEduBot/1.0 (educational; local project)" },
      redirect: "follow",
    });
    if (res.status === 429) {
      console.log("429, wait", attempt * 8, "s");
      await new Promise((r) => setTimeout(r, attempt * 8000));
      continue;
    }
    if (!res.ok) {
      console.error("fail", slug, res.status);
      break;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    meta[slug] = {
      ...img,
      localPath: `/breeds/${filename}`,
      bytes: buf.length,
      downloadedFrom: fetchUrl,
    };
    writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    console.log(slug, buf.length, "bytes");
    ok = true;
    break;
  }
  if (!ok) console.error("gave up", slug);
  await new Promise((r) => setTimeout(r, 5000));
}

console.log("done", Object.keys(meta).length);
