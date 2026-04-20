import { useEffect, useRef } from 'react';
import { projects } from '../data/content';

const statusConfig = {
  production: { label: 'Production', color: 'bg-green-400/20 text-green-300 border-green-400/30' },
  research:   { label: 'Research',   color: 'bg-blue-400/20 text-blue-300 border-blue-400/30'   },
  published:  { label: 'Published',  color: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30' },
  live:       { label: 'Live',       color: 'bg-purple-400/20 text-purple-300 border-purple-400/30' },
};

export default function Projects() {
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
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-14">
      <div className="section-enter mb-10">
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Work</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => {
          const s = statusConfig[p.status];
          return (
            <div
              key={p.title}
              className="section-enter rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:bg-white/10"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${s.color}`}>
                  {s.label}
                </span>
              </div>
              <div className="mb-1 font-semibold text-white/95">{p.title}</div>
              <p className="mb-4 text-sm leading-relaxed text-white/65">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
                    {t}
                  </span>
                ))}
              </div>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-white/50 hover:text-white/90 transition-colors"
                >
                  Open ↗
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
