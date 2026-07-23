import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Design tokens ─────────────────────────────────────────────────── */
const DS = {
  bg:         '#010a14',
  bgDeep:     '#020c18',
  text:       '#7fffd4',
  textDim:    'rgba(127,255,212,0.50)',
  gold:       '#F5A623',
};

/* ─── Cluster definitions ─────────────────────────────────────────────── */
type Cluster = 'ml' | 'web' | 'mobile' | 'misc';
const CLUSTERS: { id: Cluster; label: string; sub: string; langs: string[]; color: string; cx: number; cy: number }[] = [
  { id: 'ml',      label: 'ML / Data',       sub: 'Python · Notebooks',
    langs: ['Python', 'Jupyter Notebook', 'R', 'Julia', 'C++'], color: '#00ffa0', cx: 0.3, cy: 0.3 },
  { id: 'mobile',  label: 'Mobile / OS',     sub: 'Systems & App',
    langs: ['Java', 'Kotlin', 'Swift', 'Objective-C', 'Dart', 'Rust', 'C', 'C#'], color: '#ff9d00', cx: 0.7, cy: 0.3 },
  { id: 'web',     label: 'Web / API',       sub: 'Frontend & APIs',
    langs: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Vue', 'Svelte'], color: '#00c8ff', cx: 0.3, cy: 0.7 },
  { id: 'misc',    label: 'DevOps / Misc',   sub: 'Shell & Config',
    langs: [], color: '#cc88ff', cx: 0.7, cy: 0.7 },
];

function classifyCluster(lang: string | null): Cluster {
  if (!lang) return 'misc';
  for (const c of CLUSTERS) if (c.langs.includes(lang)) return c.id;
  return 'misc';
}

/* ─── GitHub API ───────────────────────────────────────────────────── */
interface GHRepo {
  id: number; name: string; description: string | null; html_url: string;
  language: string | null; stargazers_count: number; forks_count: number;
  topics: string[]; pushed_at: string; updated_at: string;
}

interface JellyNode {
  id: number; repo: GHRepo; cluster: Cluster;
  x: number; y: number;
  driftVx: number; driftVy: number;
  size: number;       // bell radius
  tentacles: number;  // 3–7 based on stars
  color: string;
  phase: number;      // pulse phase offset
  wobblePhase: number; // lateral wobble offset
}

/* ─── Plankton particles ─── */
interface Plankton {
  x: number; y: number;
  vy: number; vx: number;
  size: number; alpha: number;
}

function timeAgo(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 3600)    return `${Math.floor(d / 60)}m ago`;
  if (d < 86400)   return `${Math.floor(d / 3600)}h ago`;
  if (d < 2592e3)  return `${Math.floor(d / 86400)}d ago`;
  if (d < 31536e3) return `${Math.floor(d / 2592e3)}mo ago`;
  return `${Math.floor(d / 31536e3)}y ago`;
}

const GITHUB_USER = 'vyshakbellur';
const PLANKTON_COUNT = 45;

