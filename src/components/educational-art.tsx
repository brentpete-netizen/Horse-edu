import Image from "next/image";
import type { ReactNode } from "react";

type EducationalArtProps = {
  /** Public path like /colors/bay.webp when Grok art is present */
  artSrc: string | null;
  alt: string;
  fallback: ReactNode;
  className?: string;
  /** Aspect box for raster art */
  imageClassName?: string;
};

/** Prefer dropped Grok Imagine files; otherwise keep SVG/diagram fallback. */
export function EducationalArt({
  artSrc,
  alt,
  fallback,
  className = "",
  imageClassName = "relative aspect-[4/3] w-full overflow-hidden bg-[var(--brand)]/8",
}: EducationalArtProps) {
  if (artSrc) {
    return (
      <div className={`${imageClassName} ${className}`}>
        <Image
          src={artSrc}
          alt={alt}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 480px"
          unoptimized
        />
      </div>
    );
  }

  return <div className={className}>{fallback}</div>;
}
