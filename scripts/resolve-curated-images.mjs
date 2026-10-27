import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const cand = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("./breed-image-candidates.json", import.meta.url)),
    "utf8",
  ),
);

const picks = {
  thoroughbred:
    "File:Sato - Palomino sabino Purebred Thoroughbred Stallion (5966320009).jpg",
  arabian: "File:WM Nafis - Arabian horse.jpg",
  "american-quarter-horse": "File:Quarter Horse(REFON)-cleaned.jpg",
  "american-paint-horse": "File:American Paint Horse.JPG",
  appaloosa: "File:Appaloosa stallion.JPG",
  "american-saddlebred": "File:American Saddlebred13.jpg",
  morgan: "File:Morgan horse at New England Horse Show.jpg",
  standardbred: "File:Standardbred Hunter.jpg",
  "tennessee-walking-horse": "File:Tennessee Walking Horse2.jpg",
  "welsh-pony-and-cob": "File:Welsh Pony & foal.jpg",
  connemara: "File:Gentle Dancer Irlande.jpg",
  "highland-pony": "File:Highland Pony.jpg",
  "shetland-pony": "File:Shetland pony - Postbridge.jpg",
  "irish-draught": "File:Irish Draught.jpg",
  percheron:
    "File:Percherons attelés mondial du cheval percheron 2011Cl J Weber15 (24000846981).jpg",
  shire: "File:Dyfed Shire Horse Farm - geograph.org.uk - 13986.jpg",
  "belgian-draft": "File:Belgian draft horse.jpg",
  clydesdale: "File:Clydesdale horse by Bonnie Gruenberg.JPG",
  friesian: "File:Friesian Horse Side View 2.jpg",
  hanoverian:
    "File:Springreiten Simone Blum auf Pferd Flying Boy International 2011.JPG",
  "andalusian-pura-raza-espanola": "File:Andalusierhengst 93c.jpg",
  haflinger: "File:Haflinger 3607 by Flominator.jpg",
  lipizzan: "File:Lipizzaner 2.jpg",
};

async function info(title) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    titles: title,
    prop: "imageinfo",
    iiprop: "url|extmetadata|size|mime",
  });
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { "User-Agent": "HorseEduBot/1.0" },
  });
  const j = await res.json();
  const p = Object.values(j.query.pages)[0];
  const ii = p.imageinfo?.[0];
  if (!ii) return { title, error: "missing" };
  return {
    title,
    fileUrl: ii.url.split("?")[0],
    width: ii.width,
    height: ii.height,
    mime: ii.mime,
    license: ii.extmetadata?.LicenseShortName?.value,
    artist: (ii.extmetadata?.Artist?.value || "")
      .replace(/<[^>]+>/g, "")
      .slice(0, 120),
    commonsPage: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`,
  };
}

const out = {};
for (const [slug, title] of Object.entries(picks)) {
  const fromCand = (cand[slug] || []).find((c) => c.title === title);
  if (fromCand) {
    out[slug] = {
      title: fromCand.title,
      fileUrl: fromCand.fileUrl.split("?")[0],
      width: fromCand.width,
      height: fromCand.height,
      mime: fromCand.mime,
      license: fromCand.license,
      artist: fromCand.artist,
      commonsPage: fromCand.commonsPage,
    };
  } else {
    out[slug] = await info(title);
    await new Promise((r) => setTimeout(r, 800));
  }
  console.log(
    slug,
    out[slug].error || out[slug].license,
    (out[slug].fileUrl || "").slice(-50),
  );
}

const dest = fileURLToPath(
  new URL("./curated-breed-images.json", import.meta.url),
);
writeFileSync(dest, JSON.stringify(out, null, 2));
console.log("Wrote", dest);
