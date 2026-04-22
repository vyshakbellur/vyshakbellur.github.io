import { useState, useMemo } from 'react';

type EduNode = {
  id: string;
  strand: 0 | 1; // 0 = Education, 1 = Certification
  u: number;     // Position along the diagonal axis (0 to 1200)
  title: string;
  institution: string;
  period?: string;
  description: string;
  impact?: string;
  courses?: string[];
  url?: string;
  color: string;
};

// Helix mathematical constants for Diagonal rendering
const D = 1200; // Total timeline length
const A = 130;  // Amplitude (width of helix)
const FREQ = (Math.PI * 2) / 800; // One full twist every 800 units

// getPos translates the 1D parameter `u` into 2D diagonal coordinates
const getPos = (u: number, strand: 0 | 1) => {
  const pct = u / D;
  
  // Center line moving from bottom-left (150, 950) to top-right (1050, 50)
  const cx = 150 + pct * 900;  
  const cy = 950 - pct * 900;  
  
  // Normal vector pointing bottom-right (perpendicular to center line)
  const nx = 0.707;
  const ny = 0.707;
  
  const phase = strand === 0 ? 0 : Math.PI;
  const offset = A * Math.sin(u * FREQ + phase);
  
  return {
    x: cx + offset * nx,
    y: cy + offset * ny,
    isRightSide: offset > 0,
  };
};

// Nodes mapped chronologically from bottom-left (low u) to top-right (high u)
const NODES: EduNode[] = [
  /* ─── Strand 0: Education ─── */
  {
    id: 'be',
    strand: 0,
    u: 150,
    title: 'BE, Electronics & Communication',
    institution: 'Visvesvaraya Technological University',
    period: '2010 – 2014',
    description: 'Foundational engineering degree combining hardware systems with low-level software.',
    courses: ['Digital Signal Processing', 'Microcontrollers & Architecture', 'Data Structures'],
    color: '#06b6d4', // Cyan
  },
  {
    id: 'ms',
    strand: 0,
    u: 300,
    title: 'MS in Computer Science',
    institution: 'San Diego State University',
    period: '2016 – 2019',
    description: 'Specialized in computer science fundamentals, applied research, and bioinformatics pipelines.',
    impact: 'Established the research foundation for large-scale computational analysis on biological networks.',
    courses: ['Bioinformatics & Network Science', 'Database Systems', 'Machine Learning'],
    color: '#3b82f6', // Blue
  },

  /* ─── Strand 1: Certifications & Specializations ─── */
  {
    id: 'stan-algo',
    strand: 1,
    u: 450,
    title: 'Algorithms Specialization',
    institution: 'Stanford University (Coursera)',
    period: 'Dec 2017',
    url: 'https://www.coursera.org/account/accomplishments/specialization/GTU2NM3LEHMW',
    description: 'Rigorous specialization covering greedy algorithms, dynamic programming, and computationally intractable (NP) problems.',
    impact: 'Honed my ability to optimize bottlenecks in computationally heavy systems like DNA Language Models. Algorithmic efficiency is the difference between a research prototype and a viable real-world platform.',
    courses: ['Greedy Algorithms', 'Graph Theory', 'Dynamic Programming', 'NP-Completeness'],
    color: '#f97316', // Orange
  },
  {
    id: 'grad-web',
    strand: 1,
    u: 600,
    title: 'Grad Cert Web & Mobile Apps',
    institution: 'San Diego State University',
    period: '2019',
    description: 'Advanced coursework spanning full-stack web architectures, mobile deployments, and API integrations.',
    impact: 'Provides the structural engineering background needed to build tangible UI/UX interfaces over complex back-end architectures, allowing me to build complete products rather than just isolated algorithms.',
    courses: ['Advanced Web Applications', 'Mobile Development Frameworks'],
    color: '#10b981', // Emerald
  },
  {
    id: 'aws-dev',
    strand: 1,
    u: 750,
    title: 'AWS Certified Developer – Associate',
    institution: 'Amazon Web Services',
    url: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/9c863874de0e4e3b8279faae6cae39b3',
    description: 'Cloud-native application development, serverless computing, and robust CI/CD pipelines on AWS infrastructure.',
    impact: 'Validates my ability to turn research and models into reliable, highly-available production APIs. This is crucial for bridging the gap between theoretical ML models and scalable enterprise deployments.',
    courses: [],
    color: '#f59e0b', // Amber
  },
  {
    id: 'aws-arch',
    strand: 1,
    u: 900,
    title: 'AWS Solutions Architect – Associate',
    institution: 'Amazon Web Services',
    url: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/J8X553629M4E1XG0',
    description: 'Designing highly available, scalable, fault-tolerant, and cost-optimized enterprise cloud architectures.',
    impact: 'Empowers me to architect resilient ML production pipelines and orchestration layers—like autonomous self-healing engines—ensuring they scale flawlessly within modern FinTech and enterprise ecosystems.',
    courses: [],
    color: '#ef4444', // Red
  },

  /* ─── Stand 0: PhD at the very top ─── */
  {
    id: 'phd',
    strand: 0,
    u: 1050,
    title: 'PhD in Machine Learning',
    institution: 'University of the Cumberlands',
    period: '2022 – Present',
    description: 'Current research focusing on ML architectures, DNA Language Modeling, and reliability engineering.',
    impact: 'Driving cutting-edge applied research to build fault-tolerant learning architectures for complex, noisy systems (e.g. metagenomics, financial telemetry).',
    courses: ['Advanced Neural Architectures', 'Computational Metagenomics', 'Stochastic Processes Data Modeling'],
    color: '#8b5cf6', // Purple
  },
];

