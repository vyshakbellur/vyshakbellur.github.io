import { useState, useEffect } from 'react';

type EduNode = {
  id: string;
  type: 'root' | 'branch' | 'leaf';
  title: string;
  institution: string;
  period?: string;
  url?: string;
  description: string;
  color: string;
  cx: number;
  cy: number;
  path: string; /* SVG path from stem connection to the node */
};

/* Base plant stem (Core identity / Software Engineering foundations) */
const STEM_PATH = 'M400,480 C395,380 410,250 400,80';

const NODES: EduNode[] = [
  /* ─── Roots (Degrees) ─── */
  {
    id: 'phd',
    type: 'root',
    title: 'PhD in Machine Learning',
    institution: 'University of the Cumberlands',
    period: '2022 – Present',
    description: 'Current research focusing on ML architectures, DNA Language Modeling, and reliability engineering.',
    color: '#8b5cf6', // purple
    cx: 460, cy: 560,
    path: 'M400,480 C410,500 430,530 460,560'
  },
  {
    id: 'ms',
    type: 'root',
    title: 'MS in Computer Science',
    institution: 'San Diego State University',
    period: '2016 – 2019',
    description: 'Specialized in computer science fundamentals, applied research, and bioinformatics pipelines.',
    color: '#3b82f6', // blue
    cx: 400, cy: 590,
    path: 'M400,480 C395,520 405,560 400,590'
  },
  {
    id: 'be',
    type: 'root',
    title: 'BE, Electronics & Communication',
    institution: 'Visvesvaraya Technological University',
    period: '2010 – 2014',
    description: 'Foundational engineering degree combining hardware systems with low-level software.',
    color: '#10b981', // emerald
    cx: 320, cy: 550,
    path: 'M400,480 C380,500 350,520 320,550'
  },

  /* ─── Branches (Specializations) ─── */
  {
    id: 'stan-algo',
    type: 'branch',
    title: 'Algorithms Specialization',
    institution: 'Stanford University (Coursera)',
    url: 'https://www.coursera.org/account/accomplishments/specialization/GTU2NM3LEHMW',
    description: 'In-depth specialization covering algorithmic design, graphs, NP-completeness, and dynamic programming.',
    color: '#f59e0b', // amber
    cx: 240, cy: 220,
    path: 'M401,360 C320,330 270,270 240,220'
  },

  /* ─── Leaves (Certifications) ─── */
  {
    id: 'aws-arch',
    type: 'leaf',
    title: 'AWS Certified Solutions Architect – Associate',
    institution: 'Amazon Web Services',
    description: 'Cloud architecture, distributed systems, and cost-optimized fault-tolerant deployment strategies.',
    color: '#f97316', // orange
    cx: 560, cy: 280,
    path: 'M405,390 C450,380 510,340 560,280'
  },
  {
    id: 'aws-dev',
    type: 'leaf',
    title: 'AWS Certified Developer – Associate',
    institution: 'Amazon Web Services',
    description: 'Cloud-native application development, serverless computing, and CI/CD on AWS.',
    color: '#eab308', // yellow
    cx: 520, cy: 160,
    path: 'M406,260 C440,240 480,200 520,160'
  },
  {
    id: 'grad-web',
    type: 'leaf',
    title: 'Graduate Certificate in Web & Mobile Apps',
    institution: 'San Diego State University',
    period: '2019',
    description: 'Advanced coursework in modern full-stack web and mobile application engineering.',
    color: '#2dd4bf', // teal
    cx: 280, cy: 120,
    path: 'M400,180 C360,160 310,140 280,120'
  }
];

