import { useState } from 'react';

// Data mapped for the explicit CRT Display readout
const NODE_DATA: Record<string, any> = {
  'ubs': {
    company: 'UBS (via HCL)',
    role: 'Software Engineer',
    period: 'Aug 2014 – May 2018',
    commits: [
      'Engineered Enterprise HR automation frameworks (Java Spring Boot, MySQL)',
      'Reduced onboarding and background-check effort by ~70%',
      'Designed extensible schemas and front-end workflows for employee platforms',
      'Developed and maintained internal core systems and database architectures',
      'Scaled back-end workflows supporting multi-tenant platform teams'
    ]
  },
  'sdsu': {
    company: 'SDSU Research Foundation',
    role: 'Research Software Developer',
    period: '2019 – 2020',
    commits: [
      'Deployed CIBER Portal — robust program CMS empowering non-technical staff',
      'Engineered bioinformatics data pipelines improving ingestion scalability',
      'Spearheaded applied research overlapping SWE with ML data workflows',
    ]
  },
  'synchrony': {
    company: 'Synchrony',
    role: 'Senior Software Engineer',
    period: 'Jun 2018 – Dec 2021',
    commits: [
      'Architected event-driven microservices processing 1.2M+ tx/day',
      'Achieved sub-50ms latency utilizing Kafka, RabbitMQ, and Redis',
      'Built a reusable React UI component library adopted across enterprise teams',
    ]
  },
  'ford': {
    company: 'Ford Motor Co.',
    role: 'Software Consultant',
    period: 'Mar 2021 – Dec 2022',
    commits: [
      'Key developer on the EV Beta platform onboarding ~15k users across the U.S.',
      'Full-stack delivery via React, TypeScript, Spring Boot, and MySQL',
      'Masterminded integrations with Splunk and Amplitude for observability pipelines',
    ]
  },
  'walmart': {
    company: 'Walmart Global Tech',
    role: 'Software Engineer',
    period: 'Dec 2022 – Jun 2023',
    commits: [
      'Built React analytics dashboards isolating shopper behavior & channel metrics',
      'Enforced strict TDD universally with Jest, Cypress, and JUnit',
      'Implemented complex role and region-based access control inside systems',
    ]
  },
  'jpmc': {
    company: 'JPMorgan Chase & Co.',
    role: 'Senior Full-Stack Engineer',
    period: 'Jun 2023 – Present',
    commits: [
      'Spearheading modernization of Investment Discovery APIs (SOAP → REST)',
      'Catapulted test coverage from 18% to 80%, securing zero P1 incidents in 2025',
      'Architected "Magic Button" — an LLM tool delivering wealth intelligence',
      'Owned critical TLS and ADFS certificate lifecycle rotation across prod',
    ]
  }
};

// Beautiful Git-Graph Topology
const SVG_NODES = [
  { id: 'jpmc', y: 60, x: 40, color: '#38bdf8', label: 'JPMorgan Chase & Co.' },
  { id: 'walmart', y: 240, x: 160, color: '#f472b6', label: 'Walmart Global Tech' },
  { id: 'ford', y: 330, x: 100, color: '#4ade80', label: 'Ford Motor Co.' },
  { id: 'synchrony', y: 450, x: 40, color: '#38bdf8', label: 'Synchrony' },
  { id: 'sdsu', y: 540, x: 100, color: '#fbbf24', label: 'SDSU Research' },
  { id: 'ubs', y: 630, x: 40, color: '#38bdf8', label: 'UBS' }
];

const EDGES = [
  // Solid Blue Trunk connecting all core nodes continuously
  // (Note: 40.01 fractional offset prevents Webkit SVG clipping bugs for purely vertical filter lines)
  { start: 'trunk_bottom', end: 'trunk_top', color: '#38bdf8', path: 'M 40 680 L 40.01 0' },

  // Yellow Fork & Merge (SDSU)
  { start: 'ubs', end: 'sdsu_merge', color: '#fbbf24', path: 'M 40 630 L 100 570 L 100 510 L 40 450' },

  // Green Fork & Merge (Ford)
  { start: 'synchrony', end: 'ford_merge', color: '#4ade80', path: 'M 40 450 L 100 390 L 100 120 L 40 60' },

  // Pink Fork & Merge (Walmart) branching off Green
  { start: 'ford', end: 'walmart_merge', color: '#f472b6', path: 'M 100 330 L 160 270 L 160 210 L 100 150' }
];