export default function Education() {
  // Select PhD by default on mount
  const [hovered, setHovered] = useState<string>('phd');

  const activeNode = NODES.find((n) => n.id === hovered) || NODES[NODES.length - 1];

  // Generate Helix paths
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

  // Generate Base Pairs
  const basePairs = useMemo(() => {
    const pairs = [];
    for (let u = boundsU[0] + 15; u < boundsU[1]; u += 25) {
      pairs.push({
        u,
        p1: getPos(u, 0),
        p2: getPos(u, 1),
      });
    }
    return pairs;
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full bg-[#030610] overflow-hidden">
      
      {/* ─── Left Side: Title + SVG Map ─── */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Unified Title (Static Document Flow, No Overlap) */}
        <div className="pt-8 px-6 md:px-10 flex-shrink-0 z-20 relative">
          <h1 className="text-3xl md:text-5xl font-black tracking-widest uppercase text-white/90">Education</h1>
          <p className="text-xs md:text-lg font-mono tracking-widest mt-1 md:mt-2 text-white/50 uppercase">Academia and Certifications</p>
        </div>

        {/* ─── SVG DNA Helix Map ─── */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 min-h-0">
          <svg
            viewBox="0 0 1200 1000"
            className="w-full h-full max-h-[100%] object-contain drop-shadow-2xl"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="helix-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="node-active-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur1" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
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

            {/* Grid/Context representing time flow from bottom-left to top-right */}
            <g opacity={0.03} stroke="#fff" strokeWidth={1}>
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`lx-${i}`} x1="0" y1={i * 70} x2="1200" y2={i * 70} />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`ly-${i}`} x1={i * 70} y1="0" x2={i * 70} y2="1000" />
              ))}
            </g>

            {/* ─── Base Pairs ─── */}
            <g>
              {basePairs.map((bp, i) => (
                <line
                  key={`bp-${i}`}
                  x1={bp.p1.x} y1={bp.p1.y}
                  x2={bp.p2.x} y2={bp.p2.y}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={3}
                  strokeDasharray="2 4"
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* ─── Backbones (Education & Certification Strands) ─── */}
            <path
              d={strand0Points}
              fill="none"
              stroke="url(#grad-edu)"
              strokeWidth={10}
              strokeLinecap="round"
              filter="url(#helix-glow)"
              opacity={hovered ? (activeNode?.strand === 0 ? 1 : 0.15) : 0.8}
              style={{ transition: 'opacity 0.4s ease' }}
            />
            <path
              d={strand1Points}
              fill="none"
              stroke="url(#grad-cert)"
              strokeWidth={10}
              strokeLinecap="round"
              filter="url(#helix-glow)"
              opacity={hovered ? (activeNode?.strand === 1 ? 1 : 0.15) : 0.8}
              style={{ transition: 'opacity 0.4s ease' }}
            />

            {/* ─── Data Nodes (Degrees & Certs) ─── */}
            {NODES.map((node) => {
              const isHovered = hovered === node.id;
              const isSameStrand = activeNode?.strand === node.strand;
              const isFaded = !isSameStrand;
              const { x, y, isRightSide } = getPos(node.u, node.strand);

              const labelOffsetX = isRightSide ? 50 : -50;
              const labelOffsetY = isRightSide ? 50 : -50;

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}
                  opacity={isFaded ? 0.15 : 1}
                >
                  <line
                    x1={x} y1={y}
                    x2={x + labelOffsetX * 0.8} y2={y + labelOffsetY * 0.8}
                    stroke={node.color}
                    strokeWidth={2}
                    strokeOpacity={isSameStrand ? 0.8 : 0.2}
                    strokeDasharray="4 4"
                  />

                  <circle
                    cx={x} cy={y} r={isHovered ? 32 : (isSameStrand ? 22 : 16)}
                    fill={node.color} opacity={isHovered ? 0.5 : (isSameStrand ? 0.25 : 0)}
                    filter="url(#node-active-glow)"
                    style={{ transition: 'r 0.3s, opacity 0.3s' }}
                  />

                  <polygon
                    points={node.strand === 0 
                       ? `${x},${y-12} ${x-12},${y} ${x},${y+12} ${x+12},${y}`
                       : `${x-10},${y-10} ${x+10},${y-10} ${x+10},${y+10} ${x-10},${y+10}`
                    }
                    fill={isHovered ? '#fff' : (isSameStrand ? node.color : '#030610')}
                    stroke={node.color}
                    strokeWidth={3}
                    filter={isSameStrand ? "url(#node-active-glow)" : "none"}
                    style={{ transition: 'fill 0.3s, transform 0.3s' }}
                  />

                  <text
                    x={x + labelOffsetX}
                    y={y + labelOffsetY - 8}
                    textAnchor={isRightSide ? 'start' : 'end'}
                    fill={isHovered ? '#fff' : (isSameStrand ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)')}
                    fontSize={13}
                    fontWeight={900}
                    fontFamily="monospace"
                    letterSpacing="0.05em"
                    className="drop-shadow-lg pointer-events-none"
                  >
                    {node.title}
                  </text>
                  
                  {node.period && (
                    <text
                      x={x + labelOffsetX}
                      y={y + labelOffsetY + 16}
                      textAnchor={isRightSide ? 'start' : 'end'}
                      fill={node.color}
                      fontSize="14"
                      fontFamily="monospace"
                    >
                      {node.period}
                    </text>
                  )}
                </g>
              );
            })}

            {/* DNA Strand Identifiers */}
            <text x="250" y="920" fill="url(#grad-edu)" fontSize="16" fontFamily="monospace" fontWeight="bold" opacity="0.6">
              STRAND 0: ACADEMIA & RESEARCH
            </text>
            <text x="1100" y="120" fill="url(#grad-cert)" textAnchor="end" fontSize="16" fontFamily="monospace" fontWeight="bold" opacity="0.6">
              STRAND 1: INDUSTRY & ARCHITECTURE
            </text>
          </svg>
        </div>
      </div>

      {/* ─── Detail Panel ─── */}
      <div className="w-full md:w-[400px] bg-[#020409] border-l border-white/5 flex flex-col shrink-0 z-10 shadow-2xl">
        <div className="flex-1 p-8 flex flex-col overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-6 bg-white/5 p-2 px-3 rounded-lg border border-white/10 w-max">
              <div
                className="w-3 h-3"
                style={{
                  background: activeNode.color,
                  boxShadow: `0 0 10px ${activeNode.color}`,
                  borderRadius: activeNode.strand === 0 ? '50%' : '2px'
                }}
              />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: activeNode.color }}>
                {activeNode.strand === 0 ? 'Strand 0: Academia' : 'Strand 1: Industry'}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
              {activeNode.title}
            </h2>
            
            <div className="text-white/60 font-serif italic mb-6 text-lg">
              {activeNode.institution}
            </div>

            {activeNode.period && (
              <div className="inline-block px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm font-mono tracking-widest text-white/80 mb-6 w-max">
                {activeNode.period}
              </div>
            )}

            <p className="text-white/80 leading-relaxed text-base mb-6">
              {activeNode.description}
            </p>

            {/* Value & Impact Write-up */}
            {activeNode.impact && (
              <div className="mb-8 border-l-2 pl-4 py-1" style={{ borderColor: `${activeNode.color}88` }}>
                <span className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: activeNode.color }}>
                  Strategic Value & Impact
                </span>
                <p className="text-white/60 text-sm leading-relaxed">
                  {activeNode.impact}
                </p>
              </div>
            )}

            {/* Courses / Projects placeholder list */}
            {activeNode.courses && activeNode.courses.length > 0 && (
              <div className="mb-8 p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono uppercase tracking-widest block mb-4 text-white/40">
                  Key Coursework & Projects
                </span>
                <ul className="space-y-3">
                  {activeNode.courses.map((course, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/70 items-start">
                      <span className="mt-1" style={{ color: activeNode.color }}>▹</span>
                      <span>{course}</span>
                    </li>
                  ))}
                  {/* Invisible placeholder for User to add more easily in code */}
                  <li className="hidden">{/* Add another project here */}</li>
                </ul>
              </div>
            )}

            <div className="flex-1 min-h-[40px]" />

            {/* AWS & Coursera Credential Links */}
            {activeNode.url && (
              <a
                href={activeNode.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 px-5 py-4 rounded bg-white/[0.03] text-sm font-mono tracking-widest text-center border hover:bg-white/10 transition-colors shadow-lg flex items-center justify-center gap-2"
                style={{ color: activeNode.color, borderColor: `${activeNode.color}44` }}
              >
                VERIFY CREDENTIAL
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
        </div>
      </div>

    </div>
  );
}
