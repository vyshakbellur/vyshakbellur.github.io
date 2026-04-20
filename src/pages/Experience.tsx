import { useEffect, useRef } from 'react';
import { experience } from '../data/content';

export default function Experience() {
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
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Professional</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Experience
          </span>
        </h1>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      <div className="flex flex-col gap-6 pl-4 border-l-2 border-white/10">
        {experience.map((x) => (
          <div key={x.company} className="section-enter relative group pl-6">
            <div className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-white/20 group-hover:bg-gold transition-colors" />
            <div className="mb-2 font-mono text-xs tracking-widest text-gold/70 uppercase">
              {x.period}
            </div>
            <div className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors">{x.company}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
