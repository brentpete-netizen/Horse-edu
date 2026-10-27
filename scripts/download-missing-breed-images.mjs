import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const curated = JSON.parse(
  readFileSync(join(root, "scripts/curated-breed-images.json"), "utf8"),
);
const outDir = join(root, "public/breeds");
mkdirSync(outDir, { recursive: true });

const missing = Object.entries(curated).filter(([slug]) => {
  return !(
    existsSync(join(outDir, `${slug}.jpg`)) ||
    existsSync(join(outDir, `${slug}.png`))
  );
});

console.log("Missing", missing.length);

for (const [slug, img] of missing) {
  const title = img.title.replace(/^File:/, "");
  const fetchUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title)}?width=1600`;
  let ok = false;
  for (let attempt = 1; attempt <= 5; attempt++) {
    console.log(slug, "attempt", attempt);
    const res = await fetch(fetchUrl, {
      headers: { "User-Agent": "HorseEduBot/1.0 (educational; local project)" },
      redirect: "follow",
    });
    if (res.status === 429) {
      const wait = attempt * 10000;
      console.log("429, wait", wait / 1000, "s");
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) {
      console.error("fail", slug, res.status);
      break;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) {
      console.error("too small", slug, buf.length);
      break;
    }
    writeFileSync(join(outDir, `${slug}.jpg`), buf);
    console.log(slug, buf.length, "bytes");
    ok = true;
    break;
  }
  if (!ok) console.error("GAVE UP", slug);
  await new Promise((r) => setTimeout(r, 6000));
}
