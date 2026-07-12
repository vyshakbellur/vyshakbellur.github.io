import { useState, useEffect, useRef, useMemo } from 'react';
import { hobbiesInfo } from '../data/content';

/* ─── Sub-section definitions ─── */
const TABS = [
  { id: 'biography',  label: 'Biography' },
  { id: 'career',     label: 'Career' },
  { id: 'education',  label: 'Education' },
  { id: 'running',    label: 'Running' },
  { id: 'music',      label: 'Music' },
  { id: 'travel',     label: 'Travel' },
] as const;

type TabId = typeof TABS[number]['id'];

/* ═══════════════════════════════════════════
   CAREER DATA — Git-Graph Topology
   ═══════════════════════════════════════════ */
const CAREER_DATA: Record<string, any> = {
  'jpmc': { company: 'JPMorgan Chase & Co.', role: 'Senior Full-Stack Engineer', period: 'Jun 2023 – Present',
    commits: ['Spearheading modernization of Investment Discovery APIs (SOAP → REST)', 'Catapulted test coverage from 18% to 80%, securing zero P1 incidents in 2025', 'Architected "Magic Button" — an LLM tool delivering wealth intelligence', 'Owned critical TLS and ADFS certificate lifecycle rotation across prod'] },
  'walmart': { company: 'Walmart Global Tech', role: 'Software Engineer', period: 'Dec 2022 – Jun 2023',
    commits: ['Built React analytics dashboards isolating shopper behavior & channel metrics', 'Enforced strict TDD universally with Jest, Cypress, and JUnit', 'Implemented complex role and region-based access control inside systems'] },
  'ford': { company: 'Ford Motor Co.', role: 'Software Consultant', period: 'Mar 2021 – Dec 2022',
    commits: ['Key developer on the EV Beta platform onboarding ~15k users across the U.S.', 'Full-stack delivery via React, TypeScript, Spring Boot, and MySQL', 'Masterminded integrations with Splunk and Amplitude for observability pipelines'] },
  'synchrony': { company: 'Synchrony', role: 'Senior Software Engineer', period: 'Jun 2018 – Dec 2021',
    commits: ['Architected event-driven microservices processing 1.2M+ tx/day', 'Achieved sub-50ms latency utilizing Kafka, RabbitMQ, and Redis', 'Built a reusable React UI component library adopted across enterprise teams'] },
  'sdsu': { company: 'SDSU Research Foundation', role: 'Research Software Developer', period: '2019 – 2020',
    commits: ['Deployed CIBER Portal — robust program CMS empowering non-technical staff', 'Engineered bioinformatics data pipelines improving ingestion scalability'] },
  'ubs': { company: 'UBS (via HCL)', role: 'Software Engineer', period: 'Aug 2014 – May 2018',
    commits: ['Engineered Enterprise HR automation frameworks (Java Spring Boot, MySQL)', 'Reduced onboarding and background-check effort by ~70%', 'Designed extensible schemas and front-end workflows for employee platforms'] },
};

const GIT_NODES = [
  { id: 'jpmc', y: 60, x: 40, color: '#38bdf8', label: 'JPMorgan Chase & Co.' },
  { id: 'walmart', y: 240, x: 160, color: '#f472b6', label: 'Walmart Global Tech' },
  { id: 'ford', y: 330, x: 100, color: '#4ade80', label: 'Ford Motor Co.' },
  { id: 'synchrony', y: 450, x: 40, color: '#38bdf8', label: 'Synchrony' },
  { id: 'sdsu', y: 540, x: 100, color: '#fbbf24', label: 'SDSU Research' },
  { id: 'ubs', y: 630, x: 40, color: '#38bdf8', label: 'UBS' },
];

const GIT_EDGES = [
  { color: '#38bdf8', path: 'M 40 680 L 40.01 0' },
  { color: '#fbbf24', path: 'M 40 630 L 100 570 L 100 510 L 40 450' },
  { color: '#4ade80', path: 'M 40 450 L 100 390 L 100 120 L 40 60' },
  { color: '#f472b6', path: 'M 100 330 L 160 270 L 160 210 L 100 150' },
];

