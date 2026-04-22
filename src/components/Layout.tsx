import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { nav } from '../data/nav';
import CompactHeader from './CompactHeader';


/* ─── Audio singleton ─────────────────────────────────────────────────── */
let globalAudioCtx: AudioContext | null = null;
const initAudio = () => {
  if (!globalAudioCtx)
    globalAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
  return globalAudioCtx;
};

/* ─── Piano: 3 octaves ─────────────────────────────────────────────────
   36 semitones → 21 white + 15 black keys, all uniform size.
──────────────────────────────────────────────────────────────────────── */
const BLACK_S = new Set([1, 3, 6, 8, 10]);
const NS = 36;
const WW = 66;    // white key width  ← wider for legible stacked text
const WH = 165;   // white key height  ← taller for stacked character labels
const BW = 40;    // black key width
const BH = 86;    // black key height
const KGAP = 1;

interface KInfo { s: number; freq: number; isBlack: boolean; x: number; wi: number; }
const buildKeys = (): KInfo[] => {
  const out: KInfo[] = [];
  let wi = 0;
  for (let s = 0; s < NS; s++) {
    const freq = 261.63 * Math.pow(2, s / 12);
    const isBlack = BLACK_S.has(s % 12);
    if (!isBlack) {
      out.push({ s, freq, isBlack, x: wi * (WW + KGAP), wi });
      wi++;
    } else {
      out.push({ s, freq, isBlack, x: (wi - 1) * (WW + KGAP) + WW - BW / 2, wi: wi - 0.5 });
    }
  }
  return out;
};
const ALL_KEYS = buildKeys();
const PIANO_W = 21 * (WW + KGAP); // ≈ 1155 px

/* ─── Nav icons (8 keys) ──────────────────────────────────────────────── */
const ICONS: React.ReactNode[] = [
  <svg key="h" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  <svg key="a" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  <svg key="e" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/></svg>,
  <svg key="x" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  <svg key="p" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="r" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  <svg key="l" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  <svg key="c" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
];

/* ─── Identity persona tags ───────────────────────────────────────────── */
const PERSONAS = [
  { label: 'Cross domain ML Researcher', color: '#F5A623' },
  { label: 'PhD Candidate',              color: '#FB923C' },
  { label: 'Musician',                   color: '#A78BFA' },
  { label: 'Adventure Traveller',        color: '#34D399' },
  { label: 'Runner',                     color: '#FB7185' },
];

/* ─── Flash util ──────────────────────────────────────────────────────── */
const flashEl = (id: string, bg = '#ffbd2e') => {
  const el = document.getElementById(id) as HTMLElement | null;
  if (!el) return;
  el.style.filter = 'brightness(0.65)';
  el.style.backgroundColor = bg;
  setTimeout(() => { el.style.filter = ''; el.style.backgroundColor = ''; }, 160);
};

