/**
 * Find CC / public-domain breed photos on Wikimedia Commons.
 * Writes scripts/breed-image-candidates.json (no download/upload).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const BREEDS = [
  { slug: "thoroughbred", queries: ["Thoroughbred racehorse", "Thoroughbred horse"] },
  { slug: "arabian", queries: ["Arabian horse"] },
  { slug: "american-quarter-horse", queries: ["American Quarter Horse", "Quarter Horse"] },
  { slug: "american-paint-horse", queries: ["American Paint Horse", "Paint Horse"] },
  { slug: "appaloosa", queries: ["Appaloosa horse"] },
  { slug: "american-saddlebred", queries: ["American Saddlebred", "Saddlebred horse"] },
  { slug: "morgan", queries: ["Morgan horse"] },
  { slug: "standardbred", queries: ["Standardbred horse", "harness racing horse"] },
  { slug: "tennessee-walking-horse", queries: ["Tennessee Walking Horse"] },
  { slug: "welsh-pony-and-cob", queries: ["Welsh Pony", "Welsh Cob"] },
  { slug: "connemara", queries: ["Connemara pony"] },
  { slug: "highland-pony", queries: ["Highland pony"] },
  { slug: "shetland-pony", queries: ["Shetland pony"] },
  { slug: "irish-draught", queries: ["Irish Draught", "Irish Draft horse"] },
  { slug: "percheron", queries: ["Percheron horse"] },
  { slug: "shire", queries: ["Shire horse"] },
  { slug: "belgian-draft", queries: ["Belgian Draft horse", "Brabant horse"] },
  { slug: "clydesdale", queries: ["Clydesdale horse"] },
  { slug: "friesian", queries: ["Friesian horse"] },
  { slug: "hanoverian", queries: ["Hanoverian horse", "Hannoveraner"] },
  { slug: "andalusian-pura-raza-espanola", queries: ["Andalusian horse", "Pura Raza Española"] },
  { slug: "haflinger", queries: ["Haflinger horse"] },
  { slug: "lipizzan", queries: ["Lipizzan horse", "Lipizzaner"] },
];

const UA = "HorseEduBot/1.0 (educational site image research; local project)";

function stripHtml(s) {
  return String(s || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isAllowedLicense(short) {
  if (!short) return false;
  const s = short.toLowerCase();
  return (
    s.includes("public domain") ||
    s === "pd" ||
    s.includes("cc0") ||
    s.includes("cc-zero") ||
    /^cc[- ]?by\b/.test(s) ||
    s.includes("cc by") ||
    s.includes("cc-by")
  );
}

async function searchCommons(query) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "8",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url|extmetadata|size|mime",
    iiurlwidth: "1600",
  });
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) throw new Error(`Commons ${res.status} for ${query}`);
  const json = await res.json();
  const pages = Object.values(json.query?.pages || {});
  const out = [];
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    if (!String(ii.mime || "").startsWith("image/")) continue;
    if ((ii.width || 0) < 600) continue;
    const m = ii.extmetadata || {};
    const license = m.LicenseShortName?.value || m.License?.value || "";
    if (!isAllowedLicense(license)) continue;
    out.push({
      title: p.title,
      fileUrl: ii.url,
      thumbUrl: ii.thumburl || ii.url,
      width: ii.width,
      height: ii.height,
      mime: ii.mime,
      license: stripHtml(license),
      artist: stripHtml(m.Artist?.value).slice(0, 160),
      credit: stripHtml(m.Credit?.value).slice(0, 160),
      commonsPage: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title.replace(/ /g, "_"))}`,
    });
  }
  return out;
}

const results = {};
for (const breed of BREEDS) {
  const seen = new Set();
  const candidates = [];
  for (const q of breed.queries) {
    try {
      const found = await searchCommons(q);
      for (const c of found) {
        if (seen.has(c.fileUrl)) continue;
        seen.add(c.fileUrl);
        candidates.push(c);
      }
    } catch (e) {
      console.error(breed.slug, q, e.message);
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  results[breed.slug] = candidates.slice(0, 3);
  console.error(
    `${breed.slug}: ${candidates.length} candidates (kept ${Math.min(3, candidates.length)})`,
  );
}

const outFile = fileURLToPath(
  new URL("./breed-image-candidates.json", import.meta.url),
);
writeFileSync(outFile, JSON.stringify(results, null, 2));
console.log("Wrote", outFile);
