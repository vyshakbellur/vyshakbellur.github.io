import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Design tokens ─────────────────────────────────────────────────── */
const DS = {
  bg:         '#020c08',
  mesh:       'rgba(0,255,120,0.12)',
  meshFocus:  'rgba(255,255,255,0.4)',
  text:       '#7fffd4',
  textDim:    'rgba(127,255,212,0.35)',
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

interface Node {
  id: number; repo: GHRepo; cluster: Cluster;
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  color: string;
}

interface Edge {
  source: number; target: number; weight: number;
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

/* ══════════════════════════════════════════════════════════════════ */
export default function Projects() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const centerRef  = useRef<HTMLDivElement>(null);
  
  const nodesRef   = useRef<Node[]>([]);
  const edgesRef   = useRef<Edge[]>([]);
  const rafRef     = useRef(0);
  const lastTsRef  = useRef(0);
  
  const filterRef  = useRef<Cluster | 'all'>('all');
  const hoverRef   = useRef<Node | null>(null);
  const sizeRef    = useRef(400);

  const [repos,    setRepos]    = useState<GHRepo[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [selected, setSelected] = useState<GHRepo | null>(null);
  const [selColor, setSelColor] = useState(DS.text);
  const [filter,   setFilter]   = useState<Cluster | 'all'>('all');
  const [cvSize,   setCvSize]   = useState(400);

  useEffect(() => { filterRef.current = filter; }, [filter]);

  /* ── Fetch repos & Pre-Select Hero Project ── */
  useEffect(() => {
    Promise.all([1, 2, 3].map(p =>
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${p}`)
        .then(r => r.ok ? r.json() as Promise<GHRepo[]> : [])
    ))
      .then(pages => {
        const valid = (pages.flat() as GHRepo[]).filter(r => !r.name.includes('.github.io'));
        setRepos(valid);
        
        // Auto-select the repository with the most stars
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

  /* ── Build Bayesian Topology Graph ── */
  const buildGraph = useCallback((size: number, rList: GHRepo[]) => {
    if (!rList.length) return;
    const maxS = Math.max(...rList.map(r => r.stargazers_count), 1);
    
    // Create Nodes with Gaussian clustering
    const nodes: Node[] = rList.map(repo => {
      const clsId = classifyCluster(repo.language);
      const cls = CLUSTERS.find(c => c.id === clsId)!;
      
      const spread = size * 0.14; 
      let u1 = Math.random(), u2 = Math.random();
      let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      let z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

      return {
        id: repo.id, repo, cluster: clsId,
        x: (size * cls.cx) + z0 * spread,
        y: (size * cls.cy) + z1 * spread,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: 3 + Math.round((repo.stargazers_count / maxS) * 6),
        color: cls.color
      };
    });
    
    nodesRef.current = nodes;
    
    // Create Edges (Neural mapping)
    const edges: Edge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        let weight = 0;
        const n1 = nodes[i], n2 = nodes[j];
        
        if (n1.repo.language && n1.repo.language === n2.repo.language) weight += 0.6;
        
        const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
        if (dist < size * 0.20 && n1.cluster === n2.cluster) weight += 0.4;
        
        if (weight > 0) edges.push({ source: n1.id, target: n2.id, weight });
      }
    }
    edgesRef.current = edges;
  }, []);

  /* ── Responsive handling ── */
  useEffect(() => {
    if (!centerRef.current) return;
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      // Only rebuild if it's large enough to actually run the canvas mapping (prevent crashes)
      if (width < 200 || height < 200) return;
      const s = Math.floor(Math.min(width, height));
      if (s !== sizeRef.current) {
        sizeRef.current = s;
        setCvSize(s);
        buildGraph(s, repos);
      }
    });
    obs.observe(centerRef.current);
    return () => obs.disconnect();
  }, [repos, buildGraph]);

  useEffect(() => {
    if (cvSize >= 200) buildGraph(cvSize, repos);
  }, [repos, cvSize, buildGraph]);

  /* ── Draw loop ── */
  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const S = canvas.width;
    const dt = lastTsRef.current ? (ts - lastTsRef.current) / 16 : 1; 
    lastTsRef.current = ts;
    
    ctx.clearRect(0, 0, S, S);
    ctx.fillStyle = DS.bg;
    ctx.fillRect(0, 0, S, S);
    
    const active = filterRef.current;
    const hoverId = hoverRef.current?.id;

    if (active === 'all') {
      CLUSTERS.forEach(c => {
        const grad = ctx.createRadialGradient(S * c.cx, S * c.cy, 0, S * c.cx, S * c.cy, S * 0.25);
        grad.addColorStop(0, c.color + '15');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, S, S);
      });
    }

    nodesRef.current.forEach(n => {
       n.x += n.vx * dt;
       n.y += n.vy * dt;
       if (n.x < 0 || n.x > S) n.vx *= -1;
       if (n.y < 0 || n.y > S) n.vy *= -1;
    });

    ctx.lineWidth = 0.5;
    edgesRef.current.forEach(e => {
       const n1 = nodesRef.current.find(n => n.id === e.source)!;
       const n2 = nodesRef.current.find(n => n.id === e.target)!;
       const isDimmed = active !== 'all' && (n1.cluster !== active || n2.cluster !== active);
       if (isDimmed) return;
       
       const isFocus = hoverId === n1.id || hoverId === n2.id;
       ctx.strokeStyle = isFocus ? DS.meshFocus : `rgba(0, 255, 160, ${e.weight * 0.15})`;
       if (isFocus) ctx.lineWidth = 1.2; else ctx.lineWidth = 0.5;
       
       ctx.beginPath();
       ctx.moveTo(n1.x, n1.y);
       ctx.lineTo(n2.x, n2.y);
       ctx.stroke();
    });

    nodesRef.current.forEach(n => {
       const isDimmed = active !== 'all' && n.cluster !== active;
       const isFocus = hoverId === n.id;
       
       ctx.globalAlpha = isDimmed ? 0.08 : (isFocus ? 1.0 : 0.6);
       
       ctx.beginPath();
       ctx.arc(n.x, n.y, isFocus ? n.size * 1.5 : n.size, 0, 2 * Math.PI);
       ctx.fillStyle = isFocus ? '#fff' : n.color;
       ctx.fill();
       
       if (!isDimmed) {
         ctx.beginPath();
         ctx.arc(n.x, n.y, isFocus ? n.size * 3.5 : n.size * 2, 0, 2 * Math.PI);
         ctx.strokeStyle = n.color;
         ctx.globalAlpha = isFocus ? 0.8 : 0.2;
         ctx.stroke();
       }
       
       if (isFocus) {
         ctx.globalAlpha = 1.0;
         ctx.font = 'bold 9px monospace';
         ctx.fillStyle = '#fff';
         ctx.fillText(n.repo.name.slice(0, 20), n.x + n.size * 2 + 5, n.y + 3);
       }
       ctx.globalAlpha = 1;
    });

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (repos.length) rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [repos, draw]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect  = canvas.getBoundingClientRect();
    const cx    = (e.clientX - rect.left) * (canvas.width  / rect.width);
    const cy    = (e.clientY - rect.top)  * (canvas.height / rect.height);
    
    let hoverHit: Node | null = null, best = Infinity;
    nodesRef.current.forEach(n => {
      if (filterRef.current !== 'all' && n.cluster !== filterRef.current) return;
      const d = Math.hypot(n.x - cx, n.y - cy);
      if (d < n.size * 3 + 6 && d < best) { best = d; hoverHit = n; }
    });
    
    hoverRef.current = hoverHit;
    canvas.style.cursor = hoverHit ? 'pointer' : 'crosshair';
  };

  const handleClick = () => {
    if (hoverRef.current) {
       setSelected(hoverRef.current.repo);
       setSelColor(hoverRef.current.color);
    } 
  };

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <div className="h-full w-full bg-[#020c08] text-white">

      {/* ── DESKTOP MODE: FULL CANVAS TOPOLOGY ── */}
      <div className="hidden lg:flex h-full w-full overflow-hidden">
        {/* LEFT: Filters */}
        <div style={{
          width: 140, flexShrink: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 12px', gap: 10,
          borderRight: '1px solid rgba(0,255,120,0.07)',
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
             GLOBAL MAP
          </button>

          <div style={{ width: '100%', height: 1, background: 'rgba(0,255,120,0.15)', margin: '4px 0' }} />

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
                }} />
                {label}
              </button>
            );
          })}
        </div>

        {/* CENTER: Canvas Topology */}
        <div ref={centerRef} className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-[11px] tracking-[0.2em] text-[#7fffd4]/30">
              MAPPING EMBEDDINGS...
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-[11px] text-red-400">
              {error}
            </div>
          )}
          
          {/* DECODING LEGEND OVERLAY (Resolves empty screen confusion!) */}
          <div className="absolute top-6 left-6 p-4 rounded-lg bg-black/60 shadow-2xl backdrop-blur-md border border-white/10 pointer-events-none z-10 max-w-[280px]">
              <p className="text-[#00ffa0] text-[10px] tracking-[0.2em] font-bold mb-2">LATENT EMBEDDING MAP</p>
              <p className="text-white/60 text-[9px] leading-relaxed mb-1">Repositories are algorithmically clustered via 2D Gaussian mechanics based on underlying functional architectures.</p>
              <p className="text-white/40 text-[8px] leading-relaxed italic border-t border-white/10 pt-2 mt-2">Glowing neural edges detect contiguous infrastructure and interconnected language frameworks. Active Repositories: {repos.length}</p>
          </div>

          <canvas
            ref={canvasRef}
            width={cvSize} height={cvSize}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { hoverRef.current = null; canvasRef.current!.style.cursor = 'crosshair'; }}
            onClick={handleClick}
            style={{ width: cvSize, height: cvSize, display: 'block', margin: '0 auto', touchAction: 'none' }}
          />
        </div>

        {/* RIGHT: Project Node Decoder */}
        <div style={{
          width: 380, flexShrink: 0, borderLeft: `1px solid rgba(0,255,120,0.07)`,
          background: 'rgba(2,12,8,0.4)', backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', position: 'relative',
        }}>
          {!selected ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: DS.textDim, padding: 32, textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, border: `1px dashed ${DS.textDim}`, borderRadius: '50%', marginBottom: 16 }} />
              <p style={{ fontSize: 11, letterSpacing: '0.15em', fontWeight: 'bold' }}>ISOLATING NODE...</p>
            </div>
          ) : (
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: selColor, fontWeight: 'bold', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, background: selColor, borderRadius: '50%' }} />
                  ISOLATED NODE
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
                Access Coordinates ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE MODE: TRADITIONAL CARD LIST FALLBACK ── */}
      <div className="lg:hidden flex flex-col h-full overflow-y-auto px-6 py-10 no-scrollbar">
        <h1 className="text-3xl font-black mb-3 tracking-widest uppercase">Projects</h1>
        <p className="text-xs text-white/50 mb-10 pb-4 border-b border-white/10 uppercase tracking-widest font-mono">
          Latent Canvas Engine is optimized for desktop environments. Executing linear list fallback protocol. Active Repositories: {repos.length}
        </p>
        
        {loading && <p className="text-white/50 text-xs">Querying Github Architectures...</p>}

        <div className="flex flex-col gap-5 pb-20">
           {repos.map(r => {
               const clsId = classifyCluster(r.language);
               const cls = CLUSTERS.find(c => c.id === clsId)!;
               return (
                 <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="block border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:bg-white-[0.06] hover:border-white/20 transition duration-300">
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: cls.color, color: cls.color }} />
                       <span className="text-[10px] uppercase font-bold tracking-[0.2em]" style={{ color: cls.color }}>{cls.label}</span>
                     </div>
                     <div className="text-[10px] bg-slate-900 rounded border border-white/10 px-2 py-0.5 text-white/50">{timeAgo(r.updated_at)}</div>
                   </div>
                   
                   <h2 className="text-white font-black text-xl mb-3 tracking-tight">{r.name}</h2>
                   <p className="text-white/60 text-sm leading-relaxed mb-6">{r.description || 'No abstract provided for this infrastructure.'}</p>
                   
                   <div className="flex flex-wrap gap-4 items-center">
                      {r.language && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-white/50">
                          <code className="bg-white/5 px-2 py-0.5 border border-white/5 rounded">{r.language}</code>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-xs font-mono">
                         <span className="text-amber-400">★ {r.stargazers_count}</span>
                         <span className="text-white/40">⑂ {r.forks_count}</span>
                      </div>
                   </div>
                 </a>
               )
           })}
        </div>
      </div>

    </div>
  );
}
