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

          {/* Desktop links - Piano Keys */}
          <nav className="hidden md:flex items-end gap-[2px] h-[40px]">
            {nav.map((n, i) => {
              const playNote = () => {
                try {
                  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const osc = ctx.createOscillator();
                  const gain = ctx.createGain();
                  
                  // Simple major scale (C4, E4, G4, etc)
                  const baseFreq = 261.63; // C4
                  const intervals = [1, 1.25, 1.5, 1.66, 2];
                  osc.frequency.value = baseFreq * (intervals[i % intervals.length]);
                  
                  osc.type = 'sine';
                  osc.connect(gain);
                  gain.connect(ctx.destination);
                  
                  osc.start();
                  // Envelope
                  gain.gain.setValueAtTime(0, ctx.currentTime);
                  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
                  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
                  osc.stop(ctx.currentTime + 1.5);
                } catch(e) { /* ignore if audio context blocked */ }
              };

              return (
                <NavLink
                  key={n.href}
                  to={n.href}
                  end={n.href === '/'}
                  onMouseDown={playNote}
                  className={({ isActive }) =>
                    `px-4 pt-1 pb-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-150 rounded-b-md border-b-[4px] border-l border-r border-white/5 cursor-pointer flex items-end justify-center h-full active:translate-y-1 active:border-b-0
                    ${isActive 
                      ? 'bg-gradient-to-b from-white/10 to-white/20 text-white border-b-gold shadow-[0_4px_15px_rgba(255,255,255,0.1)]' 
                      : 'bg-gradient-to-b from-transparent to-white/5 text-white/50 hover:text-white/90 hover:from-white/5 hover:to-white/10 border-b-slate-800'
                    }`
                  }
                >
                  {n.label}
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
