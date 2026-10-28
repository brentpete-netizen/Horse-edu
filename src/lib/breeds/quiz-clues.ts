export type BreedQuizClues = {
  slug: string;
  /** Extra accepted answers beyond Breed.name (normalized at match time). */
  aliases: string[];
  /** Four clues: broad → near-giveaway. Do not include the breed name. */
  clues: [string, string, string, string];
};

/**
 * Handcrafted progressive clues for the breeds quiz.
 * Facts align with Ready breed pages on this site (registry/association sources).
 */
export const BREED_QUIZ_CLUES: BreedQuizClues[] = [
  {
    slug: "american-paint-horse",
    aliases: ["paint", "paint horse", "aphc", "american paint"],
    clues: [
      "This breed’s modern registry is based in the United States.",
      "It is a stock-type riding horse built for ranch work and Western sports.",
      "Its calling card is large white-and-color pinto patterning over a Quarter Horse–type frame.",
      "The American Paint Horse Association (APHA) is the primary registry for this patterned stock horse.",
    ],
  },
  {
    slug: "american-quarter-horse",
    aliases: ["quarter horse", "american quarter", "quarter", "qh", "aqha"],
    clues: [
      "This is America’s most numerous registered riding breed.",
      "It is a versatile stock horse used for ranch work, Western events, and racing.",
      "It is famous for explosive speed over a short distance—especially a quarter mile.",
      "The American Quarter Horse Association (AQHA) keeps its stud book.",
    ],
  },
  {
    slug: "american-saddlebred",
    aliases: ["saddlebred", "american saddle horse"],
    clues: [
      "This showy riding breed was developed in the United States.",
      "It is a gaited / park-show type known for presence and animation.",
      "All perform walk, trot, and canter; some are also trained in rack and slow gait.",
      "Often called the “peacock of the horse world,” it is registered by the American Saddlebred Horse Association.",
    ],
  },
  {
    slug: "andalusian-pura-raza-espanola",
    aliases: [
      "andalusian",
      "pura raza espanola",
      "pura raza española",
      "pre",
      "spanish horse",
    ],
    clues: [
      "This baroque riding horse comes from the Iberian Peninsula.",
      "It is a warmblood-type breed prized for elevated, elastic gaits and trainability.",
      "It is often called Spain’s purebred Spanish horse and appears in classical riding and dressage.",
      "ANCCE maintains the stud book for the Pura Raza Española (PRE).",
    ],
  },
  {
    slug: "appaloosa",
    aliases: ["appaloosa horse"],
    clues: [
      "This spotted stock breed is strongly associated with the northwestern United States.",
      "It is used as a versatile light riding / ranch horse.",
      "Look for distinctive spotting patterns—blanket, leopard, snowflake—and often mottled skin.",
      "The Appaloosa Horse Club is the primary U.S. registry for this breed.",
    ],
  },
  {
    slug: "arabian",
    aliases: ["arab", "arabian horse"],
    clues: [
      "This ancient breed’s traditional homeland is the Arabian Peninsula.",
      "It is a light riding horse renowned for endurance and desert hardiness.",
      "Signature looks include a dished face, large eye, and high-set tail carriage.",
      "It is widely regarded as one of the oldest pure breeds and a foundation influence worldwide.",
    ],
  },
  {
    slug: "belgian-draft",
    aliases: ["belgian", "belgian horse", "brabant"],
    clues: [
      "This heavy horse originated in Belgium.",
      "It is a draft breed bred for strength and farm or pulling work.",
      "Modern U.S. examples are often chestnut or roan with a flaxen mane and enormous substance.",
      "It is Belgium’s national heavy horse—sometimes linked historically with the Brabant type.",
    ],
  },
  {
    slug: "clydesdale",
    aliases: ["clydesdale horse"],
    clues: [
      "This draft breed is native to Scotland.",
      "It was developed for farm work, driving, and logging; many are ridden today as well.",
      "Expect a stylish draught build with silky feather and bold white markings on face and legs.",
      "It was developed in Lanarkshire; the Clydesdale Horse Society keeps the mother stud book.",
    ],
  },
  {
    slug: "connemara",
    aliases: ["connemara pony"],
    clues: [
      "This pony breed is native to Ireland.",
      "It is a riding pony valued for hardiness, surefootedness, and jumping ability.",
      "Compact and well-balanced, it thrives in rough western Irish country.",
      "The Connemara Pony Breeders’ Society (CPBS) is the stud-book of origin.",
    ],
  },
  {
    slug: "friesian",
    aliases: ["friesian horse", "frisian"],
    clues: [
      "This baroque-type breed comes from the northern Netherlands (Friesland).",
      "It is used for dressage, driving, and exhibition with elevated movement.",
      "Classic look: nearly always jet black, with abundant mane, tail, and feather.",
      "The KFPS runs a closed studbook breeding program for this Dutch breed.",
    ],
  },
  {
    slug: "haflinger",
    aliases: ["haflinger horse", "hafflinger"],
    clues: [
      "This mountain breed comes from the Tyrolean Alps (Austria/Italy region).",
      "It is a small horse / pony-type all-rounder for pleasure, packing, and light draft.",
      "Coat is chestnut with a distinctive pale flaxen mane and tail.",
      "The American Haflinger Registry is a major North American registry for this Tyrolean breed.",
    ],
  },
  {
    slug: "hanoverian",
    aliases: ["hannoveraner", "hanoverian warmblood"],
    clues: [
      "This sport horse’s studbook of origin is in Germany.",
      "It is a warmblood bred for dressage, jumping, eventing, and leisure.",
      "Modern breeding emphasizes rideability and athletic scope for Olympic disciplines.",
      "The Hannoveraner Verband keeps the breed’s studbook of origin.",
    ],
  },
  {
    slug: "highland-pony",
    aliases: ["highland", "scottish highland pony"],
    clues: [
      "This native pony comes from the Scottish Highlands and Islands.",
      "It is a strong, compact pony used to ride, drive, and pack.",
      "Built with substance for rough hill country—not the tall feathered Scottish draught.",
      "It is one of Scotland’s native mountain and moorland ponies (distinct from the Eriskay).",
    ],
  },
  {
    slug: "irish-draught",
    aliases: ["irish draft", "irish draught horse"],
    clues: [
      "This foundation breed is native to Ireland.",
      "Historically a farm, hunt, and driving horse; today also valued in sport horse breeding.",
      "It combines substance and quality with a willing temperament and sound constitution.",
      "It is Ireland’s traditional light draft / hunter foundation breed (not a heavy English Shire).",
    ],
  },
  {
    slug: "lipizzan",
    aliases: ["lipizzaner", "lipizan", "lipizzaner horse"],
    clues: [
      "This cultural European breed was developed at the Lipica stud (now Slovenia).",
      "It is a compact Baroque warmblood famous for classical haute école.",
      "Foals are often born dark and lighten to gray; adults are typically white-looking gray.",
      "The Spanish Riding School of Vienna is its most famous classical exhibition home.",
    ],
  },
  {
    slug: "morgan",
    aliases: ["morgan horse"],
    clues: [
      "This is America’s earliest foundation light-horse breed.",
      "Compact and versatile—driving, English, and Western disciplines.",
      "Known for stamina, a strong natural way of moving, and a kind disposition.",
      "All trace back to one foundational stallion, Figure (often called Justin Morgan’s horse).",
    ],
  },
  {
    slug: "percheron",
    aliases: ["percheron horse"],
    clues: [
      "This draft breed comes from France (the historic Perche region).",
      "It was widely used for farm and city work; many are ridden or driven today.",
      "Typically black or gray, with clean legs (little or no heavy feather).",
      "It is the French heavy horse from Le Perche—distinct from the feathered Scottish draught.",
    ],
  },
  {
    slug: "shetland-pony",
    aliases: ["shetland", "shetland horse"],
    clues: [
      "This tiny native pony comes from islands off northern Scotland.",
      "It is a hardy children’s / driving / packing pony with enormous strength for its size.",
      "Among the smallest equine breeds, with a thick coat suited to harsh island weather.",
      "The Shetland Pony Stud-Book Society holds the stud-book of origin for registered ponies of these isles.",
    ],
  },
  {
    slug: "shire",
    aliases: ["shire horse", "english shire"],
    clues: [
      "This iconic heavy draft comes from England.",
      "Bred for great size and farm or ceremonial draft work, with a docile expression.",
      "Massive bone and plentiful feather—often among the tallest horses in the world.",
      "The Shire Horse Society (formerly English Cart Horse Society) maintains the breed in England.",
    ],
  },
  {
    slug: "standardbred",
    aliases: ["standard bred", "harness racer"],
    clues: [
      "This North American breed was developed in the United States.",
      "It is the premier harness-racing breed, competing as trotters or pacers.",
      "Races are run pulling a two-wheeled sulky rather than under saddle like flat racers.",
      "The U.S. Trotting Association is closely tied to this breed’s racing registry.",
    ],
  },
  {
    slug: "tennessee-walking-horse",
    aliases: [
      "tennessee walker",
      "twh",
      "walking horse",
      "tennessee walking",
    ],
    clues: [
      "This gaited light horse was founded in Middle Tennessee.",
      "It is bred for a calm disposition and smooth trail or show riding.",
      "Its signature is the running walk—a four-beat gait that covers ground comfortably.",
      "The Tennessee Walking Horse Breeders’ & Exhibitors’ Association (TWHBEA) is the breed registry.",
    ],
  },
  {
    slug: "thoroughbred",
    aliases: ["tb", "thorough bred", "english thoroughbred"],
    clues: [
      "This racing breed’s stud book roots are in England.",
      "It is the premier flat-racing athlete, also influential in sport-horse breeding.",
      "Bred for speed and stamina over longer distances than a quarter-mile dash.",
      "All modern horses of this breed trace to three foundation Oriental stallions in the General Stud Book tradition.",
    ],
  },
  {
    slug: "welsh-pony-and-cob",
    aliases: [
      "welsh pony",
      "welsh cob",
      "welsh",
      "welsh mountain pony",
      "welsh pony and cob",
    ],
    clues: [
      "This native pony group comes from Wales.",
      "Hardy riding and driving stock ranging from small mountain ponies to larger cobs.",
      "The stud book is divided into sections A–D (plus part-breds) by height and type.",
      "The Welsh Pony and Cob Society maintains the breed’s sections from Mountain Pony through Cob.",
    ],
  },
];

const bySlug = new Map(BREED_QUIZ_CLUES.map((c) => [c.slug, c] as const));

export function getQuizCluesBySlug(slug: string): BreedQuizClues | undefined {
  return bySlug.get(slug);
}

/** Normalize a typed guess for comparison. */
export function normalizeBreedGuess(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(the|a|an|horse|pony|breed)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function guessMatchesBreed(
  guess: string,
  officialName: string,
  aliases: string[],
): boolean {
  const g = normalizeBreedGuess(guess);
  if (!g) return false;
  const targets = [officialName, ...aliases]
    .map(normalizeBreedGuess)
    .filter(Boolean);
  // Exact normalized match only (aliases cover common short forms).
  return targets.some((t) => t === g);
}

export const BREED_QUIZ_ROUND_SIZE = 8;
export const BREED_QUIZ_POINTS = [4, 3, 2, 1] as const;
