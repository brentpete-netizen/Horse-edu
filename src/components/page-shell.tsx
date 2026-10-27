import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <div
        aria-hidden
        className="animate-soft-pulse pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_-10%,rgba(26,92,58,0.22),transparent_52%),radial-gradient(ellipse_at_90%_10%,rgba(232,165,75,0.16),transparent_42%),radial-gradient(ellipse_at_80%_100%,rgba(70,120,80,0.2),transparent_48%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 40h80M40 0v80' stroke='%231a5c3a' stroke-opacity='0.06' stroke-width='1'/%3E%3C/svg%3E\")",
        }}
      />
      <SiteHeader />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
