import { useState, useEffect, useCallback } from 'react';
import { adventurePhotos } from '../data/content';

export default function AdventureGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  const prev = useCallback(() => {
    setActive((i) => (i === null ? null : (i - 1 + adventurePhotos.length) % adventurePhotos.length));
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % adventurePhotos.length));
  }, []);

  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, close, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <>
      {/* Masonry grid */}
      <div
        style={{
          columns: '2',
          columnGap: '12px',
        }}
        className="sm:[column-count:3]"
      >
        {adventurePhotos.map((photo, i) => (
          <div
            key={photo.src}
            onClick={() => setActive(i)}
            className="group relative mb-3 cursor-pointer overflow-hidden rounded-xl break-inside-avoid"
            style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ display: 'block' }}
              onError={(e) => {
                // Fallback placeholder if image missing
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                const parent = el.parentElement;
                if (parent && !parent.querySelector('.placeholder')) {
                  const ph = document.createElement('div');
                  ph.className = 'placeholder';
                  ph.style.cssText = 'height:160px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;';
                  ph.innerHTML = `<span style="color:rgba(255,255,255,0.3);font-size:12px;">${photo.caption}</span>`;
                  parent.insertBefore(ph, el);
                }
              }}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
              <p className="text-sm font-semibold text-white leading-tight">{photo.caption}</p>
              <p className="text-xs text-white/70 mt-0.5">{photo.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          {/* Content container — stop propagation so clicking photo doesn't close */}
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={adventurePhotos[active].src}
              alt={adventurePhotos[active].caption}
              className="max-h-[80vh] max-w-[85vw] rounded-xl object-contain shadow-2xl"
            />
            <div className="mt-3 text-center">
              <p className="text-sm font-semibold text-white">{adventurePhotos[active].caption}</p>
              <p className="text-xs text-white/60">{adventurePhotos[active].location}</p>
            </div>

            {/* Close */}
            <button
              onClick={close}
              className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/25 transition-colors text-lg"
              aria-label="Close"
            >
              ×
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-[-50px] top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/25 transition-colors"
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-[-50px] top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/25 transition-colors"
              aria-label="Next"
            >
              ›
            </button>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/50">
            {active + 1} / {adventurePhotos.length}
          </div>
        </div>
      )}
    </>
  );
}
