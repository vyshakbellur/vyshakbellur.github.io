import { useEffect, useRef } from 'react';
import { hobbiesInfo } from '../data/content';

const dynamicImages = [
  "1181332_317541653_XLarge.jpg",
  "4e63cf4b-9641-4bf6-a5f0-033bcf089dde.jpg",
  "5FDB777C-75EE-447F-83E6-6F73D2FB2A82.jpg",
  "89a27617-600e-4c19-ba6d-4554aa1405ce.jpg",
  "GEO_5480.jpg",
  "GEO_5496.jpg",
  "IMG_1245.JPG",
  "IMG_1247.JPG",
  "IMG_6329.jpeg",
  "IMG_9181 2.jpg",
  "Skydive-00061.jpeg",
  "a30a4386-d447-47e3-9246-495a67c078e5.jpg"
];

export default function Life() {
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
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Beyond the Terminal</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Life
          </span>
        </h1>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <div className="section-enter rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between">
          <div>
            <div className="mb-2 font-semibold text-white/90">Music</div>
            <p className="text-sm leading-relaxed text-white/60">
              Part of <span className="text-white/80">v_naada</span> — a channel exploring classical Indian traditions and contemporary sounds.
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            <a href="https://instagram.com/v_naada" target="_blank" rel="noreferrer" className="text-xs text-white/60 hover:text-white transition-colors">Instagram ↗</a>
            <a href="https://youtube.com/@v_naada" target="_blank" rel="noreferrer" className="text-xs text-white/60 hover:text-white transition-colors">YouTube ↗</a>
          </div>
        </div>

        <div className="section-enter rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between">
          <div>
            <div className="mb-2 font-semibold text-white/90">Running</div>
            <p className="text-sm leading-relaxed text-white/60">1 Full Marathon, 6 Half Marathons, running the streets of NYC.</p>
          </div>
          <a href={hobbiesInfo.running.nyrrHref} target="_blank" rel="noreferrer" className="mt-6 text-xs text-white/60 hover:text-white transition-colors">NYRR Results ↗</a>
        </div>
      </div>

      <h2 className="section-enter text-xl font-semibold tracking-tight text-white/95 mb-8">Adventures</h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dynamicImages.map((src, idx) => (
          <div key={idx} className="group overflow-hidden rounded-2xl border border-white/5 bg-white/5 relative aspect-square">
            <img 
              src={`/adventure/${src}`} 
              alt="Adventure"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-100" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
