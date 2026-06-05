import Image from "next/image";
import Link from "next/link";
import { Mail, Map, PenLine } from "lucide-react";
import { FollowAuthorButton } from "@/components/site/follow-author-button";
import { authorProfile } from "@/lib/data";

export const metadata = {
  title: "About",
  description: "Meet the author behind Talez and learn about the writing journey."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <Image src={authorProfile.image} alt={authorProfile.name} width={900} height={900} className="rounded-lg border border-line object-cover shadow-soft" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">About</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-ink">{authorProfile.name}</h1>
          <p className="mt-4 text-xl leading-8 text-muted">{authorProfile.title}</p>
          <p className="mt-6 leading-8 text-muted">{authorProfile.bio}</p>
          <blockquote className="mt-8 border-l-4 border-gold pl-5 font-serif text-2xl leading-snug text-ink">
            “{authorProfile.quote}”
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${authorProfile.email}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
              <Mail className="h-4 w-4" />
              Contact
            </a>
            {authorProfile.socials.map((social) => (
              <Link key={social.label} href={social.href} className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink">
                {social.label}
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <FollowAuthorButton />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {authorProfile.journey.map((item, index) => (
          <article key={item} className="rounded-lg border border-line bg-surface p-6">
            {index === 0 ? <PenLine className="h-6 w-6 text-ember" /> : <Map className="h-6 w-6 text-sage" />}
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-muted">Chapter {index + 1}</p>
            <p className="mt-3 leading-7 text-muted">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
