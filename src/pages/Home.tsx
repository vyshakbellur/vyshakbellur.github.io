import Console from '../components/Console';
import { profile } from '../data/profile';
import speakerHeadshotUrl from '../assets/Vyshak_speaker.jpeg';

export default function Home() {
  return (
    <div className="relative w-full h-full overflow-hidden z-10">
      
      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-10 px-4 sm:px-8 py-6 max-w-[1400px] mx-auto">
        
        {/* ── LHS: Identity ── */}
        <div className="flex-1 flex flex-col justify-center min-w-0 lg:max-w-[480px]">
          
          {/* Black backdrop card */}
          <div className="rounded-3xl bg-black/40 backdrop-blur-md p-8 md:p-10 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
            
            <img 
              src={speakerHeadshotUrl} 
              alt="Vyshak Bellur" 
              className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border border-white/10 mb-8 shadow-2xl" 
            />
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
              Engineering trust<br />in complex systems.
            </h1>
            
            <p className="text-sm md:text-base font-semibold tracking-wide text-amber-400/90 mb-6 font-mono uppercase">
              Applied AI Researcher <span className="text-amber-400/40 font-sans px-1">|</span> Senior Software Engineer
            </p>

            <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-md mb-8">
              Building production-grade ML systems at JPMorgan Chase. Publishing cross-domain research. Speaking on agentic security and trustworthy AI architectures.
            </p>

            {/* Evidence micro-bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold tracking-widest uppercase text-white/40 mb-8">
              {['JPMorgan Chase', 'Oxford-Published', 'Conference Speaker', 'Hackathon Judge'].map((p, i) => (
                <span key={p} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/10">·</span>}
                  <span className="hover:text-white/80 transition-colors cursor-default">{p}</span>
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/15 hover:text-white transition-all"
              >
                Resume
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/8 px-4 py-2 text-xs font-medium text-white/50 hover:bg-white/5 hover:text-white/70 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* ── RHS: Console ── */}
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
