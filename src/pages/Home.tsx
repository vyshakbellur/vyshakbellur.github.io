import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ArtisticBackground from '../components/ArtisticBackground';
import Console from '../components/Console';
import AdventureGallery from '../components/AdventureGallery';
import { profile } from '../data/profile';
import { hobbiesInfo, experience } from '../data/content';

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
      <section className="relative mx-auto max-w-6xl px-5 pb-10 pt-14 text-white overflow-hidden">
        <ArtisticBackground />

        <div className="relative z-10 grid gap-12 md:grid-cols-12 md:items-start lg:gap-16">
          {/* Left: text */}
          <div className="md:col-span-7">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl text-white/95">
              {profile.tagline.split('•')[0]} <br/>
              <span className="text-gold opacity-90 text-2xl md:text-3xl font-normal block mt-2 text-white/60">
                Musician • Runner • Adrenaline Junkie
              </span>
            </h1>

            <div className="mt-8 space-y-5 text-sm leading-relaxed text-slate-300">
              <p>
                I am a Senior Engineer at JPMorgan Chase and an applied ML researcher whose work spans three unlikely domains—financial infrastructure, computational biology, and digital humanities—connected by a single obsession: finding structure in complex, noisy systems.
              </p>
              <p>
                At JPMorgan Chase, I architect production ML systems with a focus on autonomous reliability, utilizing anomaly detection and automated recovery pipelines to reduce MTTR to under 15 minutes. In my research, I collaborate with Prof. Forest Rohwer at San Diego State University on microbiome network architecture and DNA Language Modeling for Metagenomics. Previously, my published work with Prof. Sam Kassegne in Oxford University Press applied computational pattern recognition to measure structural similarity across ancient writing systems.
              </p>
              <p>
                The common thread across all three: ML as a lens for recognizing patterns that cut across domain boundaries. Outside of the terminal, I run long distances, train for half-marathons, and run a music channel called <strong>v_naada</strong>.
              </p>
            </div>

            {/* Minimalist Iterative Socials */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href={profile.links.resume} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/80" /> Resume
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                GitHub ↗
              </a>
              <a href={profile.links.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                Scholar ↗
              </a>
              <a href={profile.links.medium} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                Medium ↗
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                LinkedIn ↗
              </a>
            </div>

            <div className="mt-14 space-y-12">
              {/* Education Block */}
              <div>
                <div className="mb-4 text-[10px] font-semibold tracking-widest text-white/30 uppercase">Education</div>
                <div className="flex flex-col gap-3 border-l border-white/10 pl-4">
                  <div className="flex flex-col group">
                    <span className="text-sm font-medium text-white/90 group-hover:text-gold transition-colors">University of Cumberlands</span>
                    <span className="text-xs text-white/50">Ph.D. Candidate</span>
                  </div>
                  <div className="flex flex-col group">
                    <span className="text-sm font-medium text-white/90 group-hover:text-gold transition-colors">San Diego State University</span>
                    <span className="text-xs text-white/50">Master of Science (M.S.)</span>
                  </div>
                </div>
              </div>

              {/* Experience Block */}
              <div>
                <div className="mb-4 text-[10px] font-semibold tracking-widest text-white/30 uppercase">Experience</div>
                <div className="flex flex-col gap-5 border-l border-white/10 pl-4">
                  {experience.map((x) => (
                    <div key={x.company} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline group">
                      <div className="text-sm font-medium text-white/90 group-hover:text-gold transition-colors">{x.company}</div>
                      <div className="text-[11px] text-white/40 font-mono tracking-wide">{x.period}</div>
                    </div>
                  ))}
                </div>
              </div>
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
