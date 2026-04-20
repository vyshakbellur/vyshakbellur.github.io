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
      const navEl = document.getElementById('mobile-menu');
      if (navEl && !navEl.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // The AI Autopilot Sequencer (Listens for `play-song` events from Console.tsx)
  useEffect(() => {
    const autopilot = async (e: any) => {
      const song = e.detail;
      if (song === 'titanic') {
        const sequence = [
          [5, 400], [7, 600], [12, 1000], [10, 400], [9, 400], [7, 600], [5, 400], [4, 400], [5, 1000]
        ];
        // C4 is index 0. F=5, G=7, C5=12, Bb=10, A=9, E=4.
        for (const [index, duration] of sequence) {
          const keyEl = document.getElementById(`synth-key-${index}`);
          if (keyEl) {
            keyEl.style.transform = 'translateY(15px) rotateX(15deg)';
            keyEl.style.backgroundColor = '#ff5f56'; // macOS red indicator
            setTimeout(() => {
              keyEl.style.transform = '';
              keyEl.style.backgroundColor = '';
            }, duration - 100);
          }

          try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = 261.63 * Math.pow(2, index / 12);
            osc.type = 'square';
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (duration / 1000));
            osc.stop(ctx.currentTime + (duration / 1000));
          } catch (err) {}

          await new Promise(r => setTimeout(r, duration));
        }
      }
    };
    window.addEventListener('play-song', autopilot);
    return () => window.removeEventListener('play-song', autopilot);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── Sticky nav ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/10 bg-slate-950/60 backdrop-blur-xl' : ''
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 relative">
          
          {/* LHS: Name + Staff Navigation */}
          <div className="flex flex-col gap-2 relative z-50">
            <Link to="/" className="font-semibold tracking-tight text-white/90 hover:text-white transition-colors">
              {profile.fullName}
            </Link>

            {/* SVG Musical Staff Router */}
            <div className="relative w-[340px] h-[40px] group mt-1">
               {/* 4 Staff Lines */}
               <div className="absolute w-full h-[1px] bg-white/20 top-[10px]" />
               <div className="absolute w-full h-[1px] bg-white/20 top-[18px]" />
               <div className="absolute w-full h-[1px] bg-white/20 top-[26px]" />
               <div className="absolute w-full h-[1px] bg-white/20 top-[34px]" />
               
               {/* Clef aesthetics (Bookends) */}
               <div className="absolute left-[0px] top-[4px] font-serif italic text-2xl text-white/30 font-bold pointer-events-none">
                 𝄞
               </div>
               <div className="absolute right-[0px] top-[4px] font-serif text-2xl text-white/30 font-bold pointer-events-none">
                 𝄢
               </div>

               {/* Musical Notes mapped to Navigation via SVG icons */}
               {(() => {
                 const iconMap = [
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                 ];
                 
                 return nav.map((n, i) => {
                   const yOffsets = [28, 20, 12, 4, 12, 20, 28];
                   const topPos = yOffsets[i % yOffsets.length];
                   const leftPos = 40 + (i * 35);
                   return (
                     <NavLink
                       key={n.href}
                       to={n.href}
                       end={n.href === '/'}
                       className={({ isActive }) => `
                          absolute w-[20px] h-[20px] flex items-center justify-center rounded bg-slate-900 border transition-all duration-300 group-hover:drop-shadow-[0_0_10px_white] hover:scale-125 z-10
                          ${isActive ? 'border-gold text-gold shadow-[0_0_8px_#ffd700]' : 'border-white/10 text-white/70 hover:bg-white hover:text-black'}
                       `}
                       style={{ top: `${topPos}px`, left: `${leftPos}px` }}
                       title={n.label}
                     >
                       {/* SVG Icon */}
                       {iconMap[i]}
                       
                       {/* Text Label on hover */}
                       <span className="absolute left-1/2 -translate-x-1/2 top-6 opacity-0 transition-opacity whitespace-nowrap text-[8px] uppercase tracking-widest font-black text-white bg-black/80 px-1 py-0.5 rounded pointer-events-none group-hover:opacity-100">
                         {n.label}
                       </span>
                     </NavLink>
                   );
                 });
               })()}
            </div>
          </div>

          <div className="flex items-center gap-4 z-50">
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
              V_Naada Auto-Acoustic
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

              let whiteKeyIndex = 0;

              return synthKeys.map((key) => {
                const playNote = () => {
                  try {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.value = key.freq;
                    osc.type = 'square';
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    gain.gain.setValueAtTime(0, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
                    osc.stop(ctx.currentTime + 1.2);
                  } catch(e) {}
                  
                  // Visual trigger
                  const keyEl = document.getElementById(`synth-key-${key.index}`);
                  if (keyEl) {
                    keyEl.style.transform = 'translateY(15px) rotateX(15deg)';
                    keyEl.style.backgroundColor = '#ffbd2e'; // Yellow for manual click
                    setTimeout(() => {
                      keyEl.style.transform = '';
                      keyEl.style.backgroundColor = '';
                    }, 100);
                  }
                };

                const baseClasses = `transition-transform duration-100 cursor-pointer flex flex-col items-center justify-end pb-2 origin-top`;

                if (key.isBlack) {
                  const leftPos = (whiteKeyIndex * 40) - 12;
                  return (
                    <div 
                      key={`black-${key.index}`} 
                      id={`synth-key-${key.index}`}
                      onMouseDown={playNote}
                      className={`${baseClasses} absolute top-0 h-[55px] w-[24px] bg-gradient-to-b from-gray-800 to-black rounded-b-sm shadow-[0_20px_20px_rgba(0,0,0,1)] z-20 hover:bg-slate-800`}
                      style={{ left: `${leftPos}px`, transition: 'all 0.1s ease-out' }}
                    />
                  );
                } else {
                  const currentWhiteOffset = whiteKeyIndex * 40;
                  whiteKeyIndex++;

                  return (
                    <div 
                      key={`white-${key.index}`}
                      id={`synth-key-${key.index}`}
                      onMouseDown={playNote}
                      className={`${baseClasses} absolute top-0 h-[100px] w-[38px] bg-gradient-to-b from-white to-gray-200 rounded-b-md shadow-[0_20px_35px_rgba(0,0,0,0.8)] z-10 hover:-translate-y-1 hover:bg-white`}
                      style={{ left: `${currentWhiteOffset}px`, transition: 'all 0.1s ease-out' }}
                    />
                  );
                }
              });
            })()}
          </div>
        </nav>
      </div>

      {/* ── Page content ── */}
      <main>
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-10 mt-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {profile.name}</div>
          <div className="flex gap-4 z-50">
            <a className="hover:text-white transition-colors" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-white transition-colors" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="hover:text-white transition-colors" href={profile.links.medium} target="_blank" rel="noreferrer">Medium</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
