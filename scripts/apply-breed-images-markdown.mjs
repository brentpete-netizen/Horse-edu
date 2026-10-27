import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const curated = JSON.parse(
  readFileSync(join(root, "scripts/curated-breed-images.json"), "utf8"),
);
const metaPath = join(root, "scripts/breed-image-meta.json");
let meta = {};
try {
  meta = JSON.parse(readFileSync(metaPath, "utf8"));
} catch {
  /* optional */
}

const breedsDir = join(root, "content/breeds");

function attributionBlock(slug, img) {
  const localOrRemote = meta[slug]?.localPath || img.fileUrl;
  const credit = [img.artist, img.license].filter(Boolean).join(" · ");
  return `## Image notes

![${slug}](${localOrRemote})

Photo: ${credit}. Source: [Wikimedia Commons](${img.commonsPage}). Freely licensed for educational use with attribution; not from Wikipedia encyclopedia text.`;
}

for (const file of readdirSync(breedsDir)) {
  if (!file.endsWith(".md")) continue;
  const slug = file.replace(/\.md$/i, "");
  const img = curated[slug];
  if (!img || img.error || !img.fileUrl) {
    console.log("no curated image for", slug);
    continue;
  }
  const path = join(breedsDir, file);
  let md = readFileSync(path, "utf8");
  const block = attributionBlock(slug, img);
  if (/## Image notes[\s\S]*?(?=\n---\n|\n*$)/i.test(md)) {
    md = md.replace(/## Image notes[\s\S]*?(?=\n---\n)/i, `${block}\n\n`);
  } else {
    md = md.replace(/\n---\n/, `\n${block}\n\n---\n`);
  }
  writeFileSync(path, md);
  console.log("updated", slug, "->", meta[slug]?.localPath || "commons url");
}
