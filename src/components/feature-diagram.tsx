import type { HorseFeature } from "@/lib/features/catalog";

const HIGHLIGHT = "#e8a54b";

export function FeatureDiagram({
  feature,
  className = "",
}: {
  feature: HorseFeature;
  className?: string;
}) {
  const d = feature.diagram;
  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      role="img"
      aria-label={`Diagram highlighting the ${feature.name}`}
    >
      <ellipse cx="160" cy="200" rx="110" ry="10" fill="currentColor" opacity="0.08" />
      {/* Base horse */}
      <path
        d="M48 150c8-28 28-48 52-58 10-28 38-48 68-48 22 0 40 10 52 28 18-4 36 4 42 20 14 2 28 16 28 34 0 22-14 40-34 46v18c0 8-6 14-14 14h-12c-6 0-10-4-10-10v-8H140v10c0 6-4 10-10 10h-14c-8 0-14-6-14-14v-16c-22-8-40-28-44-54z"
        fill="#6b5a4a"
        opacity="0.85"
      />
      <path d="M155 55c-8 18-6 36 4 52" stroke="#3d3228" strokeWidth="8" fill="none" />
      <ellipse cx="248" cy="88" rx="18" ry="14" fill="#6b5a4a" />

      {d === "withers" && (
        <circle cx="168" cy="78" r="14" fill="none" stroke={HIGHLIGHT} strokeWidth="3" />
      )}
      {d === "poll" && (
        <circle cx="228" cy="58" r="12" fill="none" stroke={HIGHLIGHT} strokeWidth="3" />
      )}
      {d === "muzzle" && (
        <ellipse cx="262" cy="92" rx="14" ry="10" fill="none" stroke={HIGHLIGHT} strokeWidth="3" />
      )}
      {d === "cannon" && (
        <rect x="126" y="158" width="14" height="36" fill="none" stroke={HIGHLIGHT} strokeWidth="3" />
      )}
      {d === "hock" && (
        <circle cx="208" cy="155" r="12" fill="none" stroke={HIGHLIGHT} strokeWidth="3" />
      )}
      {d === "star" && (
        <circle cx="242" cy="72" r="8" fill="#F7F4EF" stroke={HIGHLIGHT} strokeWidth="2" />
      )}
      {d === "blaze" && (
        <path
          d="M242 70 L250 100 L246 110"
          stroke="#F7F4EF"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.95"
        />
      )}
      {d === "snip" && (
        <ellipse cx="258" cy="100" rx="7" ry="5" fill="#F7F4EF" stroke={HIGHLIGHT} strokeWidth="2" />
      )}
      {d === "sock" && (
        <rect x="126" y="175" width="16" height="22" fill="#F7F4EF" stroke={HIGHLIGHT} strokeWidth="2" />
      )}
      {d === "stocking" && (
        <rect x="126" y="155" width="16" height="42" fill="#F7F4EF" stroke={HIGHLIGHT} strokeWidth="2" />
      )}
      {d === "piebald" && (
        <g>
          <ellipse cx="120" cy="130" rx="32" ry="40" fill="#F7F4EF" opacity="0.95" />
          <ellipse cx="200" cy="140" rx="36" ry="36" fill="#F7F4EF" opacity="0.95" />
          <circle cx="160" cy="40" r="10" fill="none" stroke={HIGHLIGHT} strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}
