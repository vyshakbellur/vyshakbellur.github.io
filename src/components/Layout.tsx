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
          {/* Piano Navbar Synth */}
          <nav className="relative hidden md:flex items-start h-[60px]">
            {/* We will build a 24-key synth (2 Octaves: C4 -> B5) 
                14 White keys, 10 Black keys overlapping. */}
            {(() => {
              const baseFreq = 261.63; // C4
              // 12-TET calculation helper
              const getFreq = (halfSteps: number) => baseFreq * Math.pow(2, halfSteps / 12);
              
              // Define the 24 keys
              const synthKeys = Array.from({ length: 24 }).map((_, i) => {
                const oct = Math.floor(i / 12);
                const step = i % 12;
                const isBlack = [1, 3, 6, 8, 10].includes(step);
                return { index: i, isBlack, freq: getFreq(i) };
              });

              // The 7 nav endpoints mapped to the first 7 white keys of the first octave
              // White key steps in octave 0: 0, 2, 4, 5, 7, 9, 11
              const navMap: Record<number, { href: string, icon: JSX.Element }> = {
                0: { href: '/', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                2: { href: '/experience', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
                4: { href: '/credentials', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
                5: { href: '/projects', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
                7: { href: '/publications', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
                9: { href: '/life', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
                11: { href: '/contact', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
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
                    osc.type = 'sine';
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    gain.gain.setValueAtTime(0, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
                    osc.stop(ctx.currentTime + 1.2);
                  } catch(e) {}
                };

                const baseClasses = `transition-transform duration-100 cursor-pointer active:translate-y-1 active:border-b-0 flex items-end justify-center pb-2 relative group hover:scale-y-[1.15] origin-top`;

                if (key.isBlack) {
                  const leftPos = (whiteKeyIndex * 40) - 12; // overlay over the seam
                  return (
                    <div 
                      key={`black-${key.index}`} 
                      onMouseDown={playNote}
                      className={`${baseClasses} absolute top-0 h-[40px] w-[24px] bg-gradient-to-b from-slate-800 to-black rounded-b-sm border-b-4 border-slate-700 shadow-[0_4px_10px_rgba(0,0,0,0.8)] z-20`}
                      style={{ left: `${leftPos}px` }}
                    />
                  );
                } else {
                  // It's a white key
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
                          `${baseClasses} absolute top-0 h-[60px] w-[38px] bg-gradient-to-b from-white/90 to-white/70 text-slate-800 rounded-b-md border-b-4 border-slate-300 shadow-[0_4px_10px_rgba(255,255,255,0.2)] z-10 
                          ${isActive ? 'ring-2 ring-gold !scale-y-110 !border-b-gold !text-gold' : 'hover:!text-gold hover:!border-b-gold'}`
                        }
                        style={{ left: `${currentWhiteOffset}px` }}
                      >
                        <div className="group-hover:scale-110 transition-transform duration-200">
                          {navData.icon}
                        </div>
                      </NavLink>
                    );
                  } else {
                    return (
                      <div 
                        key={`white-${key.index}`}
                        onMouseDown={playNote}
                        className={`${baseClasses} absolute top-0 h-[60px] w-[38px] bg-gradient-to-b from-white/90 to-white/70 rounded-b-md border-b-4 border-slate-300 shadow-[0_4px_10px_rgba(255,255,255,0.2)] z-10`}
                        style={{ left: `${currentWhiteOffset}px` }}
                      />
                    );
                  }
                }
              });
            })()}
            {/* The absolute container needs explicitly set width since children are absolute (14 white keys * 40px = 560px) */}
            <div className="w-[560px]" />
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={profile.links.linkedin}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/15 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Connect
            </a>

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
