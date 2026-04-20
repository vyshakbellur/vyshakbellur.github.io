import { useEffect, useRef } from 'react';
import { projects } from '../data/content';

const statusConfig = {
  production: { label: 'Production', color: '#22c55e', glow: 'rgba(34,197,94,0.4)' },
  research: { label: 'Research', color: '#3b82f6', glow: 'rgba(59,130,246,0.4)' },
  published: { label: 'Published', color: '#c9a84c', glow: 'rgba(201,168,76,0.4)' },
  live: { label: 'Live', color: '#a855f7', glow: 'rgba(168,85,247,0.4)' },
};

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="work" ref={sectionRef} className="py-24 max-w-6xl mx-auto px-6">
      <div className="section-enter mb-12">
        <div className="tag mb-4">01 / Work</div>
        <h2 className="font-display font-bold text-cream text-4xl md:text-5xl">
          Engineering &amp;{' '}
          <span className="text-gold-gradient">Research</span>
        </h2>
        <div className="gold-line" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => {
          const status = statusConfig[project.status];
          return (
            <div
              key={project.title}
              className="section-enter card-hover border border-cream/5 bg-ink-soft p-6 rounded-sm"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: status.color, boxShadow: `0 0 8px ${status.glow}` }}
                />
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: status.color }}>
                  {status.label}
                </span>
              </div>

              <h3 className="font-display font-semibold text-cream text-xl mb-2">{project.title}</h3>
              <p className="text-mist text-sm leading-relaxed mb-4">{project.desc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs px-2 py-0.5 border border-cream/10 text-mist">
                    {tag}
                  </span>
                ))}
              </div>

              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
                >
                  VIEW ↗
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
