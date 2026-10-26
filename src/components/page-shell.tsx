import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(31,77,54,0.16),transparent_50%),radial-gradient(ellipse_at_100%_100%,rgba(90,120,70,0.18),transparent_45%)]"
      />
      <SiteHeader />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