/* ═══════════════════════════════════════════
   EDUCATION DATA — DNA Helix
   ═══════════════════════════════════════════ */
type EduNode = {
  id: string; strand: 0 | 1; u: number;
  title: string; institution: string; period?: string;
  description: string; impact?: string; courses?: string[];
  url?: string; color: string;
};

const D = 1200; const A = 130;
const FREQ = (Math.PI * 2) / 800;

const getPos = (u: number, strand: 0 | 1) => {
  const pct = u / D;
  const cx = 150 + pct * 900, cy = 950 - pct * 900;
  const nx = 0.707, ny = 0.707;
  const phase = strand === 0 ? 0 : Math.PI;
  const offset = A * Math.sin(u * FREQ + phase);
  return { x: cx + offset * nx, y: cy + offset * ny, isRightSide: offset > 0 };
};

const EDU_NODES: EduNode[] = [
  { id: 'be', strand: 0, u: 150, title: 'BE, Electronics & Communication', institution: 'Visvesvaraya Technological University', period: '2010 – 2014', description: 'Foundational engineering degree combining hardware systems with low-level software.', courses: ['Digital Signal Processing', 'Microcontrollers & Architecture', 'Data Structures'], color: '#06b6d4' },
  { id: 'ms', strand: 0, u: 300, title: 'MS in Computer Science', institution: 'San Diego State University', period: '2016 – 2019', description: 'Specialized in computer science fundamentals, applied research, and bioinformatics pipelines.', impact: 'Established the research foundation for large-scale computational analysis on biological networks.', courses: ['Bioinformatics & Network Science', 'Database Systems', 'Machine Learning'], color: '#3b82f6' },
  { id: 'stan-algo', strand: 1, u: 450, title: 'Algorithms Specialization', institution: 'Stanford University (Coursera)', period: 'Dec 2017', url: 'https://www.coursera.org/account/accomplishments/specialization/GTU2NM3LEHMW', description: 'Rigorous specialization covering greedy algorithms, dynamic programming, and computationally intractable (NP) problems.', impact: 'Honed my ability to optimize bottlenecks in computationally heavy systems like DNA Language Models.', courses: ['Greedy Algorithms', 'Graph Theory', 'Dynamic Programming', 'NP-Completeness'], color: '#f97316' },
  { id: 'grad-web', strand: 1, u: 600, title: 'Grad Cert Web & Mobile Apps', institution: 'San Diego State University', period: '2019', description: 'Advanced coursework spanning full-stack web architectures, mobile deployments, and API integrations.', impact: 'Provides the structural engineering background needed to build tangible UI/UX interfaces over complex back-end architectures.', courses: ['Advanced Web Applications', 'Mobile Development Frameworks'], color: '#10b981' },
  { id: 'aws-dev', strand: 1, u: 750, title: 'AWS Certified Developer – Associate', institution: 'Amazon Web Services', url: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/9c863874de0e4e3b8279faae6cae39b3', description: 'Cloud-native application development, serverless computing, and robust CI/CD pipelines on AWS infrastructure.', impact: 'Validates my ability to turn research and models into reliable, highly-available production APIs.', courses: [], color: '#f59e0b' },
  { id: 'aws-arch', strand: 1, u: 900, title: 'AWS Solutions Architect – Associate', institution: 'Amazon Web Services', url: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/J8X553629M4E1XG0', description: 'Designing highly available, scalable, fault-tolerant, and cost-optimized enterprise cloud architectures.', impact: 'Empowers me to architect resilient ML production pipelines and orchestration layers.', courses: [], color: '#ef4444' },
  { id: 'phd', strand: 0, u: 1050, title: 'PhD in Machine Learning', institution: 'University of the Cumberlands', period: '2022 – Present', description: 'Current research focusing on ML architectures, DNA Language Modeling, and reliability engineering.', impact: 'Driving cutting-edge applied research to build fault-tolerant learning architectures for complex, noisy systems.', courses: ['Advanced Neural Architectures', 'Computational Metagenomics', 'Stochastic Processes Data Modeling'], color: '#8b5cf6' },
];

/* ─── Dynamic adventure images ─── */
const ADVENTURE_IMAGES = [
  "1181332_317541653_XLarge.jpg", "4e63cf4b-9641-4bf6-a5f0-033bcf089dde.jpg",
  "5FDB777C-75EE-447F-83E6-6F73D2FB2A82.jpg", "89a27617-600e-4c19-ba6d-4554aa1405ce.jpg",
  "GEO_5480.jpg", "GEO_5496.jpg", "IMG_1245.JPG", "IMG_1247.JPG",
  "IMG_6329.jpeg", "IMG_9181 2.jpg", "Skydive-00061.jpeg", "a30a4386-d447-47e3-9246-495a67c078e5.jpg",
];


/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>('biography');

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* ── Header + Tabs ── */}
      <div className="flex-shrink-0 px-5 pt-6 pb-0 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-semibold tracking-tight text-white/95 md:text-3xl mb-3">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">About</span>
        </h1>
        <div className="flex flex-wrap gap-1 mb-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white/95 border border-white/15'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 no-scrollbar">
        {activeTab === 'biography' && <BiographyTab />}
        {activeTab === 'career' && <CareerTab />}
        {activeTab === 'education' && <EducationTab />}
        {activeTab === 'running' && <RunningTab />}
        {activeTab === 'music' && <MusicTab />}
        {activeTab === 'travel' && <TravelTab />}
      </div>
    </div>
  );
}


