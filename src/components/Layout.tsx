import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import CompactHeader from './CompactHeader';
import Console from './Console';
import auroraUrl from '../assets/aurora_mountain.png';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#010610]">
        <img src={auroraUrl} alt="" className="h-full w-full object-cover opacity-[0.22]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010610] via-[#010610]/35 to-[#010610]/90" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="sticky top-0 z-50 flex-shrink-0">
          <CompactHeader />
        </div>

        <main className="relative flex-1">
          <Outlet />
        </main>

        {!isHome && (
          <>
            {chatOpen && (
              <div className="fixed bottom-20 right-4 z-[60] hidden w-[400px] max-w-[calc(100vw-2rem)] sm:block">
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/60">
                  <button
                    onClick={() => setChatOpen(false)}
                    className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                    aria-label="Close chat"
                  >
                    ✕
                  </button>
                  <Console />
                </div>
              </div>
            )}

            <button
              onClick={() => setChatOpen((open) => !open)}
              className={`fixed bottom-5 right-4 z-[55] hidden h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-lg shadow-black/40 transition-all hover:bg-amber-300 sm:flex ${
                chatOpen ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'
              }`}
              aria-label="Ask about Vyshak's work"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </>
        )}

        <footer className="border-t border-white/8 bg-[#050912]/90">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Vyshak Bellur</span>
            <div className="flex flex-wrap items-center gap-5">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
              <a href={profile.links.scholar} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Google Scholar</a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">GitHub</a>
              <a href={profile.links.resume} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Resume</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
