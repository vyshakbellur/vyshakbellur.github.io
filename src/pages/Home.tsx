import { Link } from 'react-router-dom';
import Console from '../components/Console';
import { profile } from '../data/profile';
import speakerHeadshotUrl from '../assets/ciso-new-york-portrait.jpg';

export default function Home() {
  return (
    <div className="relative z-10 w-full">
      
      {/* ── Content ── */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-145px)] max-w-[1280px] items-center gap-10 px-5 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(480px,1.1fr)] lg:px-8 lg:py-14">
        
        {/* ── LHS: Identity ── */}
        <div className="flex min-w-0 flex-col justify-center">
          
          {/* Black backdrop card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-black/35 p-7 shadow-2xl backdrop-blur-md sm:p-9 md:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
            
            <img 
              src={speakerHeadshotUrl} 
              alt="Vyshak Bellur" 
              className="mb-7 h-24 w-24 rounded-2xl border border-white/10 object-cover object-[center_24%] shadow-2xl sm:h-28 sm:w-28"
            />
            
            <h1 className="mb-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Trustworthy AI<br />for real-world systems.
            </h1>
            
            <p className="text-sm md:text-base font-semibold tracking-wide text-amber-400/90 mb-6 font-mono uppercase">
              Applied AI Researcher <span className="px-1 font-sans text-amber-400/40">|</span> Senior Software Engineer
            </p>

            <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-md mb-8">
              I build production systems in regulated financial services and research how people adopt governed generative AI. I speak on agentic security, AI governance, and reliable AI systems.
            </p>

            {/* Evidence micro-bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold tracking-widest uppercase text-white/40 mb-8">
              {['JPMorgan Chase', 'Oxford University Press', 'CISO New York panelist'].map((p, i) => (
                <span key={p} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/10">·</span>}
                  <span className="hover:text-white/80 transition-colors cursor-default">{p}</span>
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/speak"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition-all"
              >
                Speaking & topics
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 transition-all hover:bg-white/15 hover:text-white"
              >
                Invite or collaborate
              </Link>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white/80"
              >
                Resume
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-2 py-2 text-xs font-medium text-white/45 transition-all hover:text-white/75"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* ── RHS: Console ── */}
        <div className="hidden min-w-0 items-center justify-center lg:flex">
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
