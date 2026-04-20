import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { profile } from '../data/profile';
import { nav } from '../data/nav';

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close hamburger on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById('mobile-menu');
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── Sticky nav ── */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled ? 'border-b border-white/10 bg-slate-950/60 backdrop-blur-xl' : ''
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-semibold tracking-tight text-white/90 hover:text-white transition-colors">
            {profile.fullName}
          </Link>
          <div className="flex items-center gap-4">

            {/* Hamburger — mobile only */}
            <button
              id="hamburger"
              className="md:hidden flex flex-col justify-center gap-1.5 p-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              <span className={`block h-px w-5 bg-white/80 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-px w-5 bg-white/80 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 bg-white/80 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl px-5 py-4 flex flex-col gap-4"
          >
            {nav.map((n) => (
              <NavLink
                key={n.href}
                to={n.href}
                end={n.href === '/'}
                className={({ isActive }) =>
                  `text-sm transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* ── Page content ── */}
      <main>
        <Outlet />
      </main>

      {/* ── Infinite Horizontal Acoustic Chandelier (Desktop) ── */}
      <div className="hidden md:block fixed top-[20px] left-[45%] w-0 h-0 z-40 pointer-events-none" style={{ perspective: '1200px' }}>
        <nav 
          className="relative flex items-start pointer-events-auto origin-top-left"
          style={{ transform: 'rotateX(35deg) rotateY(-25deg) rotateZ(15deg) scale(0.85)', transformStyle: 'preserve-3d' }}
        >
          {/* Wooden Headboard / Chandelier Frame */}
          <div 
            className="absolute top-[-30px] left-0 h-[30px] rounded-t-lg shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-start pl-8 border-b-4 border-black/90 z-0"
            style={{
              width: `${(35 * 40)}px`, // 35 white keys * 40px
              background: 'linear-gradient(to right, #451a03, #1a0a01)',
            }}
          >
            <div className="text-[12px] uppercase tracking-[0.4em] font-serif font-bold text-amber-500/80 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              Play to Navigate
            </div>
          </div>

          {/* 60 Piano Keys Array */}
          <div className="relative h-[80px] z-10" style={{ width: `${(35 * 40)}px` }}>
            {(() => {
              const baseFreq = 261.63; // C4
              const getFreq = (halfSteps: number) => baseFreq * Math.pow(2, halfSteps / 12);
              
              const synthKeys = Array.from({ length: 60 }).map((_, i) => {
                const step = i % 12;
                const isBlack = [1, 3, 6, 8, 10].includes(step);
                return { index: i, isBlack, freq: getFreq(i) };
              });

              // Map only the first few white keys to nav
              const navMap: Record<number, { href: string, icon: JSX.Element, label: string }> = {
                0: { href: '/', label: 'Sa (Do)', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                2: { href: '/experience', label: 'Re (Re)', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
                4: { href: '/credentials', label: 'Ga (Mi)', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
                5: { href: '/projects', label: 'Ma (Fa)', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
                7: { href: '/publications', label: 'Pa (Sol)', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
                9: { href: '/life', label: 'Da (La)', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
                11: { href: '/contact', label: 'Ni (Ti)', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
              };

              let whiteKeyIndex = 0;

              return synthKeys.map((key) => {
                const navData = navMap[key.index];

                const playNote = () => {
                  try {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.value = key.freq;
                    osc.type = 'square'; // giving it a harsh massive sound given the scale
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    gain.gain.setValueAtTime(0, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
                    osc.stop(ctx.currentTime + 1.2);
                  } catch(e) {}
                };

                const baseClasses = `transition-transform duration-75 cursor-pointer flex flex-col items-center justify-end pb-2 group active:rotate-x-[10deg] origin-top`;

                if (key.isBlack) {
                  const leftPos = (whiteKeyIndex * 40) - 12;
                  return (
                    <div 
                      key={`black-${key.index}`} 
                      onMouseDown={playNote}
                      className={`${baseClasses} absolute top-0 h-[55px] w-[24px] bg-gradient-to-b from-gray-800 to-black rounded-b-sm shadow-[0_20px_20px_rgba(0,0,0,1)] z-20 hover:bg-slate-800`}
                      style={{ left: `${leftPos}px` }}
                    />
                  );
                } else {
                  const currentWhiteOffset = whiteKeyIndex * 40;
                  whiteKeyIndex++;

                  if (navData) {
                    return (
                      <NavLink
                        key={`white-${key.index}`}
                        to={navData.href}
                        end={navData.href === '/'}
                        onMouseDown={playNote}
                        className={({ isActive }) => 
                          `${baseClasses} absolute top-0 h-[100px] w-[38px] bg-gradient-to-b from-white to-gray-200 text-black rounded-b-md shadow-[0_20px_35px_rgba(0,0,0,0.8)] z-10 hover:-translate-y-1 hover:bg-white
                          ${isActive ? 'border-b-4 border-b-gold !h-[105px]' : ''}`
                        }
                        style={{ left: `${currentWhiteOffset}px` }}
                      >
                        <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform duration-200">
                          {navData.icon}
                          <span className="text-[7px] font-black tracking-tighter opacity-80 group-hover:opacity-100 uppercase">{navData.label}</span>
                        </div>
                      </NavLink>
                    );
                  } else {
                    return (
                      <div 
                        key={`white-${key.index}`}
                        onMouseDown={playNote}
                        className={`${baseClasses} absolute top-0 h-[100px] w-[38px] bg-gradient-to-b from-white to-gray-200 rounded-b-md shadow-[0_20px_35px_rgba(0,0,0,0.8)] z-10`}
                        style={{ left: `${currentWhiteOffset}px` }}
                      />
                    );
                  }
                }
              });
            })()}
          </div>
        </nav>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {profile.name}</div>
          <div className="flex gap-4">
            <a className="hover:text-white transition-colors" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-white transition-colors" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="hover:text-white transition-colors" href={profile.links.medium} target="_blank" rel="noreferrer">Medium</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
