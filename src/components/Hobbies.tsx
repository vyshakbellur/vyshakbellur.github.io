import { useState, useEffect, useRef, useCallback } from 'react';
import { adventurePhotos, poems, hobbiesInfo } from '../data/content';

type Tab = 'music' | 'running' | 'travel' | 'poetry';

function MasonryGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setLightbox((i) => ((i ?? 0) + 1) % adventurePhotos.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => ((i ?? 0) - 1 + adventurePhotos.length) % adventurePhotos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, close]);

  return (
    <>
      <div className="masonry-gallery mt-6">
        {adventurePhotos.map((photo, i) => (
          <div
            key={photo.src}
            className="masonry-item cursor-pointer"
            onClick={() => setLightbox(i)}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              style={{ minHeight: '160px', background: 'rgba(201,168,76,0.05)' }}
            />
            <div className="photo-overlay">
              <p className="font-mono text-xs text-gold">{photo.caption}</p>
              <p className="font-mono text-xs text-mist">{photo.location}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(13,13,13,0.96)' }}
          onClick={close}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gold text-4xl p-4 hover:text-gold-light z-10 leading-none"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => ((i ?? 0) - 1 + adventurePhotos.length) % adventurePhotos.length); }}
          >
            ←
          </button>

          <div className="relative max-w-4xl w-full px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={adventurePhotos[lightbox].src}
              alt={adventurePhotos[lightbox].caption}
              className="w-full max-h-[80vh] object-contain rounded"
            />
            <div className="text-center mt-4">
              <p className="font-mono text-sm text-gold">{adventurePhotos[lightbox].caption}</p>
              <p className="font-mono text-xs text-mist mt-1">{adventurePhotos[lightbox].location}</p>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gold text-4xl p-4 hover:text-gold-light z-10 leading-none"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => ((i ?? 0) + 1) % adventurePhotos.length); }}
          >
            →
          </button>

          <button
            className="absolute top-4 right-4 text-mist hover:text-gold font-mono text-xs tracking-widest"
            onClick={close}
          >
            ESC ✕
          </button>
        </div>
      )}
    </>
  );
}

export default function Hobbies() {
  const [tab, setTab] = useState<Tab>('music');
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

  const tabs: { key: Tab; icon: string; label: string }[] = [
    { key: 'music', icon: '♪', label: 'Music' },
    { key: 'running', icon: '◎', label: 'Running' },
    { key: 'travel', icon: '△', label: 'Travel' },
    { key: 'poetry', icon: '✦', label: 'Poetry' },
  ];

  return (
    <section id="hobbies" ref={sectionRef} className="py-24 max-w-6xl mx-auto px-6">
      <div className="section-enter mb-12">
        <div className="tag mb-4">03 / Hobbies</div>
        <h2 className="font-display font-bold text-cream text-4xl md:text-5xl">
          Beyond the{' '}
          <span className="text-gold-gradient">Terminal</span>
        </h2>
        <div className="gold-line" />
      </div>

      <div className="section-enter flex flex-wrap gap-3 mb-10 border-b border-cream/5 pb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
              tab === t.key
                ? 'border-gold text-gold bg-gold/5'
                : 'border-cream/10 text-mist hover:border-gold/30 hover:text-cream'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === 'music' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cream/5 bg-ink-soft p-8 rounded-sm card-hover">
            <div className="tag mb-4">{hobbiesInfo.music.channel}</div>
            <p className="text-mist leading-relaxed mb-6">{hobbiesInfo.music.description}</p>
            <div className="flex flex-wrap gap-3">
              <a href={hobbiesInfo.music.instagram} target="_blank" rel="noreferrer"
                className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-gold/40 text-gold hover:bg-gold/10 transition-all">
                Instagram ↗
              </a>
              <a href={hobbiesInfo.music.youtube} target="_blank" rel="noreferrer"
                className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-ember/40 text-ember hover:bg-ember/10 transition-all">
                YouTube ↗
              </a>
            </div>
          </div>
          <div className="border border-gold/10 bg-ink-soft p-8 rounded-sm flex items-center justify-center">
            <div
              className="font-display font-bold text-gold-gradient animate-float text-center"
              style={{ fontSize: 'clamp(5rem, 15vw, 8rem)', lineHeight: 1 }}
            >
              नाद
            </div>
          </div>
        </div>
      )}

      {tab === 'running' && (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {hobbiesInfo.running.stats.map((stat) => (
              <div key={stat.label} className="border border-cream/5 bg-ink-soft p-6 rounded-sm text-center card-hover">
                <div className="font-display font-bold text-gold text-3xl md:text-4xl">{stat.value}</div>
                <div className="font-mono text-xs text-mist mt-1 tracking-widest uppercase">{stat.unit}</div>
                <div className="font-mono text-xs text-mist/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="border border-cream/5 bg-ink-soft p-6 rounded-sm">
            <p className="text-mist leading-relaxed">{hobbiesInfo.running.description}</p>
          </div>
        </div>
      )}

      {tab === 'travel' && (
        <div>
          <p className="text-mist leading-relaxed mb-8 max-w-2xl">{hobbiesInfo.travel.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {hobbiesInfo.travel.places.map((place) => (
              <span key={place} className="font-mono text-xs px-3 py-1.5 border border-gold/20 text-gold">
                {place}
              </span>
            ))}
          </div>
          <MasonryGallery />
        </div>
      )}

      {tab === 'poetry' && (
        <div className="grid md:grid-cols-3 gap-6">
          {poems.map((poem) => (
            <div
              key={poem.title}
              className="bg-ink-soft p-6 rounded-sm card-hover"
              style={{ border: '1px solid rgba(255,255,255,0.05)', borderLeft: '2px solid rgba(201,168,76,0.4)' }}
            >
              <h3 className="font-display font-semibold italic text-gold text-lg mb-4">{poem.title}</h3>
              <div className="space-y-1">
                {poem.lines.map((line, i) =>
                  line === '' ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <p key={i} className="italic text-mist text-sm leading-relaxed">{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