export default function Experience() {
  const [selectedNode, setSelectedNode] = useState('jpmc');

  const selected = NODE_DATA[selectedNode];
  const selectedSvgNode = SVG_NODES.find(n => n.id === selectedNode);
  const color = selectedSvgNode?.color || '#38bdf8';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen lg:max-h-screen bg-[#050505] text-[#c9d1d9] font-mono lg:overflow-hidden items-center justify-center px-4 lg:px-12 py-8 lg:py-0 gap-8 lg:gap-12">
      
      {/* Scrollbar Physical Override Injection */}
      <style>{`
        .holo-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .holo-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .holo-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 255, 0, 0.4);
          border-radius: 4px;
        }
        .holo-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(51, 255, 0, 0.8);
        }
      `}</style>
      
      {/* ── LHS: Strict 45-Degree Angular SVG Graph ── */}
      <div className="order-2 lg:order-1 w-full lg:w-1/2 flex items-center justify-center lg:justify-end pr-0 lg:pr-12 min-h-[500px]">
        
        <svg viewBox="0 0 520 680" className="w-full max-w-[520px] h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.03)]">
          <defs>
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Strict Geometric Edges (L commands instead of C) */}
          {EDGES.map((edge, idx) => (
            <path 
              key={`edge-${idx}`}
              d={edge.path}
              fill="none"
              stroke={edge.color}
              strokeWidth="4"
              filter="url(#neonGlow)"
              className="opacity-80 transition-opacity duration-300"
              strokeLinejoin="round" 
              strokeLinecap="round"
            />
          ))}

          {/* 2. Interactive Nodes and Typography */}
          {SVG_NODES.map((node) => {
            const isSelected = selectedNode === node.id;
            return (
              <g 
                key={node.id} 
                onClick={() => setSelectedNode(node.id)}
                className="cursor-pointer group"
              >
                <circle cx={node.x} cy={node.y} r="20" fill="transparent" />
                
                <circle 
                  cx={node.x} cy={node.y} r={isSelected ? "9" : "6"} 
                  fill={node.color}
                  stroke="#050505" strokeWidth="3"
                  filter={isSelected ? "url(#neonGlow)" : ""}
                  className="transition-all duration-300 group-hover:scale-125"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />

                <text 
                  x="210" y={node.y + 6}
                  fill={isSelected ? '#ffffff' : '#8b949e'}
                  fontSize={isSelected ? '16' : '15'}
                  fontWeight={isSelected ? '800' : '500'}
                  className="font-mono tracking-tight transition-all duration-300"
                  style={isSelected ? { textShadow: `0 0 15px ${node.color}` } : {}}
                >
                  {node.label}
                </text>
                
                <line 
                  x1={node.x + 15} y1={node.y} 
                  x2="195" y2={node.y} 
                  stroke={node.color} 
                  strokeWidth="1" 
                  strokeDasharray="3 3"
                  className={`transition-opacity duration-300 ${isSelected ? 'opacity-40' : 'opacity-10'}`}
                />
              </g>
            );
          })}
        </svg>

      </div>


      {/* ── RHS: Dynamic Holographic Data HUD ── */}
      <div className="order-1 lg:order-2 w-full lg:w-1/2 flex flex-col items-center justify-center h-full">
        
        <div 
          className="w-full max-w-[550px] flex flex-col rounded-2xl bg-[#06080D]/60 backdrop-blur-3xl overflow-hidden relative transition-all duration-500 border border-white/5 shadow-2xl"
          style={{ 
            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), inset 0 0 20px ${color}15` 
          }}
        >
          {/* Accent Header Line */}
          <div className="h-1.5 w-full transition-colors duration-500" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }} />
          
          <div className="flex flex-col p-8 lg:p-10 z-10 relative">
            {/* Background Glow */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: color }}
            />
            
            {selected && (
              <div className="flex flex-col z-20">
                <h3 
                  className="text-2xl font-black tracking-widest uppercase mb-2 transition-colors duration-500"
                  style={{ color: color, textShadow: `0 0 15px ${color}60` }}
                >
                  {selected.company}
                </h3>
                
                <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6">
                  <span className="text-sm font-semibold tracking-wide text-white/90">{selected.role}</span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-sm bg-white/5 text-white/50 border border-white/5">{selected.period}</span>
                </div>

                <ul className="space-y-5">
                  {selected.commits.map((commit: string, i: number) => (
                    <li key={i} className="flex gap-4 items-start text-sm leading-relaxed text-[#8b949e]">
                      <svg className="w-5 h-5 mt-0.5 shrink-0 transition-colors duration-500" style={{ color: color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
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
  );
}