/* ═══ BIOGRAPHY ═══ */
function BiographyTab() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-6 space-y-5 text-sm leading-relaxed text-white/70">
      <p>
        I am a Senior Software Engineer at JPMorgan Chase and an applied ML researcher whose work spans three domains: financial infrastructure, computational biology, and digital humanities — connected by a single obsession: <em className="text-white/90 not-italic font-medium">finding structure in complex, noisy systems.</em>
      </p>
      <p>
        At JPMorgan Chase, I work on production-grade ML systems focused on autonomous reliability, utilizing anomaly detection and automated recovery pipelines to reduce MTTR to under 15 minutes.
      </p>
      <p>
        Currently pursuing a PhD from the University of the Cumberlands. For my research, I collaborate with Prof. Forest Rohwer at San Diego State University on microbiome network architecture and DNA Language Modeling for metagenomics. Previously, my published work with Prof. Sam Kassegne in Oxford University Press applied computational pattern recognition to measure structural similarity across ancient writing systems.
      </p>
      <p>
        Outside of the terminal, I run long distances, do adventure travel, and produce music under the channel <strong className="text-amber-400 font-serif italic">v_naada</strong>. I am a Royal Challengers Bengaluru fan, a mountain person, and a believer that pattern recognition is a universal language.
      </p>
    </div>
  );
}


