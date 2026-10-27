import fs from "node:fs";
import path from "node:path";

const data = JSON.parse(
  fs.readFileSync(
    "C:/Users/brent/.cursor/projects/c-Users-brent-OneDrive-Desktop-Horse-Research/agent-tools/127471fd-b3af-49ab-89dc-f57b264bb11c.txt",
    "utf8",
  ),
);

const outDir =
  "C:/Users/brent/OneDrive/Desktop/Horse Research/horse-edu/content/breeds";

function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJsonArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  try {
    const parsed = JSON.parse(v);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return String(v)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

function parseSources(html) {
  if (!html) return [];
  const links = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    links.push({ label: m[1], url: m[2] });
  }
  if (!links.length) {
    const urlRe = /(https?:\/\/[^\s<>"]+)/g;
    while ((m = urlRe.exec(html)) !== null) {
      links.push({ label: m[1], url: m[1] });
    }
  }
  const seen = new Set();
  return links.filter((l) => {
    if (seen.has(l.url)) return false;
    seen.add(l.url);
    return true;
  });
}

const ASSOC_NAMES = {
  "jockeyclub.com": "The Jockey Club",
  "apha.com": "American Paint Horse Association",
  "aqha.com": "American Quarter Horse Association",
  "asha.net": "American Saddlebred Horse Association",
  "saddlebred.com": "American Saddlebred Horse Association",
  "ancce.es": "ANCCE (PRE)",
  "appaloosa.com": "Appaloosa Horse Club",
  "arabianhorses.org": "Arabian Horse Association",
  "belgian.horse": "Belgian Draft Horse Corporation of America",
  "belgiancorp.com": "Belgian Draft Horse Corporation of America",
  "clydesdalehorse.com": "Clydesdale Breeders of the USA",
  "clydesdalehorsesociety.com": "Clydesdale Horse Society",
  "cpbs.ie": "Connemara Pony Breeders’ Society",
  "fps-studbook.com": "FPS / KFPS",
  "haflingerregistry.com": "American Haflinger Registry",
  "hanoverian.org": "American Hanoverian Society",
  "hannoveraner.com": "Hannoveraner Verband",
  "highlandponysociety.com": "Highland Pony Society",
  "horsesportireland.ie": "Horse Sport Ireland",
  "uslipizzan.org": "United States Lipizzan Federation",
  "morganhorse.com": "American Morgan Horse Association",
  "percheronhorse.org": "Percheron Horse Association of America",
  "shetlandponystudbooksociety.co.uk": "Shetland Pony Stud-Book Society",
  "shire-horse.org.uk": "Shire Horse Society",
  "ustrotting.com": "United States Trotting Association",
  "twhbea.com":
    "Tennessee Walking Horse Breeders’ & Exhibitors’ Association",
  "wpcs.uk.com": "Welsh Pony and Cob Society",
  "friesianhorseassociation.com":
    "Friesian Horse Association of North America",
  "kfps.nl": "KFPS",
  "fhana.com": "Friesian Horse Association of North America",
  "www.fhana.com": "Friesian Horse Association of North America",
};

function hostKey(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function assocLabel(url) {
  if (!url) return null;
  const host = hostKey(url);
  return (host && ASSOC_NAMES[host]) || host || url;
}

function cleanText(t) {
  if (!t) return "";
  return String(t)
    .replace(/\\~/g, "~")
    .replace(/\\\\_/g, "_")
    .replace(/\r\n/g, "\n")
    .trim();
}

function heightCell(h) {
  if (!h) return "—";
  const s = cleanText(h);
  if (/hands/i.test(s)) return s;
  if (/\bhh\b|\bcm\b|\bin\b/i.test(s)) return s;
  return `${s} hands`;
}

function sourceDisplay(label, url) {
  if (!label.startsWith("http") && label.length <= 80) return label;
  return assocLabel(url) || hostKey(url) || label;
}

function buildMarkdown(b) {
  const name = b.Name;
  const slug = slugify(name);
  const colors = parseJsonArray(b["Typical colors"]).join(", ") || "—";
  const uses = parseJsonArray(b["Primary uses"]).join(", ") || "—";
  const assocUrl = b["Official association"] || null;
  const assocName = assocLabel(assocUrl);
  const assocCell = assocUrl ? `[${assocName}](${assocUrl})` : "—";
  const sources = parseSources(b.Sources || "");
  const lastUpdated = b["date:Last updated:start"] || "2026-10-27";
  const overview = cleanText(b["Short description"]);
  const chars = cleanText(b["Key characteristics"]);
  const history = cleanText(b["History notes"]);

  const sourceLines = sources.length
    ? sources
        .map((s) => `- [${sourceDisplay(s.label, s.url)}](${s.url})`)
        .join("\n")
    : assocUrl
      ? `- [${assocName}](${assocUrl})`
      : "- (sources on Notion record)";

  return `# ${name}

| | |
| --- | --- |
| **Type** | ${b.Type || "—"} |
| **Origin** | ${b.Origin || "—"} |
| **Height** | ${heightCell(b["Height (hands)"])} |
| **Typical colors** | ${colors} |
| **Primary uses** | ${uses} |
| **Temperament** | ${b.Temperament || "—"} |
| **Official association** | ${assocCell} |

## Overview

${overview || "—"}

## Key characteristics

${chars || "—"}

## History

${history || "—"}

## Sources

${sourceLines}

## Image notes

No image attached on the Ready Notion record. Prefer photos with clear attribution from the official association before publishing on the site.

---

*Prepared with \`/prepare-site-breed\` · Notion Status: Ready · Last updated: ${lastUpdated} · Slug: \`${slug}\`*
`;
}

const written = [];
for (const b of data.results) {
  if (b.Status !== "Ready") continue;
  const slug = slugify(b.Name);
  fs.writeFileSync(path.join(outDir, `${slug}.md`), buildMarkdown(b), "utf8");
  written.push(slug);
}
written.sort();
console.log(written.join("\n"));
console.log("Wrote", written.length, "files");
