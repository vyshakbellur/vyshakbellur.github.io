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

          {/* Desktop links - Carnatic Piano Keys */}
          <nav className="hidden md:flex items-start gap-1 h-[60px] relative">
            {nav.map((n, i) => {
              // 7-note Shankarabharanam ratio (C Major equivalent: Sa, Re, Ga, Ma, Pa, Da, Ni)
              const ratios = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8];
              // Map index 0-6 to the ratios
              const exactRatio = ratios[i % ratios.length];
              
              // We'll alternate them as White (indexes 0, 2, 4, 6) and Black (indexes 1, 3, 5) purely visually.
              const isBlackKey = i % 2 !== 0;

              const playNote = () => {
                try {
                  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const osc = ctx.createOscillator();
                  const gain = ctx.createGain();
                  
                  const baseFreq = 261.63; // Sa (C4)
                  osc.frequency.value = baseFreq * exactRatio;
                  
                  osc.type = 'sine';
                  osc.connect(gain);
                  gain.connect(ctx.destination);
                  
                  osc.start();
                  gain.gain.setValueAtTime(0, ctx.currentTime);
                  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
                  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
                  osc.stop(ctx.currentTime + 1.5);
                } catch(e) { }
              };

              // White Key classes
              const whiteKeyStyle = `h-[60px] w-14 bg-gradient-to-b from-white/90 to-white/70 text-slate-900 shadow-[0_4px_10px_rgba(255,255,255,0.2)] rounded-b-md border-b-4 border-slate-300`;
              // Black Key classes (slightly shorter, elevated)
              const blackKeyStyle = `h-[40px] w-12 bg-gradient-to-b from-slate-900 to-black text-white/90 shadow-[0_4px_10px_rgba(0,0,0,0.5)] rounded-b-sm border-b-4 border-slate-700 z-10 -mx-3`;

              return (
                <NavLink
                  key={n.href}
                  to={n.href}
                  end={n.href === '/'}
                  onMouseDown={playNote}
                  className={({ isActive }) =>
                    `flex items-end justify-center pb-2 text-[9px] font-bold uppercase tracking-widest transition-transform duration-100 cursor-pointer active:translate-y-1 active:border-b-0
                    ${isBlackKey ? blackKeyStyle : whiteKeyStyle}
                    ${isActive ? 'ring-2 ring-gold' : ''}`
                  }
                >
                  {n.label.substring(0, 3)}
                </NavLink>
              );
            })}
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