/* ═══ CAREER — Git-Graph (from original Experience page) ═══ */
function CareerTab() {
  const [selectedNode, setSelectedNode] = useState('jpmc');
  const selected = CAREER_DATA[selectedNode];
  const selectedSvgNode = GIT_NODES.find(n => n.id === selectedNode);
  const color = selectedSvgNode?.color || '#38bdf8';

  return (
    <>
      <style>{`
        .holo-scrollbar::-webkit-scrollbar { width: 6px; }
        .holo-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .holo-scrollbar::-webkit-scrollbar-thumb { background: rgba(51, 255, 0, 0.4); border-radius: 4px; }
        .holo-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(51, 255, 0, 0.8); }
      `}</style>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex h-full items-center justify-center px-12 gap-12">
        <div className="w-1/2 flex items-center justify-end pr-12 min-h-[500px]">
          <svg viewBox="0 0 520 680" className="w-[520px] h-[680px] drop-shadow-[0_0_20px_rgba(255,255,255,0.03)]">
            <defs>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {GIT_EDGES.map((edge, idx) => (
              <path key={`edge-${idx}`} d={edge.path} fill="none" stroke={edge.color} strokeWidth="4" filter="url(#neonGlow)" className="opacity-80" strokeLinejoin="round" strokeLinecap="round" />
            ))}
            {GIT_NODES.map((node) => {
              const isSelected = selectedNode === node.id;
              return (
                <g key={node.id} onClick={() => setSelectedNode(node.id)} className="cursor-pointer group">
                  <circle cx={node.x} cy={node.y} r="20" fill="transparent" />
                  <circle cx={node.x} cy={node.y} r={isSelected ? 9 : 6} fill={node.color} stroke="#050505" strokeWidth="3" filter={isSelected ? "url(#neonGlow)" : ""} className="transition-all duration-300 group-hover:scale-125" style={{ transformOrigin: `${node.x}px ${node.y}px` }} />
                  <text x="210" y={node.y + 6} fill={isSelected ? '#ffffff' : '#8b949e'} fontSize={isSelected ? '16' : '15'} fontWeight={isSelected ? '800' : '500'} className="font-mono tracking-tight transition-all duration-300" style={isSelected ? { textShadow: `0 0 15px ${node.color}` } : {}}>
                    {node.label}
                  </text>
                  <line x1={node.x + 15} y1={node.y} x2="195" y2={node.y} stroke={node.color} strokeWidth="1" strokeDasharray="3 3" className={`transition-opacity duration-300 ${isSelected ? 'opacity-40' : 'opacity-10'}`} />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-[550px] flex flex-col rounded-2xl bg-[#06080D]/60 backdrop-blur-3xl overflow-hidden relative transition-all duration-500 border border-white/5 shadow-2xl" style={{ boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), inset 0 0 20px ${color}15` }}>
            <div className="h-1.5 w-full transition-colors duration-500" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }} />
            <div className="flex flex-col p-10 z-10 relative h-[450px]">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none transition-colors duration-500" style={{ backgroundColor: color }} />
              {selected && (
                <div className="flex flex-col z-20 h-full">
                  <h3 className="text-2xl font-black tracking-widest uppercase mb-2 transition-colors duration-500" style={{ color, textShadow: `0 0 15px ${color}60` }}>{selected.company}</h3>
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6 shrink-0">
                    <span className="text-sm font-semibold tracking-wide text-white/90">{selected.role}</span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-sm bg-white/5 text-white/50 border border-white/5">{selected.period}</span>
                  </div>
                  <ul className="space-y-4 overflow-y-auto holo-scrollbar pr-2 pb-2 flex-grow">
                    {selected.commits.map((commit: string, i: number) => (
                      <li key={i} className="flex gap-4 items-start text-sm leading-relaxed text-[#8b949e]">
                        <svg className="w-5 h-5 mt-0.5 shrink-0 transition-colors duration-500" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="tracking-wide transition-colors duration-300 hover:text-[#c9d1d9]">{commit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden flex flex-col px-6 py-8 font-mono text-[#c9d1d9]">
        <div className="flex flex-col gap-10 border-l border-white/10 ml-2 pb-16">
          {GIT_NODES.map(node => {
            const dt = CAREER_DATA[node.id];
            return (
              <div key={node.id} className="relative pl-8">
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full" style={{ background: node.color, boxShadow: `0 0 10px ${node.color}` }} />
                <h3 className="text-lg font-black tracking-widest uppercase mb-1" style={{ color: node.color }}>{dt.company}</h3>
                <div className="flex flex-col gap-1.5 mb-5 border-b border-white/10 pb-4">
                  <span className="text-white/90 font-bold text-sm tracking-wide">{dt.role}</span>
                  <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-white/40">{dt.period}</span>
                </div>
                <ul className="space-y-4">
                  {dt.commits.map((c: string, idx: number) => (
                    <li key={idx} className="flex gap-3 text-xs leading-relaxed text-[#8b949e]">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: node.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}


/* ═══ EDUCATION — DNA Helix (from original Education page) ═══ */
function EducationTab() {
  const [hovered, setHovered] = useState<string>('phd');
  const activeNode = EDU_NODES.find((n) => n.id === hovered) || EDU_NODES[EDU_NODES.length - 1];

  const boundsU = [0, 1200];
  const resolution = 15;

  const strand0Points = useMemo(() => {
    let d = '';
    for (let u = boundsU[0]; u <= boundsU[1]; u += resolution) {
      const pos = getPos(u, 0);
      d += `${u === boundsU[0] ? 'M' : 'L'} ${pos.x},${pos.y} `;
    }
    return d;
  }, []);

  const strand1Points = useMemo(() => {
    let d = '';
    for (let u = boundsU[0]; u <= boundsU[1]; u += resolution) {
      const pos = getPos(u, 1);
      d += `${u === boundsU[0] ? 'M' : 'L'} ${pos.x},${pos.y} `;
    }
    return d;
  }, []);

  const basePairs = useMemo(() => {
    const pairs = [];
    for (let u = boundsU[0] + 15; u < boundsU[1]; u += 25) {
      pairs.push({ u, p1: getPos(u, 0), p2: getPos(u, 1) });
    }
    return pairs;
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      {/* SVG Map */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 min-h-0">
          <svg viewBox="0 0 1200 1000" className="w-full h-full max-h-[100%] object-contain drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="helix-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
                <feMerge><feMergeNode in="blur1" /><feMergeNode in="blur2" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="node-active-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur1" />
                <feMerge><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="grad-edu" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-cert" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            <g opacity={0.03} stroke="#fff" strokeWidth={1}>
              {Array.from({ length: 20 }).map((_, i) => (<line key={`lx-${i}`} x1="0" y1={i * 70} x2="1200" y2={i * 70} />))}
              {Array.from({ length: 20 }).map((_, i) => (<line key={`ly-${i}`} x1={i * 70} y1="0" x2={i * 70} y2="1000" />))}
            </g>

            <g>
              {basePairs.map((bp, i) => (
                <line key={`bp-${i}`} x1={bp.p1.x} y1={bp.p1.y} x2={bp.p2.x} y2={bp.p2.y} stroke="rgba(255,255,255,0.12)" strokeWidth={3} strokeDasharray="2 4" strokeLinecap="round" />
              ))}
            </g>

            <path d={strand0Points} fill="none" stroke="url(#grad-edu)" strokeWidth={10} strokeLinecap="round" filter="url(#helix-glow)" opacity={hovered ? (activeNode?.strand === 0 ? 1 : 0.15) : 0.8} style={{ transition: 'opacity 0.4s ease' }} />
            <path d={strand1Points} fill="none" stroke="url(#grad-cert)" strokeWidth={10} strokeLinecap="round" filter="url(#helix-glow)" opacity={hovered ? (activeNode?.strand === 1 ? 1 : 0.15) : 0.8} style={{ transition: 'opacity 0.4s ease' }} />

            {EDU_NODES.map((node) => {
              const isHovered = hovered === node.id;
              const isSameStrand = activeNode?.strand === node.strand;
              const isFaded = !isSameStrand;
              const { x, y, isRightSide } = getPos(node.u, node.strand);
              const labelOffsetX = isRightSide ? 50 : -50;
              const labelOffsetY = isRightSide ? 50 : -50;
              return (
                <g key={node.id} onMouseEnter={() => setHovered(node.id)} style={{ cursor: 'pointer', transition: 'opacity 0.4s ease' }} opacity={isFaded ? 0.15 : 1}>
                  <line x1={x} y1={y} x2={x + labelOffsetX * 0.8} y2={y + labelOffsetY * 0.8} stroke={node.color} strokeWidth={2} strokeOpacity={isSameStrand ? 0.8 : 0.2} strokeDasharray="4 4" style={{ transition: 'all 0.4s ease' }} />
                  <circle cx={x} cy={y} r={isHovered ? 32 : (isSameStrand ? 22 : 16)} fill={node.color} opacity={isHovered ? 0.5 : (isSameStrand ? 0.25 : 0)} filter="url(#node-active-glow)" style={{ transition: 'all 0.4s ease' }} />
                  <polygon points={node.strand === 0 ? `${x},${y-12} ${x-12},${y} ${x},${y+12} ${x+12},${y}` : `${x-10},${y-10} ${x+10},${y-10} ${x+10},${y+10} ${x-10},${y+10}`} fill={isHovered ? '#fff' : (isSameStrand ? node.color : '#030610')} stroke={node.color} strokeWidth={3} filter={isSameStrand ? "url(#node-active-glow)" : "none"} style={{ transition: 'all 0.4s ease' }} />
                  <text x={x + labelOffsetX} y={y + labelOffsetY - 8} textAnchor={isRightSide ? 'start' : 'end'} fill={isHovered ? '#fff' : (isSameStrand ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)')} fontSize={13} fontWeight={900} fontFamily="monospace" letterSpacing="0.05em" className="drop-shadow-lg pointer-events-none" style={{ transition: 'all 0.4s ease' }}>
                    {node.title}
                  </text>
                  {node.period && (
                    <text x={x + labelOffsetX} y={y + labelOffsetY + 16} textAnchor={isRightSide ? 'start' : 'end'} fill={node.color} fontSize="14" fontFamily="monospace">{node.period}</text>
                  )}
                </g>
              );
            })}

            <text x="250" y="920" fill="url(#grad-edu)" fontSize="16" fontFamily="monospace" fontWeight="bold" opacity="0.6">STRAND 0: ACADEMIA & RESEARCH</text>
            <text x="1100" y="120" fill="url(#grad-cert)" textAnchor="end" fontSize="16" fontFamily="monospace" fontWeight="bold" opacity="0.6">STRAND 1: INDUSTRY & ARCHITECTURE</text>
          </svg>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="w-full md:w-[360px] bg-[#020409] border-l border-white/5 flex flex-col shrink-0 z-10 shadow-2xl">
        <div className="flex-1 p-6 flex flex-col overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-3 mb-5 bg-white/5 p-2 px-3 rounded-lg border border-white/10 w-max">
            <div className="w-3 h-3" style={{ background: activeNode.color, boxShadow: `0 0 10px ${activeNode.color}`, borderRadius: activeNode.strand === 0 ? '50%' : '2px' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: activeNode.color }}>
              {activeNode.strand === 0 ? 'Academia' : 'Industry'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{activeNode.title}</h2>
          <div className="text-white/60 font-serif italic mb-4 text-base">{activeNode.institution}</div>
          {activeNode.period && (
            <div className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm font-mono tracking-widest text-white/80 mb-4 w-max">{activeNode.period}</div>
          )}
          <p className="text-white/80 leading-relaxed text-sm mb-4">{activeNode.description}</p>
          {activeNode.impact && (
            <div className="mb-6 border-l-2 pl-4 py-1" style={{ borderColor: `${activeNode.color}88` }}>
              <span className="text-xs font-mono uppercase tracking-widest block mb-1" style={{ color: activeNode.color }}>Impact</span>
              <p className="text-white/60 text-xs leading-relaxed">{activeNode.impact}</p>
            </div>
          )}
          {activeNode.courses && activeNode.courses.length > 0 && (
            <div className="mb-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono uppercase tracking-widest block mb-3 text-white/40">Key Coursework</span>
              <ul className="space-y-2">
                {activeNode.courses.map((course, i) => (
                  <li key={i} className="flex gap-2 text-xs text-white/70 items-start">
                    <span className="mt-0.5" style={{ color: activeNode.color }}>▹</span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex-1 min-h-[20px]" />
          {activeNode.url && (
            <a href={activeNode.url} target="_blank" rel="noreferrer"
              className="mt-4 px-4 py-3 rounded bg-white/[0.03] text-sm font-mono tracking-widest text-center border hover:bg-white/10 transition-colors shadow-lg flex items-center justify-center gap-2"
              style={{ color: activeNode.color, borderColor: `${activeNode.color}44` }}>
              VERIFY CREDENTIAL
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


/* ═══ RUNNING ═══ */
function RunningTab() {
  return (
    <div className="grid gap-5 md:grid-cols-2 max-w-3xl mx-auto px-5 py-6">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-xs font-medium tracking-widest uppercase text-pink-400/70 mb-3">Race Stats</div>
        <ul className="text-sm space-y-3 text-white/70 font-mono">
          <li className="flex justify-between border-b border-white/5 pb-2"><span>Full Marathons</span><span className="text-white font-bold">1</span></li>
          <li className="flex justify-between border-b border-white/5 pb-2"><span>Half Marathons</span><span className="text-white font-bold">6</span></li>
          <li className="text-xs text-white/40 italic pt-1">Racing the streets of NYC.</li>
        </ul>
        <a href={hobbiesInfo.running.nyrrHref} target="_blank" rel="noreferrer" className="mt-4 inline-block text-[10px] font-bold tracking-widest uppercase text-pink-400/80 hover:text-pink-400 transition-colors">NYRR Results ↗</a>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-xs font-medium tracking-widest uppercase text-pink-400/70 mb-3">Philosophy</div>
        <p className="text-sm leading-relaxed text-white/60">
          Long-distance running is structured endurance — the same discipline that drives deep research and complex engineering. Every marathon teaches patience, pacing, and the art of pushing through walls.
        </p>
      </div>
    </div>
  );
}


/* ═══ MUSIC ═══ */
function MusicTab() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-6">
      <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.03] p-6">
        <h3 className="text-lg font-bold text-emerald-400 mb-2 font-serif italic">v_naada</h3>
        <p className="text-sm leading-relaxed text-white/60 mb-4">
          Producing classical Indian fusion and contemporary sounds. Music is pattern recognition in a different key — rhythm, harmonic structure, and improvisation share deep parallels with the mathematical patterns I study in ML research.
        </p>
        <div className="flex gap-4">
          <a href="https://instagram.com/v_naada" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-widest uppercase text-emerald-400/80 hover:text-emerald-400 transition-colors">Instagram ↗</a>
          <a href="https://youtube.com/@v_naada" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-widest uppercase text-emerald-400/80 hover:text-emerald-400 transition-colors">YouTube ↗</a>
        </div>
      </div>
    </div>
  );
}


/* ═══ TRAVEL ═══ */
function TravelTab() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <div className="grid gap-5 md:grid-cols-3 mb-6">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-xs font-medium tracking-widest uppercase text-blue-400/70 mb-3">Exploration</div>
          <ul className="text-sm space-y-2 text-white/70 font-mono">
            <li className="flex justify-between border-b border-white/5 pb-2"><span>US States</span><span className="text-white font-bold">43</span></li>
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Passports Stamped</span><span className="text-white font-bold">14</span></li>
            <li className="flex justify-between"><span>Coast to Coast Drives</span><span className="text-amber-400 font-bold">2x</span></li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-xs font-medium tracking-widest uppercase text-emerald-400/70 mb-3">Adrenaline</div>
          <ul className="text-sm space-y-2 text-white/70 font-mono">
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Skydives</span><span className="text-white font-bold">3</span></li>
            <li className="text-xs text-white/40 italic pt-1">Six continents and counting.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex items-center justify-center">
          <p className="text-xs text-white/40 text-center italic leading-relaxed">"The world is a book and those who do not travel read only one page."</p>
        </div>
      </div>

      <div className="w-full relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#02040a] to-transparent z-10 hidden md:block pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#02040a] to-transparent z-10 hidden md:block pointer-events-none" />
        <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory no-scrollbar pb-4">
          {ADVENTURE_IMAGES.map((src, idx) => (
            <div key={idx} className="snap-center shrink-0 w-[250px] aspect-[4/3] group overflow-hidden rounded-xl border border-white/5 relative">
              <img src={`/adventure/${src}`} alt="Exploration" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 cursor-grab active:cursor-grabbing" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
