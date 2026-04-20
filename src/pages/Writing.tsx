import { useEffect, useRef } from 'react';

const articles = [
  {
    title: 'Bridging the Context Gap: A Technical Analysis of LLM Limitations and Enterprise Architectures',
    href: 'https://medium.com/@vyshak.x.bellur/bridging-the-context-gap-a-technical-analysis-of-llm-limitations-and-enterprise-architectures-d961dc35dcfc',
    where: 'Medium',
    tag: 'LLMs / Enterprise',
    blurb: 'A technical deep dive into why context breaks at scale and how enterprise architectures can mitigate limitations with retrieval, orchestration, and governance.',
  },
];

export default function Writing() {
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
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Blog</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
            Writing
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
          Technical writing on LLMs, system design, and engineering at scale.
        </p>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {articles.map((w) => (
          <a
            key={w.href}
            href={w.href}
            target="_blank"
            rel="noreferrer"
            className="section-enter group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs text-white/50">{w.where}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
                {w.tag}
              </span>
            </div>
            <div className="mb-2 font-semibold leading-snug text-white/95">{w.title}</div>
            <p className="text-sm leading-relaxed text-white/65">{w.blurb}</p>
            <div className="mt-4 text-xs text-white/50 group-hover:text-white/80 transition-colors">Read ↗</div>
          </a>
        ))}
      </div>
    </div>
  );
}
