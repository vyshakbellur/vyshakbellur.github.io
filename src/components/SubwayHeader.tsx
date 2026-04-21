import { Link, useLocation, useNavigate } from 'react-router-dom';
import { nav } from '../data/nav';

/* ── MTA line circle colors (one per nav compartment) ─────────────── */
const MTA = ['#EE352E','#FF6319','#FCCC0A','#00933C','#0039A6','#B933AD','#6E3219','#808183'];

const PERSONAS = [
  { label: 'Cross-domain ML Researcher', color: '#F5A623' },
  { label: 'PhD Candidate',              color: '#fff' },
  { label: 'Musician',                   color: '#F5A623' },
  { label: 'Adventure Traveller',        color: '#fff' },
  { label: 'Runner',                     color: '#F5A623' },
];

/* Body gradient shared by cab + compartments */
const BODY_BG =
  'linear-gradient(180deg,#5c5c65 0%,#bbbbc4 5%,#adadb6 64%,#36363e 78%,#1e1e26 100%)';

const BODY_H = 116;   /* train body height px */
const WHEEL_R = 9;    /* wheel radius */

export default function SubwayHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  return (
    <header
      className="hidden md:flex flex-shrink-0 z-50"
      style={{ height: 260, background: '#04040c', borderBottom: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden', position: 'relative' }}
    >
      {/* ── Identity panel ── */}
      <div style={{ width: 234, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.50)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px', gap: 0, zIndex: 2 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: 17, fontWeight: 900, fontFamily: 'Georgia,serif', letterSpacing: '0.05em', color: '#F5A623', textShadow: '0 0 16px rgba(245,166,35,0.35)', lineHeight: 1 }}>
            VYSHAK ATHREYA
          </div>
          <div style={{ fontSize: 9, fontWeight: 600, fontFamily: 'Georgia,serif', letterSpacing: '0.2em', color: 'rgba(245,166,35,0.40)', lineHeight: 1.5, marginTop: 5 }}>
            BELLUR KESHAVAMURTHY
          </div>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 13 }}>
          {PERSONAS.map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, flexShrink: 0, boxShadow: `0 0 4px ${p.color}77` }} />
              <span style={{ fontSize: 8.5, fontFamily: 'monospace', color: p.color + '99', letterSpacing: '0.04em' }}>{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tunnel + Train ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

        {/* Tunnel BG */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#00000f 0%,#070718 60%,#050510 100%)' }} />

        {/* Tunnel ceiling pipes / cable conduits */}
        {[8, 14, 19, 24].map(y => (
          <div key={y} style={{ position: 'absolute', top: y, left: 0, right: 0, height: 1.5, background: `rgba(255,255,255,${0.012 + y * 0.001})` }} />
        ))}

        {/* Vertical wall ribs */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${5 + i * 8.5}%`, width: 1, background: 'rgba(255,255,255,0.008)' }} />
        ))}

        {/* Tunnel floor / rail bed */}
        <div style={{ position: 'absolute', bottom: 19, left: 0, right: 0, height: 22, background: 'linear-gradient(to top,#0a0a14,#06060f)' }} />
        {/* Left rail */}
        <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, height: 4, background: '#141420', boxShadow: '0 1px 0 #1a1a2a' }} />
        {/* Right rail */}
        <div style={{ position: 'absolute', bottom: 21, left: 0, right: 0, height: 3, background: '#101018' }} />

        {/* ── Train ── */}
        <div style={{
          position: 'absolute',
          top: '50%',
          transform: `translateY(calc(-50% - 12px))`,
          left: 6, right: 6,
          height: BODY_H,
          display: 'flex', alignItems: 'stretch',
        }}>

          {/* Front cab */}
          <div style={{ width: 50, flexShrink: 0, background: BODY_BG, borderRadius: '18px 0 0 8px', position: 'relative', zIndex: 2 }}>
            {/* Cab window */}
            <div style={{ position: 'absolute', top: 10, left: 10, right: 8, height: 38, background: '#0a1520', border: '2px solid #0d0d18', borderRadius: '6px 0 0 4px' }} />
            {/* Red accent stripe */}
            <div style={{ position: 'absolute', top: 52, left: 0, right: 0, height: 12, background: '#cc1122' }} />
            <div style={{ position: 'absolute', top: 64, left: 0, right: 0, height: 7, background: '#0033aa' }} />
            {/* Headlights */}
            <div style={{ position: 'absolute', bottom: 10, left: 10, width: 10, height: 6, background: '#ffe880', borderRadius: 2, boxShadow: '0 0 10px #ffe88088' }} />
            {/* Cab number board */}
            <div style={{ position: 'absolute', top: 4, left: 10, right: 8, height: 7, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 5.5, color: '#ffdd00', fontFamily: 'monospace', fontWeight: 900, letterSpacing: '0.15em' }}>VAB</span>
            </div>
          </div>

          {/* ── Nav Compartments ── */}
          {nav.map((item, i) => {
            const isActive = (item.href === '/' && pathname === '/')
              || (item.href !== '/' && pathname.startsWith(item.href));
            const badge = MTA[i] || '#808183';

            return (
              <div
                key={item.href}
                onClick={() => navigate(item.href)}
                style={{
                  flex: 1, background: BODY_BG,
                  borderLeft: '2.5px solid #1a1a22',
                  position: 'relative', cursor: 'pointer',
                  transition: 'filter 0.15s',
                }}
                className={isActive ? '' : 'hover:brightness-110'}
              >
                {/* Window glass */}
                <div style={{
                  margin: '7px 6px 0',
                  height: 58,
                  background: isActive ? '#FFF7DC' : '#090918',
                  border: `2px solid ${isActive ? '#e8d080' : '#0a0a18'}`,
                  borderRadius: '2px 2px 0 0',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 4,
                  transition: 'background 0.2s',
                  boxShadow: isActive ? '0 0 20px rgba(255,240,120,0.25) inset' : 'none',
                  overflow: 'hidden', position: 'relative',
                }}>
                  {/* Interior glow (active only) */}
                  {isActive && (
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(255,248,200,0.8) 0%,rgba(255,240,160,0.6) 100%)', pointerEvents: 'none' }} />
                  )}
                  {/* MTA line circle */}
                  <div style={{
                    width: 15, height: 15, borderRadius: '50%',
                    background: badge, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 7.5, color: '#fff', fontWeight: 900, zIndex: 1,
                    boxShadow: isActive ? `0 0 8px ${badge}88` : 'none',
                  }}>
                    {i + 1}
                  </div>
                  {/* Nav label */}
                  <div style={{
                    fontSize: 7.5, fontWeight: 800,
                    color: isActive ? '#1a1200' : '#32324a',
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                    textAlign: 'center', lineHeight: 1.2, zIndex: 1,
                    maxWidth: '90%',
                  }}>
                    {item.label}
                  </div>
                </div>

                {/* Red + blue accent stripes */}
                <div style={{ position: 'absolute', top: 69, left: 0, right: 0, height: 12, background: '#cc1122' }} />
                <div style={{ position: 'absolute', top: 81, left: 0, right: 0, height: 7, background: '#0033aa' }} />

                {/* Active indicator dot on stripe */}
                {isActive && (
                  <div style={{ position: 'absolute', top: 71, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />
                )}

                {/* Door seam — centre vertical */}
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 1.5, height: BODY_H - 14, background: '#0c0c16' }} />
              </div>
            );
          })}

          {/* Rear cap */}
          <div style={{ width: 16, flexShrink: 0, background: BODY_BG, borderRadius: '0 8px 8px 0', borderLeft: '2px solid #1a1a22' }} />
        </div>

        {/* ── Wheels ── */}
        {/* 4 bogie pairs evenly spaced */}
        {[0.12, 0.34, 0.62, 0.84].map((frac, wi) => {
          const left = `${frac * 100}%`;
          const top  = `calc(50% + ${BODY_H / 2 - 12}px)`;
          return (
            <div key={wi} style={{ position: 'absolute', left, top, transform: 'translate(-50%, 0)', display: 'flex', gap: 6, pointerEvents: 'none' }}>
              {[0, 1].map(side => (
                <div key={side} style={{ width: WHEEL_R * 2, height: WHEEL_R * 2, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#555,#111)', border: '2px solid #2a2a32', boxShadow: '0 2px 4px rgba(0,0,0,0.6)' }} />
              ))}
            </div>
          );
        })}

        {/* Station badge — bottom-right corner */}
        <div style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.2em' }}>
          LOCAL · ALL STATIONS
        </div>

      </div>
    </header>
  );
}
