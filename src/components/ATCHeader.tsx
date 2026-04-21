import { useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { nav } from '../data/nav';

/* ── Personas ──────────────────────────────────────────────────────── */
const PERSONAS = [
  { label: 'Cross-domain ML Researcher', color: '#00ffa0' },
  { label: 'PhD Candidate',              color: '#7fffd4' },
  { label: 'Musician',                   color: '#00c8ff' },
  { label: 'Adventure Traveller',        color: '#80ffcc' },
  { label: 'Runner',                     color: '#aaff80' },
];

/* ── Top-down aircraft SVG (nose at TOP = -y) ───────────────────────
   viewBox: -18 -40 36 80  (36w × 80h, origin at visual center)
   Nose tip at y = -40, tail at y = +40
──────────────────────────────────────────────────────────────────── */
function PlaneTop({ w, h, color, glow }: { w: number; h: number; color: string; glow: boolean }) {
  return (
    <svg
      width={w} height={h}
      viewBox="-18 -40 36 80"
      style={{
        display: 'block',
        filter: glow
          ? `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 16px ${color}66)`
          : 'none',
        transition: 'filter 0.3s',
      }}
    >
      {/* Fuselage */}
      <ellipse cx="0" cy="0" rx="4"  ry="28" fill={color} />
      {/* Nose cone */}
      <polygon points="0,-40 -4,-26 4,-26" fill={color} />
      {/* Swept wings (middle of body) */}
      <polygon points="-4,-8 -25,8 -23,14 -4,4"  fill={color} opacity="0.90" />
      <polygon points=" 4,-8  25,8  23,14  4,4"  fill={color} opacity="0.90" />
      {/* Engine pods on wings */}
      <ellipse cx="-16" cy=" 4" rx="3" ry="6" fill={color} opacity="0.85" />
      <ellipse cx=" 16" cy=" 4" rx="3" ry="6" fill={color} opacity="0.85" />
      {/* Tail fins */}
      <polygon points="-4,22 -13,32 -11,28 -4,24" fill={color} opacity="0.80" />
      <polygon points=" 4,22  13,32  11,28  4,24" fill={color} opacity="0.80" />
      {/* Horizontal stabilizer */}
      <ellipse cx="0" cy="30" rx="9" ry="2.5" fill={color} opacity="0.70" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function ATCHeader() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const hangarRef  = useRef<HTMLDivElement>(null);
  const rafRef     = useRef(0);
  const scanRef    = useRef(0);
  const lastTsRef  = useRef(0);
  const location   = useLocation();
  const navigate   = useNavigate();
  const pathname   = location.pathname;

  /* ── Canvas: tarmac floor + vertical scanline ── */
  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    if (!W || !H) { rafRef.current = requestAnimationFrame(draw); return; }

    const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
    lastTsRef.current = ts;
    /* Scanline sweeps full width in ~4 s */
    scanRef.current = (scanRef.current + (W / 4) * dt) % (W + 80);
    const scan = scanRef.current;

    /* ── BG: hangar concrete ── */
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#060a0e';
    ctx.fillRect(0, 0, W, H);

    /* ── Floor markings: horizontal yellow centerlines ── */
    ctx.setLineDash([12, 8]);
    ctx.strokeStyle = 'rgba(255,200,60,0.06)';
    ctx.lineWidth = 1;
    [H * 0.38, H * 0.50, H * 0.62].forEach(y => {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    });
    ctx.setLineDash([]);

    /* ── Overhead rail lines (top) ── */
    ctx.strokeStyle = 'rgba(100,160,255,0.05)';
    ctx.lineWidth = 0.5;
    [H * 0.07, H * 0.13].forEach(y => {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    });

    /* ── Vertical scanline (radar sweep moving across hangar) ── */
    for (let i = 0; i < 36; i++) {
      const x = scan - i * 5;
      if (x < 0 || x > W) continue;
      const a = 0.28 * (1 - i / 36);
      const g = ctx.createLinearGradient(x, 0, x, H);
      g.addColorStop(0,    `rgba(0,255,120,0)`);
      g.addColorStop(0.25, `rgba(0,255,120,${a})`);
      g.addColorStop(0.75, `rgba(0,255,120,${a * 0.7})`);
      g.addColorStop(1,    `rgba(0,255,120,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x, 0, 3.5, H);
    }
    /* Leading edge */
    const le = ctx.createLinearGradient(scan, 0, scan, H);
    le.addColorStop(0,   'rgba(0,255,120,0)');
    le.addColorStop(0.3, 'rgba(0,255,120,0.70)');
    le.addColorStop(0.7, 'rgba(0,255,120,0.70)');
    le.addColorStop(1,   'rgba(0,255,120,0)');
    ctx.fillStyle = le;
    ctx.fillRect(scan, 0, 1.5, H);

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  /* Sync canvas size to parent */
  useEffect(() => {
    const canvas = canvasRef.current;
    const div    = hangarRef.current;
    if (!canvas || !div) return;

    const sync = () => {
      canvas.width  = div.offsetWidth;
      canvas.height = div.offsetHeight;
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(div);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  /* Plane size: scale to header height with some padding */
  const HEADER_H  = 260;
  const PLANE_H   = 152;   /* visible plane SVG height */
  const PLANE_W   = Math.round(PLANE_H * (36 / 80));  /* maintain SVG aspect ratio ≈ 69 */

  return (
    <header
      className="hidden md:flex flex-shrink-0 z-50"
      style={{ height: HEADER_H, background: '#060a0e', borderBottom: '1px solid rgba(0,255,120,0.12)', boxShadow: '0 4px 28px rgba(0,0,0,0.9)' }}
    >

      {/* ── Identity panel ── */}
      <div style={{
        width: 236, flexShrink: 0,
        borderRight: '1px solid rgba(0,255,120,0.08)',
        background: 'rgba(0,14,8,0.70)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 20px', gap: 0,
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: 17, fontWeight: 900, fontFamily: 'Georgia,serif', letterSpacing: '0.05em', color: '#00ffa0', textShadow: '0 0 16px rgba(0,255,120,0.32)', lineHeight: 1 }}>
            VYSHAK ATHREYA
          </div>
          <div style={{ fontSize: 9, fontWeight: 600, fontFamily: 'Georgia,serif', letterSpacing: '0.2em', color: 'rgba(0,255,120,0.38)', lineHeight: 1.5, marginTop: 5 }}>
            BELLUR KESHAVAMURTHY
          </div>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 12 }}>
          {PERSONAS.map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, flexShrink: 0, boxShadow: `0 0 5px ${p.color}77` }} />
              <span style={{ fontSize: 8.5, fontFamily: 'monospace', color: p.color + 'aa', letterSpacing: '0.04em' }}>{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hangar bay: planes in a row ── */}
      <div
        ref={hangarRef}
        style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
      >
        {/* Canvas tarmac backdrop */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

        {/* ATC badge */}
        <div style={{ position: 'absolute', top: 9, right: 14, fontFamily: 'monospace', fontSize: 7.5, color: 'rgba(0,255,120,0.28)', letterSpacing: '0.22em', zIndex: 5, pointerEvents: 'none' }}>
          HANGR 7 · {new Date().toUTCString().slice(17, 22)} Z
        </div>

        {/*
         * 8 planes in a horizontal flex row.
         * Each plane slot is 1fr wide; plane+label is centered inside.
         * Nose points UP (toward the hangar door / "runway side").
         */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          height: '100%', padding: '0 12px',
        }}>
          {nav.map((item) => {
            const isActive = (item.href === '/' && pathname === '/')
              || (item.href !== '/' && pathname.startsWith(item.href));

            const planeColor = isActive ? '#00ffa0' : 'rgba(0,255,120,0.28)';

            return (
              <div
                key={item.href}
                onClick={() => navigate(item.href)}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 6,
                  cursor: 'pointer',
                  /* Parking bay highlight when active */
                  background: isActive
                    ? 'linear-gradient(to bottom, rgba(0,255,120,0.05) 0%, rgba(0,255,120,0.10) 50%, rgba(0,255,120,0.04) 100%)'
                    : 'transparent',
                  borderLeft:  isActive ? '1px solid rgba(0,255,120,0.18)' : '1px solid transparent',
                  borderRight: isActive ? '1px solid rgba(0,255,120,0.18)' : '1px solid transparent',
                  padding: '10px 8px 8px',
                  height: '100%',
                  justifyContent: 'center',
                  minWidth: 64,
                  transition: 'background 0.25s',
                  position: 'relative',
                }}
              >
                {/* Active beacon: small blinking light above plane */}
                {isActive && (
                  <div style={{
                    position: 'absolute', top: 8, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 5, height: 5, borderRadius: '50%',
                    background: '#ff4444',
                    boxShadow: '0 0 8px #ff4444, 0 0 16px #ff444466',
                    animation: 'beacon 1.2s ease-in-out infinite',
                  }} />
                )}

                {/* Plane SVG */}
                <PlaneTop
                  w={PLANE_W}
                  h={PLANE_H}
                  color={planeColor}
                  glow={isActive}
                />

                {/* Nav label (at tail / below plane) */}
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  fontWeight: isActive ? 900 : 400,
                  color: isActive ? '#00ffa0' : 'rgba(0,255,120,0.32)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Inline style for beacon animation */}
        <style>{`
          @keyframes beacon {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.1; }
          }
        `}</style>
      </div>
    </header>
  );
}