/* ══════════════════════════════════════════════════════════════════ */
export default function Projects() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const centerRef  = useRef<HTMLDivElement>(null);
  
  const nodesRef   = useRef<JellyNode[]>([]);
  const planktonRef = useRef<Plankton[]>([]);
  const rafRef     = useRef(0);
  const timeRef    = useRef(0);
  
  const filterRef  = useRef<Cluster | 'all'>('all');
  const hoverRef   = useRef<JellyNode | null>(null);
  const sizeRef    = useRef({ w: 600, h: 500 });

  const [repos,    setRepos]    = useState<GHRepo[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [selected, setSelected] = useState<GHRepo | null>(null);
  const [selColor, setSelColor] = useState(DS.text);
  const [filter,   setFilter]   = useState<Cluster | 'all'>('all');
  const [cvW,      setCvW]      = useState(600);
  const [cvH,      setCvH]      = useState(500);
  const [mobileFilter, setMobileFilter] = useState<Cluster | null>(null);

  useEffect(() => { filterRef.current = filter; }, [filter]);

  /* ── Fetch repos ── */
  useEffect(() => {
    Promise.all([1, 2, 3].map(p =>
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${p}`)
        .then(r => r.ok ? r.json() as Promise<GHRepo[]> : [])
    ))
      .then(pages => {
        const valid = (pages.flat() as GHRepo[]).filter(r => !r.name.includes('.github.io'));
        setRepos(valid);
        if (valid.length > 0) {
          const topRepo = valid.reduce((prev, current) => (prev.stargazers_count > current.stargazers_count) ? prev : current);
          setSelected(topRepo);
          const cId = classifyCluster(topRepo.language);
          setSelColor(CLUSTERS.find(c => c.id === cId)?.color || DS.text);
        }
      })
      .catch(() => setError('GitHub API unreachable'))
      .finally(() => setLoading(false));
  }, []);

  /* ── Build jellyfish graph ── */
  const buildGraph = useCallback((w: number, h: number, rList: GHRepo[]) => {
    if (!rList.length) return;
    const maxS = Math.max(...rList.map(r => r.stargazers_count), 1);
    
    const nodes: JellyNode[] = rList.map(repo => {
      const clsId = classifyCluster(repo.language);
      const cls = CLUSTERS.find(c => c.id === clsId)!;
      
      const spreadX = w * 0.14;
      const spreadY = h * 0.14;
      let u1 = Math.random(), u2 = Math.random();
      if (u1 === 0) u1 = 0.001;
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

      const starRatio = repo.stargazers_count / maxS;

      return {
        id: repo.id, repo, cluster: clsId,
        x: (w * cls.cx) + z0 * spreadX,
        y: (h * cls.cy) + z1 * spreadY,
        driftVx: (Math.random() - 0.5) * 0.15,
        driftVy: -(0.08 + Math.random() * 0.18),  // upward drift
        size: 12 + Math.round(starRatio * 16),
        tentacles: 3 + Math.round(starRatio * 4),  // 3–7 based on stars
        color: cls.color,
        phase: Math.random() * Math.PI * 2,
        wobblePhase: Math.random() * Math.PI * 2,
      };
    });
    
    nodesRef.current = nodes;

    // Build plankton
    const plankton: Plankton[] = [];
    for (let i = 0; i < PLANKTON_COUNT; i++) {
      plankton.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vy: -(0.05 + Math.random() * 0.15),
        vx: (Math.random() - 0.5) * 0.08,
        size: 0.5 + Math.random() * 1.5,
        alpha: 0.08 + Math.random() * 0.15,
      });
    }
    planktonRef.current = plankton;
  }, []);

  /* ── Responsive handling ── */
  useEffect(() => {
    if (!centerRef.current) return;
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width < 200 || height < 200) return;
      const w = Math.floor(width);
      const h = Math.floor(height);
      if (w !== sizeRef.current.w || h !== sizeRef.current.h) {
        sizeRef.current = { w, h };
        setCvW(w);
        setCvH(h);
        buildGraph(w, h, repos);
      }
    });
    obs.observe(centerRef.current);
    return () => obs.disconnect();
  }, [repos, buildGraph]);

  useEffect(() => {
    if (cvW >= 200 && cvH >= 200) buildGraph(cvW, cvH, repos);
  }, [repos, cvW, cvH, buildGraph]);

  /* ── Draw a single jellyfish ── */
  const drawJellyfish = (
    ctx: CanvasRenderingContext2D,
    n: JellyNode,
    t: number,
    isFocus: boolean,
    isDimmed: boolean
  ) => {
    const baseAlpha = isDimmed ? 0.06 : (isFocus ? 1.0 : 0.65);
    const pulse = Math.sin(t * 0.002 + n.phase) * 0.15; // ±15% size oscillation
    const bellR = n.size * (1 + pulse) * (isFocus ? 1.3 : 1);

    ctx.save();
    ctx.globalAlpha = baseAlpha;

    // ── Bioluminescent glow ──
    const glowR = bellR * (isFocus ? 6 : 4);
    const glow = ctx.createRadialGradient(n.x, n.y - bellR * 0.3, 0, n.x, n.y - bellR * 0.3, glowR);
    glow.addColorStop(0, n.color + (isFocus ? '30' : '18'));
    glow.addColorStop(0.5, n.color + '08');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(n.x, n.y - bellR * 0.3, glowR, 0, Math.PI * 2);
    ctx.fill();

    // ── Bell (dome) ──
    ctx.beginPath();
    ctx.ellipse(n.x, n.y, bellR, bellR * 0.7, 0, Math.PI, 0); // top half = dome
    // Bottom curve (oral margin)
    const marginWobble = Math.sin(t * 0.003 + n.phase) * bellR * 0.08;
    ctx.quadraticCurveTo(n.x + bellR + marginWobble, n.y + bellR * 0.25, n.x, n.y + bellR * 0.15);
    ctx.quadraticCurveTo(n.x - bellR - marginWobble, n.y + bellR * 0.25, n.x - bellR, n.y);
    ctx.closePath();

    const bellGrad = ctx.createRadialGradient(n.x, n.y - bellR * 0.4, 0, n.x, n.y, bellR);
    bellGrad.addColorStop(0, n.color + (isFocus ? 'cc' : '88'));
    bellGrad.addColorStop(0.5, n.color + '44');
    bellGrad.addColorStop(1, n.color + '11');
    ctx.fillStyle = bellGrad;
    ctx.fill();

    // Bell rim highlight
    ctx.strokeStyle = n.color + (isFocus ? 'aa' : '55');
    ctx.lineWidth = isFocus ? 1.5 : 0.8;
    ctx.stroke();

    // ── Inner radial lines (gastrovascular canals) ──
    ctx.globalAlpha = baseAlpha * 0.3;
    const canalCount = 4;
    for (let i = 0; i < canalCount; i++) {
      const angle = Math.PI + (Math.PI / (canalCount + 1)) * (i + 1);
      ctx.beginPath();
      ctx.moveTo(n.x, n.y - bellR * 0.1);
      ctx.lineTo(
        n.x + Math.cos(angle) * bellR * 0.85,
        n.y + Math.sin(angle) * bellR * 0.5
      );
      ctx.strokeStyle = n.color + '44';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    ctx.globalAlpha = baseAlpha;

    // ── Tentacles ──
    const tentCount = n.tentacles;
    const tentBaseY = n.y + bellR * 0.12;
    const tentSpread = bellR * 1.6;
    const tentLen = bellR * (2.5 + Math.sin(t * 0.001 + n.phase) * 0.6);

    for (let i = 0; i < tentCount; i++) {
      const frac = tentCount === 1 ? 0.5 : i / (tentCount - 1);
      const tx = n.x - tentSpread / 2 + frac * tentSpread;
      const segments = 6;
      const segLen = tentLen / segments;

      ctx.beginPath();
      ctx.moveTo(tx, tentBaseY);

      let cx = tx, cy = tentBaseY;
      for (let s = 0; s < segments; s++) {
        const sineAmp = bellR * 0.25 * (1 + s * 0.15);
        const sineFreq = 0.004 + i * 0.0005;
        const dx = Math.sin(t * sineFreq + n.wobblePhase + s * 0.8 + i * 1.2) * sineAmp;
        const ny = cy + segLen;
        const cpx = cx + dx;
        const cpy = cy + segLen * 0.5;
        cx = cx + dx * 0.3;
        cy = ny;
        ctx.quadraticCurveTo(cpx, cpy, cx, cy);
      }

      const tentAlpha = isDimmed ? 0.04 : (isFocus ? 0.6 : 0.3);
      ctx.strokeStyle = n.color;
      ctx.globalAlpha = tentAlpha * (1 - 0.3 * (Math.abs(frac - 0.5) * 2)); // center tentacles brighter
      ctx.lineWidth = isFocus ? 1.2 : 0.7;
      ctx.stroke();
    }

    // ── Name label on hover ──
    if (isFocus) {
      ctx.globalAlpha = 1;
      ctx.font = 'bold 10px monospace';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(n.repo.name.slice(0, 24), n.x, n.y - bellR - 10);
    }

    ctx.restore();
  };

  /* ── Main draw loop ── */
  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;
    timeRef.current = ts;
    
    // ── Background: deep ocean gradient ──
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, DS.bg);
    bgGrad.addColorStop(0.4, '#010c16');
    bgGrad.addColorStop(1, DS.bgDeep);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // ── Subtle caustic light at top ──
    const causticAlpha = 0.02 + Math.sin(ts * 0.0008) * 0.01;
    const causticGrad = ctx.createLinearGradient(0, 0, 0, H * 0.15);
    causticGrad.addColorStop(0, `rgba(100,180,255,${causticAlpha})`);
    causticGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = causticGrad;
    ctx.fillRect(0, 0, W, H * 0.15);

    // ── Cluster nebulae (subtle background halos) ──
    const active = filterRef.current;
    if (active === 'all') {
      CLUSTERS.forEach(c => {
        const grad = ctx.createRadialGradient(W * c.cx, H * c.cy, 0, W * c.cx, H * c.cy, Math.min(W, H) * 0.22);
        grad.addColorStop(0, c.color + '0a');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      });
    }

    // ── Update & draw plankton ──
    planktonRef.current.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,220,255,${p.alpha})`;
      ctx.fill();
    });

    const hoverId = hoverRef.current?.id;

    // ── Update jellyfish positions ──
    nodesRef.current.forEach(n => {
      // Upward drift + sine wobble
      const wobble = Math.sin(ts * 0.001 + n.wobblePhase) * 0.12;
      n.x += n.driftVx + wobble;
      n.y += n.driftVy;

      // Screen wrapping
      const margin = n.size * 4;
      if (n.y < -margin) { n.y = H + margin; n.x = Math.random() * W; }
      if (n.y > H + margin) { n.y = -margin; n.x = Math.random() * W; }
      if (n.x < -margin) n.x = W + margin;
      if (n.x > W + margin) n.x = -margin;
    });

    // ── Draw jellyfish (dimmed first, then active, then hovered on top) ──
    const dimmed: JellyNode[] = [];
    const normal: JellyNode[] = [];
    let hovered: JellyNode | null = null;

    nodesRef.current.forEach(n => {
      const isDim = active !== 'all' && n.cluster !== active;
      if (n.id === hoverId) { hovered = n; }
      else if (isDim) { dimmed.push(n); }
      else { normal.push(n); }
    });

    dimmed.forEach(n => drawJellyfish(ctx, n, ts, false, true));
    normal.forEach(n => drawJellyfish(ctx, n, ts, false, false));
    if (hovered) drawJellyfish(ctx, hovered, ts, true, false);

    rafRef.current = requestAnimationFrame(draw);
  }, [drawJellyfish]);

  useEffect(() => {
    if (repos.length) rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [repos, draw]);

  /* ── Mouse interactions ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect  = canvas.getBoundingClientRect();
    const cx    = (e.clientX - rect.left) * (canvas.width  / rect.width);
    const cy    = (e.clientY - rect.top)  * (canvas.height / rect.height);
    
    let hoverHit: JellyNode | null = null, best = Infinity;
    nodesRef.current.forEach(n => {
      if (filterRef.current !== 'all' && n.cluster !== filterRef.current) return;
      const d = Math.hypot(n.x - cx, n.y - cy);
      const hitR = n.size * 3;
      if (d < hitR && d < best) { best = d; hoverHit = n; }
    });
    
    hoverRef.current = hoverHit;
    canvas.style.cursor = hoverHit ? 'pointer' : 'default';
  };

  const handleClick = () => {
    if (hoverRef.current) {
       setSelected(hoverRef.current.repo);
       setSelColor(hoverRef.current.color);
    } 
  };

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <div className="h-full w-full text-white" style={{ background: DS.bg }}>

      {/* ── DESKTOP MODE ── */}
      <div className="hidden lg:flex h-full w-full overflow-hidden">
        {/* LEFT: Filters */}
        <div style={{
          width: 140, flexShrink: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 12px', gap: 10,
          borderRight: '1px solid rgba(100,180,255,0.07)',
        }}>
          <button
            onClick={() => { setFilter('all'); }}
            style={{
              fontSize: 8.5, padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
              border: `1px solid ${filter === 'all' ? DS.text : 'rgba(127,255,212,0.15)'}`,
              color: filter === 'all' ? DS.bg : DS.textDim,
              background: filter === 'all' ? DS.text : 'transparent',
              letterSpacing: '0.15em', textAlign: 'left', transition: 'all .15s',
              fontWeight: 'bold', textTransform: 'uppercase'
            }}
          >
             ALL SPECIES
          </button>

          <div style={{ width: '100%', height: 1, background: 'rgba(100,180,255,0.12)', margin: '4px 0' }} />

          {CLUSTERS.map(({ id, label, color }) => {
            const isAct = filter === id;
            return (
              <button
                key={id}
                onClick={() => { setFilter(f => f === id ? 'all' : id); }}
                style={{
                  fontSize: 8.5, padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
                  border: `1px solid ${isAct ? color : color + '33'}`,
                  color: isAct ? DS.bg : color + 'cc',
                  background: isAct ? color : 'transparent',
                  letterSpacing: '0.12em', textAlign: 'left', transition: 'all .15s',
                  display: 'flex', alignItems: 'center', gap: 7, fontWeight: 'bold'
                }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: isAct ? DS.bg : color,
                  boxShadow: `0 0 6px ${color}`,
                }} />
                {label}
              </button>
            );
          })}
        </div>

        {/* CENTER: Canvas */}
        <div ref={centerRef} className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-[11px] tracking-[0.2em] text-[#7fffd4]/30">
              SCANNING DEPTHS...
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-[11px] text-red-400">
              {error}
            </div>
          )}
          
          {/* Legend overlay */}
          <div className="absolute top-6 left-6 p-4 rounded-lg bg-black/50 shadow-2xl backdrop-blur-md border border-white/10 pointer-events-none z-10 max-w-[260px]">
              <p className="text-[#7fffd4] text-[10px] tracking-[0.2em] font-bold mb-2">DEEP-SEA OBSERVATORY</p>
              <p className="text-white/60 text-[9px] leading-relaxed mb-1">Repositories rendered as bioluminescent jellyfish. Bell size and tentacle count scale with star count. Color encodes language cluster.</p>
              <p className="text-white/40 text-[8px] leading-relaxed italic border-t border-white/10 pt-2 mt-2">Active specimens: {repos.length}</p>
          </div>

          <canvas
            ref={canvasRef}
            width={cvW} height={cvH}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { hoverRef.current = null; if (canvasRef.current) canvasRef.current.style.cursor = 'default'; }}
            onClick={handleClick}
            style={{ width: cvW, height: cvH, display: 'block', touchAction: 'none' }}
          />
        </div>

        {/* RIGHT: Project Detail Panel */}
        <div style={{
          width: 380, flexShrink: 0, borderLeft: `1px solid rgba(100,180,255,0.07)`,
          background: 'rgba(1,10,20,0.6)', backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', position: 'relative',
        }}>
          {!selected ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: DS.textDim, padding: 32, textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, border: `1px dashed ${DS.textDim}`, borderRadius: '50%', marginBottom: 16, opacity: 0.4 }} />
              <p style={{ fontSize: 11, letterSpacing: '0.15em', fontWeight: 'bold' }}>SELECT A SPECIMEN...</p>
            </div>
          ) : (
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: selColor, fontWeight: 'bold', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, background: selColor, borderRadius: '50%', boxShadow: `0 0 8px ${selColor}` }} />
                  SPECIMEN DETAILS
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 12px 0', wordBreak: 'break-all' }}>
                  {selected.name}
                </h2>

                <div style={{ display: 'flex', gap: 12, fontSize: 11, fontFamily: 'monospace', color: DS.textDim, marginBottom: 8 }}>
                   {selected.language && <span>{selected.language}</span>}
                   <span style={{ color: DS.gold }}>★ {selected.stargazers_count}</span>
                   <span>⑂ {selected.forks_count}</span>
                </div>
                <p style={{ fontSize: 10, opacity: 0.5, margin: 0 }}>
                   Updated: {timeAgo(selected.updated_at)}
                </p>
              </div>

              <p style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.7)', flex: 1 }}>
                {selected.description || <span style={{ opacity: 0.3 }}>No abstract available.</span>}
              </p>

              {selected.topics && selected.topics.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                  {selected.topics.map(t => (
                    <span key={t} style={{
                      padding: '3px 8px', borderRadius: 4, fontSize: 9, fontFamily: 'monospace',
                      background: selColor + '22', color: selColor, border: `1px solid ${selColor}44`
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={selected.html_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block', textAlign: 'center', textDecoration: 'none',
                  padding: '12px', background: selColor + '22', border: `1px solid ${selColor}55`,
                  color: selColor, fontSize: 11, fontWeight: 'bold', letterSpacing: '0.1em',
                  textTransform: 'uppercase', borderRadius: 6, transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = selColor + '44'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = selColor + '22'; }}
              >
                View on GitHub ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE MODE: CLUSTER HIERARCHY FALLBACK ── */}
      <div className="lg:hidden flex flex-col h-full overflow-y-auto px-6 py-10 no-scrollbar relative z-30">
        <h1 className="text-3xl font-black mb-3 tracking-widest uppercase">Projects</h1>
        <p className="text-xs text-white/50 mb-10 pb-4 border-b border-white/14 uppercase tracking-widest font-mono">
          Deep-sea observatory is optimized for desktop. Showing cluster hierarchy. Active specimens: {repos.length}
        </p>
        
        {loading && <p className="text-white/50 text-xs">Scanning depths...</p>}

        {!mobileFilter ? (
          <div className="flex flex-col gap-4">
             {CLUSTERS.map(cls => (
               <button 
                 key={cls.id}
                 onClick={() => setMobileFilter(cls.id)}
                 className="flex items-center justify-between p-6 rounded-2xl border border-white/14 bg-white/[0.06] active:bg-white/[0.10] transition-colors"
               >
                 <div className="flex flex-col items-start gap-1">
                   <div className="flex items-center gap-3 mb-1">
                     <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: cls.color, color: cls.color }} />
                     <span className="text-sm font-bold tracking-widest uppercase" style={{ color: cls.color }}>{cls.label}</span>
                   </div>
                   <span className="text-xs text-white/50 font-mono pl-5">{cls.sub}</span>
                 </div>
                 <div className="text-white/30">❯</div>
               </button>
             ))}
          </div>
        ) : (
          <div className="flex flex-col pb-20">
             <button 
               onClick={() => setMobileFilter(null)}
               className="mb-8 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/60 hover:text-white"
             >
               <span className="text-lg">❮</span> Back to Clusters
             </button>

             <div className="flex flex-col gap-5">
               {repos.filter(r => classifyCluster(r.language) === mobileFilter).map(r => {
                 const cls = CLUSTERS.find(c => c.id === mobileFilter)!;
                 return (
                   <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="block border border-white/14 bg-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.10] hover:border-white/20 transition duration-300">
                     <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: cls.color, color: cls.color }} />
                         <span className="text-[10px] uppercase font-bold tracking-[0.2em]" style={{ color: cls.color }}>{cls.label}</span>
                       </div>
                       <div className="text-[10px] bg-slate-900 rounded border border-white/14 px-2 py-0.5 text-white/55">{timeAgo(r.updated_at)}</div>
                     </div>
                     <h2 className="text-white font-black text-xl mb-3 tracking-tight">{r.name}</h2>
                     <p className="text-white/65 text-sm leading-relaxed mb-6">{r.description || 'No abstract provided.'}</p>
                     <div className="flex flex-wrap gap-4 items-center">
                        {r.language && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-white/55">
                            <code className="bg-white/[0.06] px-2 py-0.5 border border-white/8 rounded">{r.language}</code>
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-xs font-mono">
                           <span className="text-amber-400">★ {r.stargazers_count}</span>
                           <span className="text-white/45">⑂ {r.forks_count}</span>
                        </div>
                     </div>
                   </a>
                 )
               })}
             </div>
          </div>
        )}
      </div>

    </div>
  );
}
