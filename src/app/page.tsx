export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[var(--background)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(31,77,54,0.16),transparent_50%),radial-gradient(ellipse_at_100%_100%,rgba(90,120,70,0.18),transparent_45%)]"
      />
      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20 sm:px-10">
        <p className="text-5xl font-semibold tracking-tight text-[var(--brand)] sm:text-6xl">
          Horse Edu
        </p>
        <h1 className="mt-6 max-w-xl text-2xl font-medium leading-snug text-[var(--foreground)] sm:text-3xl">
          Learn horsemanship with clarity and care.
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          A home for practical lessons, stable skills, and confident riding —
          built for students and instructors.
        </p>
        <div className="mt-10">
          <a
            href="#start"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--brand)] px-6 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-hover)]"
          >
            Get started
          </a>
        </div>
      </main>
    </div>
  );
}
