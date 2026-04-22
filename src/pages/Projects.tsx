import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Design tokens ─────────────────────────────────────────────────── */
const DS = {
  bg:         '#020c08',
  grid:       'rgba(0,255,120,0.07)',
  gridBright: 'rgba(0,255,120,0.20)',
  sweep:      'rgba(0,255,120,0.60)',
  text:       '#7fffd4',
  textDim:    'rgba(127,255,212,0.35)',
  card:       'rgba(3,20,14,0.0)',   // transparent — uses sidebar bg
  gold:       '#F5A623',
};

/* ─── Ring definitions ─────────────────────────────────────────────── */
type Ring = 'outer' | 'middle' | 'inner' | 'misc';
const RINGS: { id: Ring; label: string; sub: string; langs: string[]; color: string; frac: number }[] = [
  { id: 'outer',  label: 'Python / ML',     sub: 'Data Science · Research',
    langs: ['Python', 'Jupyter Notebook', 'R', 'Julia', 'Rust'], color: '#00ffa0', frac: 0.84 },
  { id: 'middle', label: 'Web / JS',         sub: 'Frontend · APIs',
    langs: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Vue', 'Svelte'], color: '#00c8ff', frac: 0.59 },
  { id: 'inner',  label: 'Android / Java',  sub: 'Mobile · Systems',
    langs: ['Java', 'Kotlin', 'Swift', 'Objective-C', 'Dart', 'C', 'C++', 'C#'], color: '#ff9d00', frac: 0.34 },
  { id: 'misc',   label: 'Other',            sub: 'Shell · Config · More',
    langs: [], color: '#cc88ff', frac: 0.71 },
];

function classifyRing(lang: string | null): Ring {
  if (!lang) return 'misc';
  for (const r of RINGS) if (r.langs.includes(lang)) return r.id;
  return 'misc';
}

/* ─── GitHub API ───────────────────────────────────────────────────── */
interface GHRepo {
  id: number; name: string; description: string | null; html_url: string;
  language: string | null; stargazers_count: number; forks_count: number;
  topics: string[]; pushed_at: string; updated_at: string;
}

interface Blip {
  id: number; repo: GHRepo; ring: Ring;
  angle: number; r: number; size: number; x: number; y: number;
  color: string; lit: boolean;
}

/* ─── Helpers ──────────────────────────────────────────────────────── */
const GITHUB_USER = 'vyshakbellur';
const RPM = 8;
const RAD_S = RPM * 2 * Math.PI / 60;
const WEDGE = Math.PI / 6;

function stableAngle(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return ((h >>> 0) / 0xffffffff) * 2 * Math.PI;
}

function timeAgo(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 3600)    return `${Math.floor(d / 60)}m ago`;
  if (d < 86400)   return `${Math.floor(d / 3600)}h ago`;
  if (d < 2592e3)  return `${Math.floor(d / 86400)}d ago`;
  if (d < 31536e3) return `${Math.floor(d / 2592e3)}mo ago`;
  return `${Math.floor(d / 31536e3)}y ago`;
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Projects() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const centerRef  = useRef<HTMLDivElement>(null);
  const blipsRef   = useRef<Blip[]>([]);
  const sweepRef   = useRef(0);
  const rafRef     = useRef(0);
  const lastTsRef  = useRef(0);
  const filterRef  = useRef<Ring | 'all'>('all');
  const sizeRef    = useRef(400);

  const [repos,    setRepos]    = useState<GHRepo[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [selected, setSelected] = useState<GHRepo | null>(null);
  const [selColor, setSelColor] = useState(DS.text);
  const [filter,   setFilter]   = useState<Ring | 'all'>('all');
  const [cvSize,   setCvSize]   = useState(400);

  useEffect(() => { filterRef.current = filter; }, [filter]);

  /* ── Fetch repos ── */
  useEffect(() => {
    Promise.all([1, 2, 3].map(p =>
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${p}`)
        .then(r => r.ok ? r.json() as Promise<GHRepo[]> : [])
    ))
      .then(pages => setRepos((pages.flat() as GHRepo[]).filter(r => !r.name.includes('.github.io'))))
      .catch(() => setError('GitHub API unreachable'))
      .finally(() => setLoading(false));
  }, []);

  /* ── Build blips when repos or canvas size changes ── */
  const buildBlips = useCallback((size: number, rList: GHRepo[]) => {
    if (!rList.length) return;
    const R = size / 2;
    const maxS = Math.max(...rList.map(r => r.stargazers_count), 1);
    blipsRef.current = rList.map(repo => {
      const ring = classifyRing(repo.language);
      const def  = RINGS.find(x => x.id === ring)!;
      const angle = stableAngle(repo.name);
      const r    = def.frac * (R - 24);
      const size2 = 5 + Math.round((repo.stargazers_count / maxS) * 11);
      return { id: repo.id, repo, ring, angle, r, size: size2,
               x: R + r * Math.cos(angle), y: R + r * Math.sin(angle),
               color: def.color, lit: false };
    });
  }, []);

  /* ── Responsive: observe center div ── */
  useEffect(() => {
    if (!centerRef.current) return;
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      const s = Math.floor(Math.min(width, height) - 24);
      if (s !== sizeRef.current) {
        sizeRef.current = s;
        setCvSize(s);
        buildBlips(s, repos);
      }
    });
    obs.observe(centerRef.current);
    return () => obs.disconnect();
  }, [repos, buildBlips]);

  useEffect(() => {
    buildBlips(cvSize, repos);
  }, [repos, cvSize, buildBlips]);

  /* ── Draw loop (canvas) ── */
  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const S = canvas.width;
    const R = S / 2;
    const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
    lastTsRef.current = ts;
    sweepRef.current = (sweepRef.current + RAD_S * dt) % (2 * Math.PI);
    const sweep  = sweepRef.current;
    const active = filterRef.current;

    /* bg */
    ctx.clearRect(0, 0, S, S);
    ctx.fillStyle = DS.bg;
    ctx.fillRect(0, 0, S, S);

    /* grid rings */
    RINGS.forEach(({ frac, color, id }) => {
      ctx.beginPath();
      ctx.arc(R, R, frac * (R - 10), 0, 2 * Math.PI);
      ctx.strokeStyle = (active === 'all' || active === id) ? color + '38' : DS.grid;
      ctx.lineWidth = (active === id) ? 1.4 : 0.7;
      ctx.stroke();
    });
    ctx.beginPath();
    ctx.arc(R, R, R - 10, 0, 2 * Math.PI);
    ctx.strokeStyle = DS.gridBright;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* crosshairs */
    ctx.strokeStyle = DS.grid;
    ctx.lineWidth = 0.6;
    [[R, 8, R, S - 8], [8, R, S - 8, R]].forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    });

    /* sweep wedge */
    for (let i = 0; i < 30; i++) {
      const a0 = sweep - (i / 30) * WEDGE;
      const a1 = sweep - ((i + 1) / 30) * WEDGE;
      ctx.beginPath();
      ctx.moveTo(R, R);
      ctx.arc(R, R, R - 12, a0, a1, true);
      ctx.closePath();
      ctx.fillStyle = `rgba(0,255,120,${0.40 * (1 - i / 30)})`;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(R, R);
    ctx.lineTo(R + (R - 12) * Math.cos(sweep), R + (R - 12) * Math.sin(sweep));
    ctx.strokeStyle = DS.sweep;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    /* blips */
    const TWO_PI = 2 * Math.PI;
    blipsRef.current.forEach(b => {
      const dimmed = active !== 'all' && b.ring !== active;
      let diff = (sweep - b.angle + TWO_PI) % TWO_PI;
      if (diff > Math.PI) diff = TWO_PI - diff;
      b.lit = diff < WEDGE * 1.2;

      ctx.globalAlpha = dimmed ? 0.08 : b.lit ? 1.0 : 0.40;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.size, 0, TWO_PI);
      ctx.fillStyle = b.color; ctx.fill();

      if (b.lit && !dimmed) {
        ctx.beginPath(); ctx.arc(b.x, b.y, b.size + 5, 0, TWO_PI);
        ctx.strokeStyle = b.color + 'aa'; ctx.lineWidth = 1.4; ctx.stroke();
        ctx.globalAlpha = 0.70;
        ctx.font = `bold 8px "JetBrains Mono", monospace`;
        ctx.fillStyle = b.color;
        ctx.fillText(b.repo.name.slice(0, 15), b.x + b.size + 5, b.y + 3.5);
      }
      ctx.globalAlpha = 1;
    });

    /* ring labels */
    RINGS.forEach(({ frac, label, color, id }) => {
      if (active !== 'all' && active !== id) return;
      ctx.globalAlpha = 0.50;
      ctx.font = 'bold 8px Georgia, serif';
      ctx.fillStyle = color;
      ctx.fillText(label, R + frac * (R - 24) + 4, R - 5);
      ctx.globalAlpha = 1;
    });

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (repos.length) rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [repos, draw]);

  /* ── Click ── */
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect  = canvas.getBoundingClientRect();
    const cx    = (e.clientX - rect.left) * (canvas.width  / rect.width);
    const cy    = (e.clientY - rect.top)  * (canvas.height / rect.height);
    let hit: Blip | null = null, best = Infinity;
    blipsRef.current.forEach(b => {
      if (filterRef.current !== 'all' && b.ring !== filterRef.current) return;
      const d = Math.hypot(b.x - cx, b.y - cy);
      if (d < b.size + 14 && d < best) { best = d; hit = b; }
    });
    if (hit) { setSelected((hit as Blip).repo); setSelColor((hit as Blip).color); }
    else setSelected(null);
  };

  /* ─────────────────────────────────────────────────────────────── */
  return (
    /*
     * Takes full body height, no internal overflow.
     * 3 columns: [left filter] [center radar] [right card]
     */
    <div style={{ display: 'flex', height: '100%', background: DS.bg, overflow: 'hidden' }}>

      {/* ── LEFT: Vertical filter sidebar ── */}
      <div style={{
        width: 120, flexShrink: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 12px', gap: 10,
        borderRight: '1px solid rgba(0,255,120,0.07)',
      }}>
        {/* ALL */}
        <button
          onClick={() => { setFilter('all'); setSelected(null); }}
          style={{
            fontSize: 8.5, padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
            border: `1px solid ${filter === 'all' ? DS.text : 'rgba(127,255,212,0.15)'}`,
            color: filter === 'all' ? DS.bg : DS.textDim,
            background: filter === 'all' ? DS.text : 'transparent',
            letterSpacing: '0.18em', textAlign: 'left', transition: 'all .15s',
          }}
        >
          ◈ ALL
        </button>

        <div style={{ width: '100%', height: 1, background: 'rgba(0,255,120,0.06)' }} />

        {RINGS.map(({ id, label, color }) => {
          const isAct = filter === id;
          return (
            <button
              key={id}
              onClick={() => { setFilter(f => f === id ? 'all' : id); setSelected(null); }}
              style={{
                fontSize: 8.5, padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
                border: `1px solid ${isAct ? color : color + '33'}`,
                color: isAct ? DS.bg : color + 'cc',
                background: isAct ? color : 'transparent',
                letterSpacing: '0.12em', textAlign: 'left', transition: 'all .15s',
                display: 'flex', alignItems: 'center', gap: 7,
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                background: isAct ? DS.bg : color,
                boxShadow: isAct ? 'none' : `0 0 6px ${color}`,
              }} />
              <span style={{ lineHeight: 1.3 }}>{label.toUpperCase()}</span>
            </button>
          );
        })}

        <div style={{ width: '100%', height: 1, background: 'rgba(0,255,120,0.06)' }} />

        {/* Blip-size hint */}
        <div style={{ fontSize: 8, color: DS.textDim, letterSpacing: '0.12em', lineHeight: 1.6, padding: '0 2px' }}>
          Ø = ★ count<br />
          {!loading && repos.length > 0 && `${repos.length} repos`}
        </div>

        {loading && (
          <div style={{ fontSize: 8, color: DS.text, opacity: 0.5, letterSpacing: '0.1em' }}>
            Scanning…
          </div>
        )}
        {error && (
          <div style={{ fontSize: 8, color: '#ff6060', letterSpacing: '0.1em' }}>{error}</div>
        )}
      </div>

      {/* ── CENTER: Radar canvas fills available width ── */}
      <div
        ref={centerRef}
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 12 }}
      >
        {!loading && cvSize > 100 && (
          <div style={{ position: 'relative', width: cvSize, height: cvSize, flexShrink: 0 }}>
            <canvas
              ref={canvasRef}
              width={cvSize}
              height={cvSize}
              onClick={handleClick}
              style={{
                display: 'block', borderRadius: '50%', cursor: 'crosshair',
                boxShadow: [
                  '0 0 0 1px rgba(0,255,120,0.16)',
                  '0 0 50px rgba(0,255,120,0.09)',
                ].join(','),
              }}
            />
            {/* Center pip */}
            <div style={{
              position: 'absolute',
              top: cvSize / 2 - 4, left: cvSize / 2 - 4,
              width: 8, height: 8, borderRadius: '50%',
              background: DS.text, boxShadow: `0 0 14px ${DS.text}`,
              pointerEvents: 'none',
            }} />
          </div>
        )}
      </div>

      {/* ── RIGHT: Repo detail panel ── */}
      <div style={{
        width: 280, flexShrink: 0,
        borderLeft: '1px solid rgba(0,255,120,0.07)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 20px', gap: 0,
      }}>
        {!selected ? (
          /* Empty state hint */
          <div style={{ textAlign: 'center', padding: '0 8px' }}>
            <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.15 }}>◎</div>
            <div style={{ fontSize: 9, color: DS.textDim, letterSpacing: '0.2em', lineHeight: 2 }}>
              CLICK A BLIP<br />TO REVEAL ITS ORBIT
            </div>
          </div>
        ) : (
          /* Repo card */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Language + timestamp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {selected.language && (
                <span style={{
                  fontSize: 8, padding: '2px 10px', borderRadius: 99,
                  border: `1px solid ${selColor}55`,
                  color: selColor, letterSpacing: '0.15em',
                  background: `${selColor}12`,
                }}>
                  {selected.language.toUpperCase()}
                </span>
              )}
              <span style={{ fontSize: 8, color: DS.textDim, letterSpacing: '0.12em' }}>
                pushed {timeAgo(selected.pushed_at || selected.updated_at)}
              </span>
            </div>

            {/* Repo name */}
            <div style={{
              fontSize: 15, fontWeight: 900, color: selColor,
              letterSpacing: '0.03em', lineHeight: 1.2,
              fontFamily: 'monospace',
            }}>
              {selected.name}
            </div>

            {/* Description */}
            {selected.description && (
              <div style={{ fontSize: 11.5, color: DS.text, lineHeight: 1.7, opacity: 0.78 }}>
                {selected.description}
              </div>
            )}

            {/* Stats */}
            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: DS.textDim, fontFamily: 'monospace' }}>
              <span>★ {selected.stargazers_count}</span>
              <span>⑂ {selected.forks_count}</span>
            </div>

            {/* Topics */}
            {selected.topics?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {selected.topics.map(t => (
                  <span key={t} style={{
                    fontSize: 8, padding: '2px 8px', borderRadius: 99,
                    border: `1px solid ${selColor}30`,
                    color: selColor + 'aa', letterSpacing: '0.08em',
                  }}>{t}</span>
                ))}
              </div>
            )}

            <div style={{ width: '100%', height: 1, background: 'rgba(0,255,120,0.08)', margin: '4px 0' }} />

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href={selected.html_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 9, color: DS.gold,
                  border: `1px solid ${DS.gold}55`,
                  padding: '5px 14px', borderRadius: 6,
                  letterSpacing: '0.18em', textDecoration: 'none',
                  transition: 'background .15s',
                }}
                className="hover:bg-amber-400/10"
              >
                OPEN ON GITHUB →
              </a>
              <button
                onClick={() => setSelected(null)}
                style={{
                  fontSize: 9, color: DS.textDim,
                  border: '1px solid rgba(127,255,212,0.12)',
                  padding: '5px 12px', borderRadius: 6,
                  background: 'none', cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
