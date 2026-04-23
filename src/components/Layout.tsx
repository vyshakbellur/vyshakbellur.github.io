import { Outlet } from 'react-router-dom';
import { profile } from '../data/profile';
import CompactHeader from './CompactHeader';

export default function Layout() {
  return (
    <div className="h-screen overflow-hidden flex flex-col text-slate-100 bg-slate-950">
      
      {/* ── Global transformer backdrop ── */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: 'url(/transformer_backdrop.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.22 }} />

      {/* ── Universally Sleek Header ── */}
      <div className="flex-shrink-0 z-50">
         <CompactHeader />
      </div>

      <main className="flex-1 overflow-y-auto relative z-10 min-h-0 no-scrollbar">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="flex-shrink-0 z-50 bg-transparent relative overflow-hidden group border-t-0" style={{ height: 110 }}>
        {/* Left Side: Air Jordans */}
        <img 
          src="/src/assets/air_jordans.png" 
          alt="Air Jordans Kicks" 
          className="absolute -bottom-16 -left-12 w-56 object-contain mix-blend-screen opacity-70 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500 z-0"
        />

        {/* Left Side: Running Medals */}
        <img 
          src="/src/assets/running_medals.png" 
          alt="Marathon Medals" 
          className="absolute -bottom-[50px] left-[180px] w-[380px] object-contain mix-blend-screen opacity-30 group-hover:opacity-40 hover:!opacity-80 transition-all duration-700 pointer-events-none scale-125 z-0"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)' }}
        />

        <div className="h-full mx-auto max-w-[1400px] flex items-center justify-between px-6 pl-40 gap-6 relative z-10">
          <div className="flex-1 flex items-center">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 shrink-0 hidden md:block">
              © {new Date().getFullYear()} VABK
            </span>
          </div>

          <div className="flex items-center gap-10 shrink-0">
            {/* Logos */}
            <div className="flex items-center gap-6">
              <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity cursor-default animate-pulse" style={{ animationDuration: '3s' }}>
                <svg width="28" height="28" viewBox="0 0 26 26" className="drop-shadow-[0_0_8px_rgba(204,0,0,0.8)]">
                  <rect width="26" height="26" rx="4" fill="#CC0000" />
                  <text x="13" y="18" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="Georgia,serif" fill="white">SDSU</text>
                </svg>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity cursor-default hover:animate-ping" style={{ animationDuration: '2s' }}>
                <img 
                  src="/src/assets/rcb_logo.png" 
                  alt="RCB Lion Crest" 
                  className="w-[34px] h-[34px] mix-blend-screen drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]"
                />
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity cursor-default animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <svg width="28" height="28" viewBox="0 0 26 26" className="drop-shadow-[0_0_8px_rgba(0,48,135,0.8)]">
                  <rect width="26" height="26" rx="4" fill="#003087" />
                  <text x="13" y="11" textAnchor="middle" fontSize="5.5" fontWeight="900" fontFamily="Georgia,serif" fill="#FFD700">UNIV OF</text>
                  <text x="13" y="20" textAnchor="middle" fontSize="5" fontWeight="900" fontFamily="Georgia,serif" fill="white">CUMB.</text>
                </svg>
              </div>
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block" />

            {/* Core Contact icons */}
            <div className="flex items-center gap-7">
              <a title="GitHub" href={profile.links.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-cyan-400 transition-all hover:scale-125 duration-200 drop-shadow-[0_0_8px_currentColor]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a title="LinkedIn" href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-blue-500 transition-all hover:scale-125 duration-200 drop-shadow-[0_0_8px_currentColor]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a title="Medium" href={profile.links.medium} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-125 duration-200 drop-shadow-[0_0_8px_currentColor]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
              <a title="Google Scholar" href={profile.links.scholar} target="_blank" rel="noreferrer" className="text-white/40 hover:text-amber-400 transition-all hover:scale-125 duration-200 drop-shadow-[0_0_8px_currentColor]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
