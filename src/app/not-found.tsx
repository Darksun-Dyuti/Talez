import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">404</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold text-ink">This page wandered off.</h1>
      <p className="mt-5 text-muted">The archive is large, but this particular path is not part of it.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper">
        Return home
      </Link>
    </section>
  );
}
