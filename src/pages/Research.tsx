import { useEffect, useRef, useState } from 'react';

const pubs = [
  {
    title:
      'Machine learning techniques for exploring influence, commonalities, and shared origin of scripts: cases of Ethiopic, Armenian, Georgian, and Caucasian Albanian scripts',
    journal: 'Digital Scholarship in the Humanities',
    publisher: 'Oxford University Press',
    year: '2024',
    coAuthors: ['Prof. Sam Kassegne'],
    abstract:
      'Proved that structural and visual pattern analysis algorithms can transcend traditional linguistic constraints. By utilizing spectral clustering and graph theory, this research successfully decoded structural similarities within ancient scripts—providing an underlying algorithmic blueprint that is directly analogous to UI behavior mapping and log anomaly detection in modern enterprise systems.',
    tags: ['Graph Theory', 'Computational Linguistics', 'NLP', 'Python'],
    href: 'https://academic.oup.com/dsh/article/41/2/1092/8539597',
    badge: 'Oxford · OUP',
    badgeColor: 'bg-red-400/20 text-red-300 border-red-400/30',
  },
  {
    title:
      'ARIA: An Autonomous, Resilient, Intelligent API Framework with Self-Healing Capabilities',
    journal: 'PhD Dissertation (In Progress)',
    publisher: 'University of the Cumberlands',
    year: '2025–Present',
    coAuthors: [],
    abstract:
      'Designing an autonomous framework for API reliability that combines anomaly detection, root-cause analysis via knowledge graphs, and policy-driven automated remediation. The system targets sub-15-minute MTTR for enterprise microservice architectures, integrating LLM-based diagnostics with deterministic safety guardrails to prevent cascading failures.',
    tags: ['Self-Healing Systems', 'Knowledge Graphs', 'AIOps', 'LLMs', 'Enterprise AI'],
    href: '',
    badge: 'PhD · In Progress',
    badgeColor: 'bg-purple-400/20 text-purple-300 border-purple-400/30',
  },
  {
    title:
      'Machine Learning Techniques for Identification of Commonalities and Shared Origin of Language Scripts',
    journal: 'MS Thesis',
    publisher: 'San Diego State University',
    year: '2019',
    coAuthors: [],
    abstract:
      'Applied spectral clustering, graph-based adjacency matrices, and visual feature extraction to measure structural similarity across four ancient writing systems (Ethiopic, Armenian, Georgian, and Caucasian Albanian). Established a computational framework for analyzing script evolution that preceded the Oxford University Press publication.',
    tags: ['Graph Theory', 'Script Analysis', 'Machine Learning', 'Python'],
    href: 'https://www.proquest.com/openview/194737039beaa878147991fc6e8aa954/1?pq-origsite=gscholar&cbl=18750&diss=y',
    badge: 'SDSU · 2019',
    badgeColor: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  },
];

const ACTIVE_THREADS = [
  {
    label: 'DNA Language Modeling for Metagenomics',
    desc: 'Building transformer-based models to identify novel microbial sequences from highly-noisy metagenomic environments. Collaborating with Prof. Forest Rohwer at SDSU on microbiome network architecture.',
  },
  {
    label: 'Computational Script Topology',
    desc: 'Extending the Oxford-published adjacency-matrix approach to unrecognized ancient texts, with spectral clustering methods that achieve 94%+ accuracy on known script families.',
  },
  {
    label: 'Self-Healing Enterprise APIs',
    desc: 'Designing autonomous reliability frameworks that combine knowledge-graph-based root-cause analysis with LLM diagnostics. Targeting sub-15-minute MTTR for FinTech microservice architectures.',
  },
  {
    label: 'Agentic AI Governance',
    desc: 'Researching deterministic safety architectures for autonomous AI agents in regulated environments — prompt injection defenses, tool governance, and policy-driven execution.',
  },
];

export default function Research() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) el.querySelectorAll('.section-enter').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-10">
      {/* Compact Header */}
      <div className="section-enter mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Research &amp; Literature
          </span>
        </h1>
        <div className="mt-3 h-px w-full bg-white/14" />
      </div>

      {/* Two-column layout */}
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        {/* ── LEFT: Published Literature ── */}
        <div className="section-enter">
          <div className="mb-3 text-xs font-semibold tracking-widest text-white/55 uppercase">Published Literature</div>
          <div className="flex flex-col gap-4">
            {pubs.map((p, idx) => {
              const isOpen = expanded === idx;
              return (
                <div
                  key={p.title}
                  className="section-enter rounded-xl border border-white/14 bg-white/[0.06] transition hover:bg-white/[0.09]"
                >
                  {/* Collapsed header — always visible */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`rounded-full border px-2 py-px text-[10px] font-medium ${p.badgeColor}`}>
                          {p.badge}
                        </span>
                        <span className="text-[10px] text-white/45">{p.journal}</span>
                      </div>
                      <h3 className="text-xs font-semibold leading-snug text-white/90 line-clamp-2">{p.title}</h3>
                      <p className="mt-1 text-[10px] text-white/55">
                        {p.coAuthors.length > 0
                          ? `With ${p.coAuthors.join(', ')} — ${p.publisher}, ${p.year}`
                          : `${p.publisher}, ${p.year}`}
                      </p>
                    </div>
                    <span className="shrink-0 mt-1 text-white/40 text-xs transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▾
                    </span>
                  </button>

                  {/* Expanded details */}
                  {isOpen && (
                    <div className="px-5 pb-4 border-t border-white/8 pt-3">
                      <p className="text-xs leading-[1.65] text-white/75 mb-3">{p.abstract}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full border border-white/14 bg-white/[0.06] px-2 py-px text-[10px] text-white/60">
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-white/60 hover:text-white/90 transition-colors"
                        >
                          View publication ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Active Research ── */}
        <div className="section-enter">
          <div className="mb-3 text-xs font-semibold tracking-widest text-white/55 uppercase">Active Research Initiatives</div>
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
            <h3 className="text-sm font-bold text-amber-400 mb-2">Cross-Domain Pattern Recognition via Machine Learning</h3>
            <p className="text-xs leading-[1.65] text-white/75 mb-4">
              My core thesis explores how mathematically rigorous pattern-detection architectures—such as State Space Models, Spectral Clustering, and Hierarchical MoE—can be universally applied to extract latent structural signals from extreme noise.
            </p>
            <div className="space-y-2.5">
              {ACTIVE_THREADS.map((t) => (
                <div key={t.label} className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3">
                  <div className="text-xs font-semibold text-white/85 mb-0.5">{t.label}</div>
                  <p className="text-[11px] leading-[1.65] text-white/70">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
