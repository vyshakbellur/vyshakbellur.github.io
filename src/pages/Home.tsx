import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroBackground from '../components/HeroBackground';
import Console from '../components/Console';
import AdventureGallery from '../components/AdventureGallery';
import { profile } from '../data/profile';
import { hobbiesInfo } from '../data/content';

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) el.querySelectorAll('.section-enter').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-6xl px-5 pb-10 pt-14">
        <HeroBackground />

        <div className="grid gap-10 md:grid-cols-12 md:items-center">

          {/* Left: text */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span>{profile.location}</span>
              <span className="text-white/35">•</span>
              <span>Full-stack + GenAI systems</span>
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
                {profile.tagline}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              I build production-grade software and explore practical ML/LLM
              architectures—clean UX, reliable services, and deployments that scale.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={profile.links.resume}
                className="rounded-xl bg-gradient-to-r from-red-600 via-yellow-500 to-red-500 px-5 py-2 text-sm font-semibold text-white"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
              <a
                href={profile.links.github}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href={profile.links.scholar}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Scholar
              </a>
              <a
                href={profile.links.medium}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Medium
              </a>
              <a
                href={profile.links.linkedin}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {profile.highlights.map((x) => (
                <div key={x.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">{x.k}</div>
                  <div className="mt-1 text-sm font-medium text-white/90">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Console Chatbot */}
          <div className="md:col-span-5 flex items-center justify-center">
            <Console />
          </div>
        </div>

        {/* Promo card */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70">
          Want the &quot;wow&quot; page? Go to{' '}
          <Link to="/ml" className="text-sky-400 hover:text-sky-300 transition-colors">
            ML &amp; AWS
          </Link>{' '}
          — that&apos;s where I show architecture + deployments.
        </div>
      </section>

      {/* ── Hobbies ── */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="section-enter mb-6 text-xl font-semibold tracking-tight text-white/95">
          Life outside the terminal
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Music card */}
          <div className="section-enter rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 text-sm font-medium text-white/90">Music</div>
            <p className="text-sm leading-relaxed text-white/65">
              Part of <span className="text-white/80">v_naada</span> — a music channel exploring
              classical Indian traditions and contemporary sounds.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="https://instagram.com/v_naada"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/60 hover:text-white/90 transition-colors"
              >
                Instagram ↗
              </a>
              <a
                href="https://youtube.com/@v_naada"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/60 hover:text-white/90 transition-colors"
              >
                YouTube ↗
              </a>
            </div>
          </div>

          {/* ── Running card (Task 1) ── */}
          <div className="section-enter rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 text-sm font-medium text-white/90">Running</div>
            <p className="text-sm leading-relaxed text-white/65">
              {hobbiesInfo.running.description}
            </p>
            <a
              href={hobbiesInfo.running.nyrrHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-xs text-white/60 hover:text-white/90 transition-colors"
            >
              NYRR Results ↗
            </a>
          </div>

          {/* Writing card */}
          <div className="section-enter rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 text-sm font-medium text-white/90">Writing</div>
            <p className="text-sm leading-relaxed text-white/65">
              Technical deep-dives on LLM limitations, enterprise architectures, and engineering
              patterns — published on Medium.
            </p>
            <Link
              to="/writing"
              className="mt-4 inline-block text-xs text-white/60 hover:text-white/90 transition-colors"
            >
              Read articles ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ── Adventures ── */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="section-enter mb-6 text-xl font-semibold tracking-tight text-white/95">
          Adventures
        </h2>
        <p className="section-enter mb-6 max-w-2xl text-sm leading-relaxed text-white/60">
          {hobbiesInfo.travel.description}
        </p>
        <AdventureGallery />
      </section>

      {/* ── Tech pills ── */}
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="section-enter flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Java', 'AWS', 'Python', 'LLMs', 'RAG', 'Spring Boot', 'PostgreSQL'].map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </section>
    </div>
  );
}
