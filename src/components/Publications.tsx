import { useEffect, useRef } from 'react';
import { publications } from '../data/content';

export default function Publications() {
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
    <section id="publications" ref={sectionRef} className="py-24 bg-ink-soft">
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-enter mb-12">
          <div className="tag mb-4">02 / Publications</div>
          <h2 className="font-display font-bold text-cream text-4xl md:text-5xl">
            Research &amp;{' '}
            <span className="text-gold-gradient">Writing</span>
          </h2>
          <div className="gold-line" />
        </div>

        <div className="flex flex-col gap-6">
          {publications.map((pub, i) => (
            <div
              key={pub.title}
              className="section-enter p-8 rounded-sm"
              style={{
                borderLeft: '3px solid #c9a84c',
                background: 'rgba(13,13,13,0.5)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderLeftColor: '#c9a84c',
                borderLeftWidth: '3px',
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="tag">{pub.tier}</span>
                <span className="font-mono text-xs text-mist">{pub.year}</span>
                <span className="font-mono text-xs text-mist">{pub.publisher}</span>
              </div>

              <h3 className="font-display font-semibold italic text-cream text-2xl md:text-3xl mb-3 leading-tight">
                {pub.title}
              </h3>

              <p className="font-mono text-sm text-gold mb-1">{pub.journal}</p>
              {pub.coAuthor && (
                <p className="font-mono text-xs text-mist mb-4">with {pub.coAuthor}</p>
              )}

              <p className="text-mist text-sm leading-relaxed mb-6">{pub.desc}</p>

              {pub.href && (
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs tracking-widest uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors"
                >
                  READ PUBLICATION ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
