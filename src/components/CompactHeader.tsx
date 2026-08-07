import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav } from '../data/nav';
import { profile } from '../data/profile';

/* Per-page accent colours — complement each page's content palette */
const PAGE_ACCENT: Record<string, string> = {
  '/about':        '#F2E8D0',  /* warm ivory — about */
  '/speak':        '#facc15',  /* gold — speaking engagements */
  '/writing':      '#38bdf8',  /* sky blue — blog / writing */
  '/contact':      '#c084fc',  /* lavender — message */
};

function accent(pathname: string): string {
  return PAGE_ACCENT[pathname] ?? '#F2E8D0';
}

/* ══════════════════════════════════════════════════════════════════ */
export default function CompactHeader() {
  const { pathname } = useLocation();
  const ac = accent(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="flex flex-shrink-0 z-50 items-center relative"
        style={{
          height: 76,  /* Matched precisely to the Home Piano header height */
          background: 'rgba(10,15,26,0.97)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${ac}22`,
          boxShadow: `0 1px 0 ${ac}10, 0 4px 24px rgba(0,0,0,0.8), 0 1px 6px ${ac}08`,
          padding: '0 32px',
          gap: 0,
        }}
      >
        {/* ── Name / home link ── */}
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2, marginRight: 'auto' }}
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-[18px] md:text-[24px]" style={{
            fontWeight: 900, fontFamily: 'Georgia,serif',
            letterSpacing: '0.04em', lineHeight: 1,
            transition: 'color 0.3s, text-shadow 0.3s',
          }}>
            <span style={{ color: ac, textShadow: `0 0 18px ${ac}44` }}>VYSHAK</span>
            <span style={{ color: `${ac}35` }}>{' '}ATHREYA</span>
          </span>
          <span className="text-[8px] md:text-[11.5px]" style={{
            fontWeight: 600, letterSpacing: '0.22em',
            fontFamily: 'Georgia,serif', lineHeight: 1,
          }}>
            <span style={{ color: `${ac}99` }}>BELLUR</span>
            <span style={{ color: `${ac}30` }}>{' '}KESHAVAMURTHY</span>
          </span>
        </Link>

        {/* ── Mobile Hamburger Toggle ── */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>

        {/* ── Separator (Desktop) ── */}
        <div className="hidden md:block" style={{ width: 1, height: 36, background: `${ac}18`, marginRight: 24 }} />

        {/* ── Nav links (Desktop) ── */}
        <nav className="hidden md:flex items-center gap-2">
          {nav.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 6,
                fontSize: 11,
                fontFamily: 'monospace',
                fontWeight: isActive ? 900 : 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: isActive ? ac : 'rgba(255,255,255,0.72)',
                background: isActive ? `${ac}14` : 'transparent',
                borderBottom: isActive ? `2px solid ${ac}` : '2px solid transparent',
                transition: 'color 0.15s, background 0.15s, border-color 0.15s',
                whiteSpace: 'nowrap',
              })}
            >
              {item.label}
            </NavLink>
          ))}
          
          <div className="w-px h-6 bg-white/10 mx-2" />
          
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 rounded text-[11px] font-black font-mono tracking-widest uppercase transition-all duration-200 hover:scale-105"
            style={{ 
              color: '#0a0f1a',
              background: ac,
              boxShadow: `0 0 12px ${ac}50`
            }}
          >
            Resume
          </a>
        </nav>
      </header>

      {/* ── Mobile Dropdown Menu ── */}
      {menuOpen && (
        <div className="md:hidden absolute top-[76px] left-0 right-0 bg-[#050300]/95 backdrop-blur-xl border-b border-white/10 z-40 shadow-2xl flex flex-col">
          {nav.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `
                px-8 py-5 border-b border-white/5 font-mono text-sm tracking-widest uppercase transition-colors
                ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}
              `}
              style={({ isActive }) => ({
                color: isActive ? ac : 'rgba(255,255,255,0.6)',
                borderLeft: isActive ? `4px solid ${ac}` : '4px solid transparent',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
