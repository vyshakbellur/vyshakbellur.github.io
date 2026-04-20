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
          <Link to="/" className="font-semibold tracking-tight text-white/90 hover:text-white transition-colors z-50">
            {profile.fullName}
          </Link>

          {/* SVG Musical Staff Router */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[300px] h-[60px] z-50 group">
             {/* 5 Staff Lines */}
             <div className="absolute w-full h-[1px] bg-white/20 top-[15px]" />
             <div className="absolute w-full h-[1px] bg-white/20 top-[23px]" />
             <div className="absolute w-full h-[1px] bg-white/20 top-[31px]" />
             <div className="absolute w-full h-[1px] bg-white/20 top-[39px]" />
             <div className="absolute w-full h-[1px] bg-white/20 top-[47px]" />
             
             {/* G-Clef aesthetics */}
             <div className="absolute left-[5px] top-[15px] font-serif italic text-2xl text-white/40 font-bold opacity-80 pointer-events-none">
               𝄞
             </div>

             {/* Musical Notes mapped to Navigation */}
             {nav.map((n, i) => {
               // Plot notes up/down the staff
               const yOffsets = [43, 35, 27, 19, 11, 23, 31];
               const topPos = yOffsets[i % yOffsets.length];
               const leftPos = 40 + (i * 35);
               return (
                 <NavLink
                   key={n.href}
                   to={n.href}
                   end={n.href === '/'}
                   className={({ isActive }) => `
                      absolute w-[10px] h-[8px] rounded-full rotate-[-15deg] transition-all duration-300 group-hover:drop-shadow-[0_0_10px_white]
                      ${isActive ? 'bg-gold shadow-[0_0_8px_#ffd700]' : 'bg-slate-300 hover:bg-white hover:scale-125'}
                   `}
                   style={{ top: `${topPos}px`, left: `${leftPos}px` }}
                   title={n.label}
                 >
                   {/* Visual stem pointing up/down depending on staff height */}
                   <div className={`w-[2px] h-[20px] bg-current absolute ${topPos > 27 ? 'bottom-[4px] right-[0px]' : 'top-[4px] left-[0px]'}`} />
                   
                   {/* Text Label on hover */}
                   <span className="absolute left-1/2 -translate-x-1/2 top-4 opacity-0 transition-opacity whitespace-nowrap text-[8px] uppercase tracking-widest font-black text-white bg-black/80 px-1 py-0.5 rounded pointer-events-none group-hover:opacity-100">
                     {n.label}
                   </span>
                 </NavLink>
               );
             })}
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
