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
            Life & Adrenaline
          </span>
        </h1>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-16">
        
        {/* TRAVEL STATS CARD */}
        <div className="section-enter rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none -mr-10 -mt-10" />
          <div className="relative z-10">
            <div className="mb-2 font-semibold text-white/90 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="text-blue-400">❖</span> Exploration
            </div>
            <ul className="text-sm space-y-2 mt-4 text-white/70 font-mono">
              <li className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>US States Covered</span>
                <span className="text-white font-bold text-base">43</span>
              </li>
              <li className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Passports Stamped</span>
                <span className="text-white font-bold text-base">14</span>
              </li>
              <li className="flex justify-between items-center pt-1">
                <span>Coast to Coast Drives</span>
                <span className="text-amber-400 font-bold text-base">2x</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RUNNING STATS CARD */}
        <div className="section-enter rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px] pointer-events-none -mr-10 -mt-10" />
          <div className="relative z-10">
            <div className="mb-2 font-semibold text-white/90 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="text-pink-400">❖</span> Physical Endurance
            </div>
            <ul className="text-sm space-y-2 mt-4 text-white/70 font-mono">
              <li className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Full Marathons</span>
                <span className="text-white font-bold text-base">1</span>
              </li>
              <li className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Half Marathons</span>
                <span className="text-white font-bold text-base">6</span>
              </li>
              <li className="flex justify-between items-center pt-1 text-xs text-white/40 italic">
                Racing the streets of NYC.
              </li>
            </ul>
          </div>
          <a href={hobbiesInfo.running.nyrrHref} target="_blank" rel="noreferrer" className="relative z-10 mt-6 text-[10px] uppercase font-bold tracking-widest text-pink-400/80 hover:text-pink-400 transition-colors">NYRR Results ↗</a>
        </div>

        {/* ADVENTURE & MUSIC CARD */}
        <div className="section-enter rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none -mr-10 -mt-10" />
          <div className="relative z-10">
            <div className="mb-2 font-semibold text-white/90 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="text-emerald-400">❖</span> Sound & Sky
            </div>
            <ul className="text-sm space-y-2 mt-4 text-white/70 font-mono">
              <li className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-sans">Skydives</span>
                <span className="text-white font-bold text-base">3</span>
              </li>
              <li className="flex flex-col pt-2 text-xs leading-relaxed text-white/50 font-sans">
                Producing classical Indian fusion & contemporary sounds. <span className="text-white/80 font-serif italic mt-1 text-sm text-emerald-400">v_naada</span>
              </li>
            </ul>
          </div>
          <div className="relative z-10 mt-6 flex gap-4">
            <a href="https://instagram.com/v_naada" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-widest uppercase text-emerald-400/80 hover:text-emerald-400 transition-colors">Instagram ↗</a>
            <a href="https://youtube.com/@v_naada" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-widest uppercase text-emerald-400/80 hover:text-emerald-400 transition-colors">YouTube ↗</a>
          </div>
        </div>

      </div>


      
      {/* ─── NATIVE CSS CAROUSEL (Infinite horizontal snap) ─── */}
      <div className="section-enter w-full relative -mx-5 px-5 md:mx-0 md:px-0">
        
        {/* Fade Out Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#02040a] to-transparent z-10 hidden md:block pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#02040a] to-transparent z-10 hidden md:block pointer-events-none" />

        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory no-scrollbar pb-8">
          {dynamicImages.map((src, idx) => (
            <div 
              key={idx} 
              className="snap-center shrink-0 w-[80vw] sm:w-[350px] md:w-[450px] aspect-[4/3] group overflow-hidden rounded-2xl border border-white/5 relative"
            >
              <img 
                src={`/adventure/${src}`} 
                alt="Exploration Coordinates"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 cursor-grab active:cursor-grabbing" 
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white/40 font-mono text-[10px] tracking-widest uppercase flex justify-between">
                <span>{src.split('.')[0]}</span>
                <span className="text-white/20">{(idx + 1).toString().padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
