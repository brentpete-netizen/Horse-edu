import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const curated = JSON.parse(
  readFileSync(join(root, "scripts/curated-breed-images.json"), "utf8"),
);
const outDir = join(root, "public/breeds");
mkdirSync(outDir, { recursive: true });

const meta = {};
for (const [slug, img] of Object.entries(curated)) {
  if (img.error || !img.fileUrl) {
    console.error("skip", slug, img.error);
    continue;
  }
  const ext = (img.mime || "image/jpeg").includes("png")
    ? "png"
    : (img.mime || "").includes("webp")
      ? "webp"
      : "jpg";
  const filename = `${slug}.${ext}`;
  const dest = join(outDir, filename);
  const res = await fetch(img.fileUrl, {
    headers: { "User-Agent": "HorseEduBot/1.0 (educational; local project)" },
  });
  if (!res.ok) {
    console.error("download fail", slug, res.status);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  meta[slug] = {
    ...img,
    localPath: `/breeds/${filename}`,
    bytes: buf.length,
  };
  console.log(slug, buf.length, "bytes ->", filename);
  await new Promise((r) => setTimeout(r, 400));
}

writeFileSync(
  join(root, "scripts/breed-image-meta.json"),
  JSON.stringify(meta, null, 2),
);
console.log("Wrote breed-image-meta.json (", Object.keys(meta).length, ")");
