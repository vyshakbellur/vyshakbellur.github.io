import Console from '../components/Console';
import { profile } from '../data/profile';
import mtRainierUrl from '../assets/mt_rainier_aurora.png';

const FACETS = [
  'Oxford-Published Researcher',
  'Innovation Week 2026 Speaker',
  'Enterprise AI Architect',
  'PhD Candidate (ML)',
  'Hackathon Judge & Mentor',
];

const PROOF_POINTS = [
  'JPMorgan Chase',
  'ML Researcher',
  'Adventure Traveller',
  'Marathoner',
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/70 pointer-events-none" /> 
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-10 px-4 sm:px-8 py-6 max-w-[1400px] mx-auto">
        
        {/* ── LHS: Identity ── */}
        <div className="flex-1 flex flex-col justify-center min-w-0 lg:max-w-[440px] xl:max-w-[480px]">
          
          <div className="mb-5">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white/95 leading-tight mb-2">
              AI Researcher &<br className="hidden md:inline" /> Senior Software Engineer
            </h1>
            <p className="text-xs md:text-sm font-medium tracking-wide text-amber-400/95 mb-5">
              Trustworthy AI Across Enterprise Systems, Genomics & Cultural Heritage
            </p>
            
            <div className="mb-5">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/45 block mb-2">credentials</span>
              <div className="flex flex-wrap gap-2">
                {FACETS.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/16 bg-white/[0.06] px-3 py-1 text-xs text-white/70 hover:text-white/90 hover:border-white/25 transition-colors cursor-default"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 text-sm leading-[1.7] text-white/85 max-w-md">
              <p>
                My work spans trustworthy AI, production machine learning, metagenomics, and document intelligence. I have built systems used in enterprise environments, published research across interdisciplinary domains, and contributed to technical communities through speaking, mentoring, reviewing, and judging.
              </p>
            </div>

            {/* Evidence micro-bar */}
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] tracking-wide text-white/50">
              {PROOF_POINTS.map((p, i) => (
                <span key={p} className="flex items-center gap-2">
                  {i > 0 && <span className="text-amber-400/40">·</span>}
                  <span className="hover:text-white/75 transition-colors">{p}</span>
                </span>
              ))}
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