export default function Education() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure CSS animation triggers after DOM mount
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const activeNode = NODES.find(n => n.id === hovered) || null;

  return (
    <div className="flex h-full bg-[#05080e] overflow-hidden">
      
      {/* ─── SVG Plant Map ─── */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 800 700"
          className="w-full h-full max-h-[90vh] object-contain drop-shadow-2xl"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Dash animation for plant growth */}
            <style>{`
              .grow-path {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: grow 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
              .grow-delayed {
                animation-delay: 1s;
              }
              @keyframes grow {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </defs>

          {/* Grid background (faint organic texture) */}
          <g stroke="rgba(255,255,255,0.02)" strokeWidth="1">
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={i} cx="400" cy="480" r={(i + 1) * 40} fill="none" />
            ))}
          </g>

          {/* ─── The Stem ─── */}
          <path
            d={STEM_PATH}
            fill="none"
            stroke="#202A36"
            strokeWidth="12"
            strokeLinecap="round"
            className={mounted ? 'grow-path' : ''}
          />
          <path
            d={STEM_PATH}
            fill="none"
            stroke="#4A6572"
            strokeWidth="4"
            strokeLinecap="round"
            className={mounted ? 'grow-path' : ''}
          />

          {/* ─── Ground line ─── */}
          <line
            x1="200" y1="480" x2="600" y2="480"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <text x="700" y="484" fill="rgba(255,255,255,0.15)" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">
            FOUNDATION (2010–2022)
          </text>

          {/* ─── Branches and Roots ─── */}
          {NODES.map((node) => {
            const isHovered = hovered === node.id;
            const isFaded = hovered !== null && !isHovered;
            
            return (
              <g key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}
                opacity={isFaded ? 0.3 : 1}
              >
                {/* Branch/Root line */}
                <path
                  d={node.path}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={node.type === 'root' ? "6" : "4"}
                  strokeLinecap="round"
                  opacity="0.6"
                  className={mounted ? `grow-path ${node.type !== 'root' ? 'grow-delayed' : ''}` : ''}
                />
                
                {/* Connection point pulse (active) */}
                {isHovered && (
                  <circle cx={node.cx} cy={node.cy} r="16" fill={node.color} opacity="0.2" filter="url(#glow)" />
                )}

                {/* Node representation based on type */}
                {node.type === 'root' ? (
                  /* Roots are solid anchor circles */
                  <circle cx={node.cx} cy={node.cy} r="10" fill={node.color} stroke="#05080e" strokeWidth="3" />
                ) : node.type === 'branch' ? (
                  /* Branches are diamond shapes for specialization */
                  <rect x={node.cx - 8} y={node.cy - 8} width="16" height="16" fill={node.color} transform={`rotate(45, ${node.cx}, ${node.cy})`} stroke="#05080e" strokeWidth="2" />
                ) : (
                  /* Leaves are smaller, bright nodes */
                  <circle cx={node.cx} cy={node.cy} r="6" fill={node.color} filter="url(#glow)" />
                )}

                {/* Inline label (small) */}
                <text
                  x={node.cx + (node.cx > 400 ? 16 : -16)}
                  y={node.cy + 4}
                  textAnchor={node.cx > 400 ? 'start' : 'end'}
                  fill={isHovered ? '#fff' : 'rgba(255,255,255,0.6)'}
                  fontSize="12"
                  fontFamily="sans-serif"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                >
                  {node.title.length > 25 ? node.title.slice(0, 25) + '...' : node.title}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating title */}
        <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
          <h1 className="text-6xl font-black tracking-widest uppercase">Education</h1>
          <p className="text-xl font-mono tracking-widest mt-2 ml-1">ACADEMIC & CONTINUOUS LEARNING</p>
        </div>
      </div>

      {/* ─── Detail Panel ─── */}
      <div className="w-[340px] bg-[#020306] border-l border-white/5 flex flex-col shrink-0">
        {activeNode ? (
          <div className="flex-1 p-8 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full" style={{ background: activeNode.color, boxShadow: `0 0 10px ${activeNode.color}` }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: activeNode.color }}>
                {activeNode.type === 'root' ? 'Academic Degree (Root)' : activeNode.type === 'branch' ? 'Specialization (Branch)' : 'Certification (Leaf)'}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
              {activeNode.title}
            </h2>
            
            <div className="text-white/60 font-serif italic mb-6">
              {activeNode.institution}
            </div>

            {activeNode.period && (
              <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-white/80 mb-6 w-max">
                {activeNode.period}
              </div>
            )}

            <div className="w-full h-px bg-white/10 mb-6" />

            <p className="text-white/70 leading-relaxed text-sm">
              {activeNode.description}
            </p>

            {activeNode.url && (
              <a
                href={activeNode.url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 px-4 py-3 rounded text-sm font-mono tracking-widest text-center border border-white/20 hover:bg-white/10 transition-colors"
                style={{ color: activeNode.color }}
              >
                VERIFY CREDENTIAL ↗
              </a>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center opacity-30">
            <div>
              <div className="text-4xl mb-4">🌱</div>
              <p className="font-mono text-xs tracking-widest leading-loose text-white/50">
                HOVER OVER A ROOT, BRANCH, OR LEAF<br/>
                TO VIEW CREDENTIAL DETAILS
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
