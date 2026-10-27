export type CoatColor = {
  slug: string;
  name: string;
  summary: string;
  idTips: string[];
  lookalikes: string[];
  /** Keys used by HorseColorIllustration */
  art: {
    body: string;
    mane: string;
    points?: string;
    pattern?: "tobiano" | "overo" | "blanket" | "leopard" | "none";
    dorsalStripe?: boolean;
    flaxen?: boolean;
  };
  sources: { label: string; url: string }[];
};

/**
 * Identification-focused coat colors used across Ready breeds.
 * Tips reference registry/association language; URLs are primary sources.
 */
export const COAT_COLORS: CoatColor[] = [
  {
    slug: "bay",
    name: "Bay",
    summary:
      "Reddish-brown to dark mahogany body with black “points” (mane, tail, lower legs).",
    idTips: [
      "Black mane and tail (not red or flaxen).",
      "Lower legs typically black from the knee/hock down (may be masked by white markings).",
      "Body ranges from light golden bay to dark blood bay.",
    ],
    lookalikes: ["Chestnut (red mane/tail)", "Black (no red body)", "Brown"],
    art: {
      body: "#8B4513",
      mane: "#1a120c",
      points: "#1a120c",
      pattern: "none",
    },
    sources: [
      {
        label: "AQHA — Coat colors",
        url: "https://www.aqha.com/-/horse-coat-colors",
      },
    ],
  },
  {
    slug: "chestnut",
    name: "Chestnut",
    summary:
      "Red body with a mane and tail the same shade or lighter—never true black points.",
    idTips: [
      "Mane/tail are red, flaxen, or darker red—not jet black like bay points.",
      "Legs match the body (unless white markings).",
      "Liver chestnut is a very dark red that can be mistaken for bay—check the mane.",
    ],
    lookalikes: ["Bay (black points)", "Palomino (cream dilution)"],
    art: {
      body: "#C45C26",
      mane: "#A84820",
      pattern: "none",
      flaxen: false,
    },
    sources: [
      {
        label: "AQHA — Coat colors",
        url: "https://www.aqha.com/-/horse-coat-colors",
      },
    ],
  },
  {
    slug: "black",
    name: "Black",
    summary: "True black coat; may fade (“sunburn”) to brownish in strong sun.",
    idTips: [
      "No reddish body tones when freshly shed/clean.",
      "Mane and tail black.",
      "Faded black can look like dark bay—check for red in the coat and points.",
    ],
    lookalikes: ["Dark bay", "Liver chestnut"],
    art: { body: "#141414", mane: "#0a0a0a", pattern: "none" },
    sources: [
      {
        label: "AQHA — Coat colors",
        url: "https://www.aqha.com/-/horse-coat-colors",
      },
    ],
  },
  {
    slug: "gray",
    name: "Gray",
    summary:
      "Born darker and lightens with age; skin is dark. Not the same as a white horse.",
    idTips: [
      "Dark skin around muzzle/eyes (unlike pink-skinned cremello/white).",
      "Foals often born bay/chestnut/black and gray out over years.",
      "Dapples and flea-bitten patterns are common stages.",
    ],
    lookalikes: ["White / cremello (pink skin)", "Roan"],
    art: { body: "#C8C8C8", mane: "#9a9a9a", pattern: "none" },
    sources: [
      {
        label: "AQHA — Coat colors",
        url: "https://www.aqha.com/-/horse-coat-colors",
      },
    ],
  },
  {
    slug: "palomino",
    name: "Palomino",
    summary: "Golden body with a white or flaxen mane and tail (cream dilution on chestnut).",
    idTips: [
      "Body is gold to light copper—not pinkish cream.",
      "Mane and tail are markedly lighter (flaxen/white).",
      "Dark skin; eyes usually dark.",
    ],
    lookalikes: ["Chestnut with flaxen mane", "Buckskin (black points)"],
    art: {
      body: "#E0B050",
      mane: "#F5F0E1",
      pattern: "none",
      flaxen: true,
    },
    sources: [
      {
        label: "AQHA — Coat colors",
        url: "https://www.aqha.com/-/horse-coat-colors",
      },
      {
        label: "Palomino Horse Breeders of America",
        url: "https://www.palominohba.com/",
      },
    ],
  },
  {
    slug: "dun",
    name: "Dun",
    summary:
      "Diluted body color with primitive markings: dorsal stripe and often leg barring / shoulder shadow.",
    idTips: [
      "Look for a clear dorsal stripe down the back into the tail.",
      "Zebra striping on legs and a darker face “mask” are common.",
      "Body can be bay-dun, red-dun, or grullo (black-based dun).",
    ],
    lookalikes: ["Buckskin (no dorsal stripe required)", "Bay"],
    art: {
      body: "#C4A05A",
      mane: "#5C4030",
      points: "#5C4030",
      pattern: "none",
      dorsalStripe: true,
    },
    sources: [
      {
        label: "AQHA — Coat colors",
        url: "https://www.aqha.com/-/horse-coat-colors",
      },
    ],
  },
  {
    slug: "paint",
    name: "Paint (pinto pattern)",
    summary:
      "Large white patches over a base color. Registry term “Paint” (APHA) overlaps with pinto patterning (tobiano/overo and related).",
    idTips: [
      "Tobiano: white often crosses the back; legs commonly white; head usually darker.",
      "Overo-type: white more horizontal/irregular; may have a bald/white face; darker legs more often.",
      "Always name the base color too (bay paint, black paint, etc.).",
    ],
    lookalikes: ["Appaloosa (spotted patterns)", "Skewbald / piebald (UK terms)"],
    art: {
      body: "#8B4513",
      mane: "#1a120c",
      points: "#1a120c",
      pattern: "tobiano",
    },
    sources: [
      {
        label: "American Paint Horse Association",
        url: "https://www.apha.com/",
      },
      {
        label: "APHA — Patterns & genetics overview",
        url: "https://www.apha.com/breed/genetics",
      },
    ],
  },
  {
    slug: "appaloosa",
    name: "Appaloosa (spotted patterns)",
    summary:
      "Spotting patterns (blanket, leopard, snowflake, etc.) often with mottled skin and striped hooves—signature of the Appaloosa Horse Club type.",
    idTips: [
      "Look for spots or a white blanket over the hips.",
      "Mottled (speckled) skin on muzzle/genitals is a classic clue.",
      "Vertically striped hooves are common but not required on every horse.",
    ],
    lookalikes: ["Paint / pinto", "Roan"],
    art: {
      body: "#8B6914",
      mane: "#3d2914",
      pattern: "blanket",
    },
    sources: [
      {
        label: "Appaloosa Horse Club",
        url: "https://www.appaloosa.com/",
      },
    ],
  },
];

const bySlug = new Map(COAT_COLORS.map((c) => [c.slug, c] as const));

const NAME_ALIASES: Record<string, string> = {
  bay: "bay",
  chestnut: "chestnut",
  black: "black",
  gray: "gray",
  grey: "gray",
  palomino: "palomino",
  dun: "dun",
  paint: "paint",
  pinto: "paint",
  appaloosa: "appaloosa",
};

export function getAllColors(): CoatColor[] {
  return COAT_COLORS;
}

export function getColorBySlug(slug: string): CoatColor | undefined {
  return bySlug.get(slug);
}

/** Map a breed “Typical colors” label to a Colors page slug when possible. */
export function colorSlugFromName(name: string): string | null {
  const key = name.trim().toLowerCase();
  const slug = NAME_ALIASES[key];
  return slug && bySlug.has(slug) ? slug : null;
}
