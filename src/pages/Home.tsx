import Console from '../components/Console';
import { profile } from '../data/profile';
import mtRainierUrl from '../assets/mt_rainier_aurora.png';

const FACETS = [
  'Enterprise AI Engineer',
  'Speaker · Writer',
  'Runner',
  'Musician',
  'Adventure Traveler',
];

export default function Home() {
  return (
    <div className="relative w-full h-full overflow-hidden z-10">
      
      {/* ── Mount Rainier & Aurora Backdrop ── */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center bg-[#010610]">
        <img 
          src={mtRainierUrl} 
          alt="Mount Rainier Aurora Sky" 
          className="w-full h-full object-cover opacity-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/90 pointer-events-none" /> 
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-10 px-4 sm:px-8 py-6 max-w-[1400px] mx-auto">
        
        {/* ── LHS: Identity ── */}
        <div className="flex-1 flex flex-col justify-center min-w-0 lg:max-w-[440px] xl:max-w-[480px]">
          
          <div className="mb-5">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white/95 leading-tight mb-4">
              Machine Learning Researcher
            </h1>
            
            <div className="mb-5">
              <span className="text-[10px] font-medium tracking-widest uppercase text-white/30 block mb-2">who happens to be</span>
              <div className="flex flex-wrap gap-2">
                {FACETS.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/55 hover:text-white/80 hover:border-white/20 transition-colors cursor-default"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-white/60 max-w-md">
              <p>
                Working on trustworthy AI systems and studying how machine learning transfers across domains: from ancient manuscripts and DNA to enterprise cloud platforms.
              </p>
              <p>
                Curiosity has taken me from machine learning research and enterprise software to marathons, music, and expeditions across six continents. I believe the best engineering begins with asking better questions.
              </p>
              <p className="text-white/40 text-xs">
                Currently exploring how machine learning helps us understand, secure, and automate complex systems.
              </p>
            </div>
          </div>

          {/* Resume CTA */}
          <div className="flex flex-wrap gap-3 mt-1">
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500/90 to-amber-600/90 px-4 py-2 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-900/30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Resume
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white/90 transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── RHS: Chatbot Console ── */}
        <div className="flex-1 flex items-center justify-center min-w-0 w-full lg:w-auto">
          <div className="w-full max-w-[700px] relative">
            <div className="relative w-full z-10 transition-all duration-300">
              <Console />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
