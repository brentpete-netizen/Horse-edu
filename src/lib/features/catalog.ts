export type FeatureKind = "anatomy" | "marking";

export type HorseFeature = {
  slug: string;
  name: string;
  kind: FeatureKind;
  summary: string;
  idTips: string[];
  /** Simple diagram region highlight id */
  diagram: "withers" | "poll" | "muzzle" | "cannon" | "hock" | "star" | "blaze" | "snip" | "sock" | "stocking" | "piebald";
  sources: { label: string; url: string }[];
};

export const FEATURES: HorseFeature[] = [
  {
    slug: "withers",
    name: "Withers",
    kind: "anatomy",
    summary:
      "The ridge between the shoulder blades at the base of the neck—used when measuring height in hands.",
    idTips: [
      "Highest point of the back just above the shoulders.",
      "Saddle fit depends heavily on wither shape.",
      "Height is measured from the ground to the withers.",
    ],
    diagram: "withers",
    sources: [
      {
        label: "USDA / Cooperative Extension — horse anatomy (overview materials)",
        url: "https://horses.extension.org/",
      },
    ],
  },
  {
    slug: "poll",
    name: "Poll",
    kind: "anatomy",
    summary: "The bony area at the top of the head behind the ears—sensitive for bridling.",
    idTips: [
      "Between and just behind the ears.",
      "Halters and bridles sit relative to the poll.",
      "Avoid heavy pressure when leading or tying.",
    ],
    diagram: "poll",
    sources: [
      {
        label: "Extension horses — educational hub",
        url: "https://horses.extension.org/",
      },
    ],
  },
  {
    slug: "muzzle",
    name: "Muzzle",
    kind: "anatomy",
    summary: "The soft nose and mouth region including nostrils and lips.",
    idTips: [
      "Includes nostrils, lips, and chin.",
      "Skin color here helps ID gray vs cream/white coats.",
      "Very sensitive—useful for bonding and veterinary checks.",
    ],
    diagram: "muzzle",
    sources: [
      {
        label: "Extension horses — educational hub",
        url: "https://horses.extension.org/",
      },
    ],
  },
  {
    slug: "cannon",
    name: "Cannon bone",
    kind: "anatomy",
    summary: "The long bone between the knee (or hock) and the fetlock—key to “bone” substance.",
    idTips: [
      "Front: below the knee; hind: below the hock.",
      "Clean, flat bone is often praised in breed standards.",
      "Tendons run along the back of the cannon.",
    ],
    diagram: "cannon",
    sources: [
      {
        label: "Extension horses — educational hub",
        url: "https://horses.extension.org/",
      },
    ],
  },
  {
    slug: "hock",
    name: "Hock",
    kind: "anatomy",
    summary: "The large joint on the hind leg analogous to the human ankle—critical for propulsion.",
    idTips: [
      "Looks like a reverse knee on the hind limb.",
      "Straight, sound hocks matter for jumping and draft work.",
      "Swelling here can signal stress or injury.",
    ],
    diagram: "hock",
    sources: [
      {
        label: "Extension horses — educational hub",
        url: "https://horses.extension.org/",
      },
    ],
  },
  {
    slug: "star",
    name: "Star",
    kind: "marking",
    summary: "A white mark on the forehead between the eyes.",
    idTips: [
      "Confined mostly to the forehead.",
      "Size varies from a fleck to a large patch.",
      "Often combined with a snip or stripe.",
    ],
    diagram: "star",
    sources: [
      {
        label: "AQHA — Markings & identification concepts",
        url: "https://www.aqha.com/",
      },
    ],
  },
  {
    slug: "blaze",
    name: "Blaze",
    kind: "marking",
    summary: "A broad white stripe down the face, usually covering the bridge of the nose.",
    idTips: [
      "Wider than a thin stripe or race.",
      "May connect a star to a snip.",
      "Does not by itself change the horse’s base coat color name.",
    ],
    diagram: "blaze",
    sources: [
      {
        label: "AQHA",
        url: "https://www.aqha.com/",
      },
    ],
  },
  {
    slug: "snip",
    name: "Snip",
    kind: "marking",
    summary: "A white mark between the nostrils on the muzzle.",
    idTips: [
      "Located on soft muzzle tissue.",
      "Can be tiny or extend into the lips.",
      "Common alongside a star or blaze.",
    ],
    diagram: "snip",
    sources: [
      {
        label: "AQHA",
        url: "https://www.aqha.com/",
      },
    ],
  },
  {
    slug: "sock",
    name: "Sock",
    kind: "marking",
    summary: "White marking on a leg that reaches about halfway up the cannon.",
    idTips: [
      "Higher than a coronet/pastern mark; lower than a stocking.",
      "Describe which leg (RF, LF, RH, LH).",
      "Does not change base coat color.",
    ],
    diagram: "sock",
    sources: [
      {
        label: "AQHA",
        url: "https://www.aqha.com/",
      },
    ],
  },
  {
    slug: "stocking",
    name: "Stocking",
    kind: "marking",
    summary: "White marking extending to the knee or hock (or higher).",
    idTips: [
      "Taller than a sock.",
      "Common on Paint/pinto patterned horses but can appear on any color.",
      "Record each leg separately for ID papers.",
    ],
    diagram: "stocking",
    sources: [
      {
        label: "AQHA",
        url: "https://www.aqha.com/",
      },
    ],
  },
  {
    slug: "piebald",
    name: "Piebald / skewbald",
    kind: "marking",
    summary:
      "British terms for large white patches: piebald = black-and-white; skewbald = white with any color except black. Related to pinto/Paint patterning.",
    idTips: [
      "Piebald specifically implies black base + white.",
      "Skewbald covers bay/chestnut/etc. with white.",
      "In North America, “pinto” or Paint pattern language is more common.",
    ],
    diagram: "piebald",
    sources: [
      {
        label: "American Paint Horse Association",
        url: "https://www.apha.com/",
      },
    ],
  },
];

export function getAllFeatures(): HorseFeature[] {
  return FEATURES;
}

export function getFeatureBySlug(slug: string): HorseFeature | undefined {
  return FEATURES.find((f) => f.slug === slug);
}

export function featuresByKind(kind: FeatureKind): HorseFeature[] {
  return FEATURES.filter((f) => f.kind === kind);
}
