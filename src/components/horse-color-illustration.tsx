import type { CoatColor } from "@/lib/colors/catalog";

/** Side-view silhouette with ID cues (points, mane, patterns, dorsal stripe). */
export function HorseColorIllustration({
  color,
  className = "",
}: {
  color: CoatColor;
  className?: string;
}) {
  const { body, mane, points, pattern, dorsalStripe, flaxen } = color.art;
  const pointColor = points ?? mane;
  const maneColor = flaxen ? "#F5F0E1" : mane;

  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      role="img"
      aria-label={`${color.name} coat illustration`}
    >
      <defs>
        <clipPath id={`horse-${color.slug}`}>
          <path d="M48 150c8-28 28-48 52-58 10-28 38-48 68-48 22 0 40 10 52 28 18-4 36 4 42 20 14 2 28 16 28 34 0 22-14 40-34 46v18c0 8-6 14-14 14h-12c-6 0-10-4-10-10v-8H140v10c0 6-4 10-10 10h-14c-8 0-14-6-14-14v-16c-22-8-40-28-44-54z" />
        </clipPath>
      </defs>

      {/* Ground */}
      <ellipse cx="160" cy="200" rx="110" ry="10" fill="currentColor" opacity="0.08" />

      {/* Body */}
      <path
        d="M48 150c8-28 28-48 52-58 10-28 38-48 68-48 22 0 40 10 52 28 18-4 36 4 42 20 14 2 28 16 28 34 0 22-14 40-34 46v18c0 8-6 14-14 14h-12c-6 0-10-4-10-10v-8H140v10c0 6-4 10-10 10h-14c-8 0-14-6-14-14v-16c-22-8-40-28-44-54z"
        fill={body}
      />

      {/* Black points (legs) for bay/dun */}
      {points && (
        <>
          <path d="M95 155h18v40H95z" fill={pointColor} />
          <path d="M128 160h18v38h-18z" fill={pointColor} />
          <path d="M198 158h18v40h-18z" fill={pointColor} />
          <path d="M232 155h18v42h-18z" fill={pointColor} />
        </>
      )}

      {/* Mane & tail */}
      <path
        d="M155 55c-8 18-6 36 4 52 12-6 22-20 26-38-6-8-16-14-30-14z"
        fill={maneColor}
      />
      <path
        d="M48 148c-16 8-28 28-22 44 18-4 32-16 40-32-6-4-12-8-18-12z"
        fill={maneColor}
      />

      {/* Head accent */}
      <ellipse cx="248" cy="88" rx="18" ry="14" fill={body} />
      <ellipse cx="258" cy="84" rx="3" ry="2.5" fill="#1a120c" opacity="0.7" />

      {/* Tobiano-style white patches */}
      {pattern === "tobiano" && (
        <g clipPath={`url(#horse-${color.slug})`} opacity="0.95">
          <ellipse cx="120" cy="130" rx="36" ry="48" fill="#F7F4EF" />
          <ellipse cx="200" cy="145" rx="40" ry="42" fill="#F7F4EF" />
          <rect x="90" y="155" width="28" height="42" fill="#F7F4EF" />
          <rect x="220" y="155" width="30" height="42" fill="#F7F4EF" />
        </g>
      )}

      {/* Appaloosa blanket + spots */}
      {pattern === "blanket" && (
        <g clipPath={`url(#horse-${color.slug})`}>
          <ellipse cx="150" cy="120" rx="55" ry="40" fill="#F7F4EF" opacity="0.95" />
          {[
            [130, 110],
            [150, 105],
            [170, 115],
            [140, 130],
            [160, 128],
            [145, 118],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="5" fill={body} opacity="0.85" />
          ))}
        </g>
      )}

      {pattern === "leopard" && (
        <g clipPath={`url(#horse-${color.slug})`}>
          <rect x="40" y="40" width="260" height="160" fill="#F7F4EF" opacity="0.9" />
          {[
            [100, 100],
            [130, 90],
            [160, 110],
            [190, 95],
            [120, 130],
            [170, 135],
            [210, 120],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="7" fill={body} />
          ))}
        </g>
      )}

      {/* Dun dorsal stripe */}
      {dorsalStripe && (
        <path
          d="M70 148 C120 100, 180 90, 230 100"
          stroke="#5C4030"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      )}

      {/* Ear */}
      <path d="M230 62l8-16 6 14z" fill={body} stroke="#1a120c" strokeWidth="0.5" opacity="0.9" />
    </svg>
  );
}
