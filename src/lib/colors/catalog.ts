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
    pattern?: "tobiano" | "overo" | "blanket" | "leopard" | "roan" | "none";
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
  {
    slug: "bay_roan",
    name: "Bay roan",
    summary:
      "Classic roan over a bay base: white hairs mixed through the body while bay points stay darker.",
    idTips: [
      "Body looks frosted or “salt-and-pepper” over bay; head and lower legs stay darker.",
      "Mane and tail keep bay’s black points (not red like chestnut roan).",
      "Unlike gray, the mix does not keep lightening to near-white with age.",
    ],
    lookalikes: ["Blue roan", "Gray", "Bay"],
    art: {
      body: "#8B4513",
      mane: "#1a120c",
      points: "#1a120c",
      pattern: "roan",
    },
    sources: [
      {
        label: "AQHA — Roan Quarter Horses",
        url: "https://www.aqha.com/-/horse-breeding-the-roan-quarter-horse-color",
      },
      {
        label: "UC Davis VGL — Roan",
        url: "https://vgl.ucdavis.edu/test/roan",
      },
    ],
  },
  {
    slug: "blue_roan",
    name: "Blue roan",
    summary:
      "Classic roan over a black base: black and white body hairs read as slate or “blue,” with a darker head and legs.",
    idTips: [
      "Body is a blue-gray mix; head, mane, tail, and lower legs stay much darker.",
      "Born with the pattern (may show after the foal coat sheds)—not progressive like gray.",
      "Very dark bay/brown roans can look similar—check for residual red in the body.",
    ],
    lookalikes: ["Gray", "Bay roan (dark)", "Black"],
    art: {
      body: "#4a5568",
      mane: "#0a0a0a",
      points: "#0a0a0a",
      pattern: "roan",
    },
    sources: [
      {
        label: "AQHA — Roan Quarter Horses",
        url: "https://www.aqha.com/-/horse-breeding-the-roan-quarter-horse-color",
      },
      {
        label: "UC Davis VGL — Roan",
        url: "https://vgl.ucdavis.edu/test/roan",
      },
    ],
  },
  {
    slug: "chestnut_roan",
    name: "Chestnut (red) roan",
    summary:
      "Classic roan over chestnut/sorrel: red and white body hairs with a redder head and legs (often called red roan).",
    idTips: [
      "Body mix of red and white; head and lower legs keep more solid red.",
      "Mane and tail are red family—not black points like bay roan.",
      "Does not progressively gray out the way a gray horse does.",
    ],
    lookalikes: ["Bay roan", "Chestnut", "Gray"],
    art: {
      body: "#C45C26",
      mane: "#A84820",
      pattern: "roan",
    },
    sources: [
      {
        label: "AQHA — Roan Quarter Horses",
        url: "https://www.aqha.com/-/horse-breeding-the-roan-quarter-horse-color",
      },
      {
        label: "UC Davis VGL — Roan",
        url: "https://vgl.ucdavis.edu/test/roan",
      },
    ],
  },
  {
    slug: "buckskin",
    name: "Buckskin",
    summary:
      "Single cream dilution on bay: tan to gold body with black mane, tail, and lower legs.",
    idTips: [
      "Black points like bay—distinguish from palomino (flaxen mane/tail).",
      "Body is cream-diluted bay (not a required dorsal stripe like dun).",
      "One cream copy on bay (Cr/N); two copies make perlino instead.",
    ],
    lookalikes: ["Dun", "Palomino", "Bay"],
    art: {
      body: "#D2B48C",
      mane: "#1a120c",
      points: "#1a120c",
      pattern: "none",
    },
    sources: [
      {
        label: "UC Davis VGL — Cream",
        url: "https://vgl.ucdavis.edu/test/cream",
      },
      {
        label: "AQHA — How to predict foal color",
        url: "https://www.aqha.com/-/how-to-tell-what-color-your-foal-will-be",
      },
    ],
  },
  {
    slug: "silver_bay",
    name: "Silver bay",
    summary:
      "Silver dilution on bay: flaxen or silver-gray mane/tail with lightened black points (also called red silver).",
    idTips: [
      "Mane and tail lightened to flaxen/silver; lower legs’ black points are diluted.",
      "Body stays bay-toned (red/brown)—silver does not dilute chestnut the same way.",
      "Silver is linked to Multiple Congenital Ocular Anomalies (MCOA)—a genetics/health note, not a coat cue.",
    ],
    lookalikes: ["Bay", "Flaxen chestnut", "Palomino"],
    art: {
      body: "#8B4513",
      mane: "#D4C4A8",
      points: "#6B4423",
      pattern: "none",
      flaxen: true,
    },
    sources: [
      {
        label: "UC Davis VGL — Silver",
        url: "https://vgl.ucdavis.edu/test/silver",
      },
      {
        label: "AQHA — Silver Quarter Horses",
        url: "https://www.aqha.com/-/seeing-silver",
      },
    ],
  },
  {
    slug: "cremello",
    name: "Cremello",
    summary:
      "Double cream dilution on chestnut: pale cream body and mane/tail, typically with light skin and light eyes.",
    idTips: [
      "Nearly white/cream coat with pinkish skin (not dark-skinned gray).",
      "Mane and tail are pale cream, often matching the body.",
      "Two cream copies on chestnut (Cr/Cr); one cream on chestnut is palomino.",
    ],
    lookalikes: ["Perlino", "White", "Gray (aged)"],
    art: {
      body: "#F5E6C8",
      mane: "#F8F0DC",
      pattern: "none",
      flaxen: true,
    },
    sources: [
      {
        label: "UC Davis VGL — Cream",
        url: "https://vgl.ucdavis.edu/test/cream",
      },
      {
        label: "AQHA — How to predict foal color",
        url: "https://www.aqha.com/-/how-to-tell-what-color-your-foal-will-be",
      },
    ],
  },
  {
    slug: "perlino",
    name: "Perlino",
    summary:
      "Double cream dilution on bay: pale cream body with mane/tail and points that often keep a slightly darker or apricot cast.",
    idTips: [
      "Very pale body like cremello, but points/mane may read warmer or slightly darker.",
      "Pink skin / light eyes typical of double cream (unlike gray).",
      "Two cream copies on bay (Cr/Cr); one cream on bay is buckskin.",
    ],
    lookalikes: ["Cremello", "White", "Buckskin"],
    art: {
      body: "#F0E0C0",
      mane: "#E8D0A8",
      points: "#D4B896",
      pattern: "none",
      flaxen: true,
    },
    sources: [
      {
        label: "UC Davis VGL — Cream",
        url: "https://vgl.ucdavis.edu/test/cream",
      },
      {
        label: "AQHA — How to predict foal color",
        url: "https://www.aqha.com/-/how-to-tell-what-color-your-foal-will-be",
      },
    ],
  },
  {
    slug: "white",
    name: "White",
    summary:
      "True white coats from white-spotting genetics (e.g. dominant white): white hair with pink skin—not the same as gray or cream dilute.",
    idTips: [
      "White hair with pink skin around eyes/muzzle (gray keeps dark skin).",
      "Often born white or nearly white—not a slow gray-out over years.",
      "Distinguish from cremello/perlino: those are cream dilutions with a pale cream cast, not always stark white.",
    ],
    lookalikes: ["Gray (aged)", "Cremello", "Perlino"],
    art: {
      body: "#F7F4EF",
      mane: "#F7F4EF",
      pattern: "none",
    },
    sources: [
      {
        label: "UC Davis VGL — Equine coat color genetics",
        url: "https://vgl.ucdavis.edu/resources/horse-coat-color",
      },
      {
        label: "AQHA — Top coat-color questions",
        url: "https://www.aqha.com/-/top-10-horse-coat-color-questions-answered",
      },
    ],
  },
  {
    slug: "overo_pinto",
    name: "Overo pinto",
    summary:
      "Pinto white pattern (frame/splash/sabino family in common speech): irregular white that often leaves the back darker and may include a wide white face.",
    idTips: [
      "White often looks jagged/horizontal; the topline may stay colored more than tobiano.",
      "Legs may stay darker; face can be mostly white (“bald” face).",
      "Always name the base color too; contrast with tobiano’s rounded patches that often cross the back.",
    ],
    lookalikes: ["Tobiano / Paint", "Appaloosa"],
    art: {
      body: "#8B4513",
      mane: "#1a120c",
      points: "#1a120c",
      pattern: "overo",
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
      {
        label: "AQHA — Five major variations in horse color",
        url: "https://www.aqha.com/-/five-major-variations-in-horse-color",
      },
    ],
  },
  {
    slug: "leopard_appaloosa",
    name: "Leopard Appaloosa",
    summary:
      "Appaloosa leopard pattern: white body covered with round dark spots from head to tail (full leopard).",
    idTips: [
      "Spots are scattered over a mostly white body—not just a hip blanket.",
      "Mottled skin and striped hooves are common Appaloosa clues.",
      "Contrast with blanket Appaloosa (white/spots concentrated over the hips).",
    ],
    lookalikes: ["Blanket Appaloosa", "Paint / pinto"],
    art: {
      body: "#5C4030",
      mane: "#3d2914",
      pattern: "leopard",
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
  "bay roan": "bay_roan",
  "blue roan": "blue_roan",
  "red roan": "chestnut_roan",
  "chestnut roan": "chestnut_roan",
  buckskin: "buckskin",
  "silver bay": "silver_bay",
  cremello: "cremello",
  perlino: "perlino",
  white: "white",
  overo: "overo_pinto",
  "overo pinto": "overo_pinto",
  leopard: "leopard_appaloosa",
  "leopard appaloosa": "leopard_appaloosa",
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