/* ══════════════════════════════════════════════════════════════════════ */
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  /* Piano on '/' only; all other pages get the compact nav */
  const isHome = location.pathname === '/';

  /* Close mobile menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const h = (e: MouseEvent) => {
      if (!document.getElementById('mobile-menu')?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [menuOpen]);

  /* Autopilot sequencer */
  useEffect(() => {
    const ap = async (e: any) => {
      if (e.detail !== 'titanic') return;
      const seq: [number, number][] = [[5,400],[7,600],[12,1000],[10,400],[9,400],[7,600],[5,400],[4,400],[5,1000]];
      const ctx = initAudio();
      for (const [i, d] of seq) {
        flashEl(`sk-${i}`, '#ff5f56');
        try {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.frequency.value = 261.63 * Math.pow(2, i / 12); o.type = 'square';
          o.connect(g); g.connect(ctx.destination); o.start();
          g.gain.setValueAtTime(0, ctx.currentTime);
          g.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d / 1000);
          o.stop(ctx.currentTime + d / 1000);
        } catch { }
        await new Promise(r => setTimeout(r, d));
      }
    };
    window.addEventListener('play-song', ap);
    return () => window.removeEventListener('play-song', ap);
  }, []);

  /* Play a single note */
  const playNote = (freq: number, id: string) => {
    try {
      const ctx = initAudio();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = freq; o.type = 'square';
      o.connect(g); g.connect(ctx.destination); o.start();
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      o.stop(ctx.currentTime + 1.0);
    } catch { }
    flashEl(id);
  };

  /* Key base styles */
  const whiteBase: React.CSSProperties = {
    position: 'absolute', top: 0, width: WW, height: WH,
    background: 'linear-gradient(180deg,#fff 0%,#ddd 100%)',
    borderRadius: '0 0 6px 6px', cursor: 'pointer', zIndex: 10,
    overflow: 'hidden', border: '1px solid rgba(0,0,0,0.09)',
    boxShadow: '1px 0 1px rgba(0,0,0,0.1),0 5px 12px rgba(0,0,0,0.4)',
    transition: 'filter .07s,background-color .07s',
  };
  const blackBase: React.CSSProperties = {
    position: 'absolute', top: 0, width: BW, height: BH,
    background: 'linear-gradient(180deg,#222 0%,#000 100%)',
    borderRadius: '0 0 5px 5px', cursor: 'pointer', zIndex: 20,
    boxShadow: '0 8px 18px rgba(0,0,0,0.9)',
    transition: 'filter .07s,background-color .07s',
  };

  return (
    /*
     * Root shell:  h-screen + overflow-hidden = viewport-locked shell.
     * Children stack: header (fixed height) → main (flex-1, scrolls) → footer (fixed height).
     */
    <div className="h-screen overflow-hidden flex flex-col text-slate-100 bg-slate-950">

      {/* ── Global transformer backdrop ── */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: 'url(/transformer_backdrop.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.22 }} />

      {/* Desktop header: full piano on home, compact nav everywhere else */}
      {isHome && (
      <header
        className="relative hidden md:block flex-shrink-0 z-50 shadow-[0_4px_24px_rgba(0,0,0,0.9)] border-b border-white/5"
        style={{ height: 270, background: '#070300' }}
      >
        {/* piano strip — centered horizontally, no scrollbar */}
        <div style={{
          width: '100%', overflow: 'hidden',
          background: '#070300', paddingTop: 10,
          display: 'flex', justifyContent: 'center',   /* CENTER the piano */
        }}>
          <div style={{ display: 'inline-block', transformOrigin: 'center top', transform: 'perspective(2400px) rotateX(3deg)' }}>

            {/*
             * Wooden piano case frame — dark walnut border wrapping
             * headboard + keys + fallboard as a unified instrument.
             */}
            <div style={{
              display: 'inline-block',
              border: '5px solid #1e0900',
              borderRadius: '14px',
              boxShadow: [
                'inset 0 0 0 1px rgba(255,180,80,0.10)',   /* inner gold rim */
                '0 0 0 2px rgba(10,3,0,0.9)',              /* outer dark halo */
                '0 16px 60px rgba(0,0,0,0.90)',            /* deep shadow    */
              ].join(','),
              overflow: 'hidden',
            }}>
            <div style={{
              width: PIANO_W, height: 76,
              /* Piano-lacquer black with very subtle warm walnut grain at edges */
              background: 'linear-gradient(90deg, #1a0800 0%, #080300 18%, #030100 50%, #080300 82%, #1a0800 100%)',
              borderBottom: '6px solid rgba(0,0,0,0.98)',
              display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 32px',
              boxShadow: 'inset 0 1px 0 rgba(255,200,100,0.08)',
            }}>
              {/* Name — title + subtitle, left-aligned — white/cream on black lacquer */}
              <Link to="/" className="group block" style={{ lineHeight: 1, textAlign: 'left' }}>
                <div style={{
                  fontSize: 25, fontWeight: 900, letterSpacing: '0.04em',
                  color: '#F2E8D0',          /* warm ivory white */
                  textShadow: '0 0 30px rgba(255,230,160,0.35)',
                  lineHeight: 1,
                  fontFamily: 'Georgia, serif',
                }}
                  className="group-hover:text-amber-300 transition-colors">
                  VYSHAK ATHREYA
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.22em',
                  color: 'rgba(242,232,208,0.52)',  /* same ivory, dimmed */
                  lineHeight: 1.4, marginTop: 4,
                  fontFamily: 'Georgia, serif',
                  textTransform: 'uppercase',
                }}
                  className="group-hover:text-amber-200/70 transition-colors">
                  Bellur Keshavamurthy
                </div>
              </Link>

              {/* Main Navigation (Right aligned) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                {nav.map((n, i) => (
                  <div key={n.href} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    {i > 0 && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />}
                    <NavLink 
                      to={n.href} 
                      end={n.href === '/'} 
                      className={({ isActive }) => `text-[11px] font-black tracking-[0.16em] uppercase transition-all duration-300 ${isActive ? 'text-[#F5A623] drop-shadow-[0_0_8px_rgba(245,166,35,0.6)] scale-105' : 'text-white/40 hover:text-white'}`}
                    >
                      {n.label}
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>

            {/* Key canvas */}
            <div style={{ position: 'relative', width: PIANO_W, height: WH }}>
              {/* White keys (Purely for music playing now) */}
              {ALL_KEYS.filter(k => !k.isBlack).map(key => (
                <div 
                  key={`sk-${key.s}`} 
                  id={`sk-${key.s}`} 
                  onPointerDown={(e) => { e.preventDefault(); playNote(key.freq, `sk-${key.s}`); }} 
                  style={{ ...whiteBase, left: key.x }} 
                />
              ))}
              
              {/* Black keys */}
              {ALL_KEYS.filter(k => k.isBlack).map(key => (
                <div key={`sk-${key.s}`} id={`sk-${key.s}`}
                  onPointerDown={(e) => { e.preventDefault(); playNote(key.freq, `sk-${key.s}`); }}
                  style={{ ...blackBase, left: key.x }} />
              ))}
            </div>

            {/* Fallboard (bottom case rail) */}
            <div style={{ width: PIANO_W, height: 8, background: '#0d0400' }} />

            </div> {/* end wooden frame */}
          </div>
        </div>
      </header>
      )}
      {!isHome && <CompactHeader />}

      {/* ════════════════════════════════════════════════════════════
          MOBILE HEADER
      ════════════════════════════════════════════════════════════ */}
      <div className="md:hidden flex-shrink-0 z-50 flex items-center justify-between px-5 py-4 bg-slate-950 border-b border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
        <Link to="/" className="flex flex-col leading-tight">
          <span style={{ fontSize: 14, fontWeight: 900, color: '#F5A623', letterSpacing: '-0.02em' }}>VYSHAK ATHREYA</span>
          <span style={{ fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.35em', color: '#F5A62360' }}>ML researcher · Musician · Runner</span>
        </Link>
        <button className="flex flex-col justify-center gap-1.5 p-2.5 rounded-xl border border-white/10 bg-black/40"
          onClick={() => setMenuOpen(o => !o)} aria-label="menu">
          <span className={`block h-px w-5 bg-white/80 transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px w-5 bg-white/80 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-white/80 transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden flex-shrink-0 z-50 bg-slate-950/98 border-b border-white/5 px-5 py-4 flex flex-col gap-4">
          {nav.map(n => (
            <NavLink key={n.href} to={n.href} end={n.href === '/'}
              className={({ isActive }) => `text-xs font-black tracking-[0.4em] uppercase transition-colors ${isActive ? 'text-amber-400' : 'text-white/60 hover:text-white'}`}
              onClick={() => setMenuOpen(false)}>
              {n.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          MAIN — scrollable, sits between fixed header + footer
      ════════════════════════════════════════════════════════════ */}
      <main className="flex-1 overflow-y-auto relative z-10 min-h-0">
        <Outlet />
      </main>

      {/* ════════════════════════════════════════════════════════════
          FOOTER — fixed height, never scrolls away
      ════════════════════════════════════════════════════════════ */}
      <footer className="flex-shrink-0 z-50 bg-transparent relative overflow-hidden group border-t-0" style={{ height: 110 }}>
        
        {/* Left Side: Air Jordans bleeding off the screen */}
        <img 
          src="/src/assets/air_jordans.png" 
          alt="Air Jordans Kicks" 
          className="absolute -bottom-16 -left-12 w-56 object-contain mix-blend-screen opacity-70 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500 z-0"
        />

        {/* Left Side: Running Medals right next to the shoes */}
        <img 
          src="/src/assets/running_medals.png" 
          alt="Marathon Medals" 
          className="absolute -bottom-[50px] left-[180px] w-[380px] object-contain mix-blend-screen opacity-30 group-hover:opacity-40 hover:!opacity-80 transition-all duration-700 pointer-events-none scale-125 z-0 mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)' }}
        />

        <div className="h-full mx-auto max-w-[1400px] flex items-center justify-between px-6 pl-40 gap-6 relative z-10">

          {/* LHS: copyright (and open space for shoes/medals) */}
          <div className="flex-1 flex items-center">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 shrink-0 hidden md:block">
              © {new Date().getFullYear()} VABK
            </span>
          </div>

          {/* RHS: Glittering Logos alongside Contact Links */}
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
