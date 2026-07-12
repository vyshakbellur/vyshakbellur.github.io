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
      'Machine Learning Techniques for Identification of Commonalities and Shared Origin of Language Scripts',
    journal: 'MS Thesis',
    publisher: 'San Diego State University',
    year: '2019',
    coAuthors: [],
    abstract:
      'Graph-based analysis of microbial co-occurrence patterns in the human gut using metagenomic sequencing data. Explored how network topology shifts under dietary interventions, establishing a computational framework for microbiome surveillance.',
    tags: ['Bioinformatics', 'Network Science', 'Python', 'R'],
    href: 'https://www.proquest.com/openview/194737039beaa878147991fc6e8aa954/1?pq-origsite=gscholar&cbl=18750&diss=y',
    badge: 'SDSU · 2019',
    badgeColor: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  },
];

const ACTIVE_THREADS = [
  {
    label: 'Biological Sequence Discovery',
    desc: 'Harvesting highly-noisy metagenomic environments for evolutionary sequence patterns.',
  },
  {
    label: 'Linguistic Topologies',
    desc: 'Decoding the visual and graphical grammar of unrecognized ancient texts using adjacency-matrix formations.',
  },
  {
    label: 'Enterprise Telemetry',
    desc: 'Hardening mathematical anomaly detection into scalable architectures for FinTech fraud and UI state corruption.',
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
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-8">
      {/* Compact Header */}
      <div className="section-enter mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white/95 md:text-3xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Research &amp; Literature
          </span>
        </h1>
        <div className="mt-3 h-px w-full bg-white/10" />
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* ── LEFT: Published Literature ── */}
        <div className="section-enter">
          <div className="mb-3 text-xs font-medium tracking-widest text-white/40 uppercase">Published Literature</div>
          <div className="flex flex-col gap-3">
            {pubs.map((p, idx) => {
              const isOpen = expanded === idx;
              return (
                <div
                  key={p.title}
                  className="section-enter rounded-xl border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.05]"
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
                        <span className="text-[10px] text-white/35">{p.journal}</span>
                      </div>
                      <h3 className="text-xs font-semibold leading-snug text-white/90 line-clamp-2">{p.title}</h3>
                      <p className="mt-1 text-[10px] text-white/45">
                        {p.coAuthors.length > 0
                          ? `With ${p.coAuthors.join(', ')} — ${p.publisher}, ${p.year}`
                          : `${p.publisher}, ${p.year}`}
                      </p>
                    </div>
                    <span className="shrink-0 mt-1 text-white/30 text-xs transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▾
                    </span>
                  </button>

                  {/* Expanded details */}
                  {isOpen && (
                    <div className="px-5 pb-4 border-t border-white/5 pt-3">
                      <p className="text-xs leading-relaxed text-white/55 mb-3">{p.abstract}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-px text-[10px] text-white/45">
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-white/50 hover:text-white/90 transition-colors"
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
          <div className="mb-3 text-xs font-medium tracking-widest text-white/40 uppercase">Active Research Initiatives</div>
          <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.03] p-5">
            <h3 className="text-sm font-bold text-amber-400 mb-2">Cross-Domain Pattern Recognition via Machine Learning</h3>
            <p className="text-xs leading-relaxed text-white/60 mb-4">
              My core thesis explores how mathematically rigorous pattern-detection architectures—such as State Space Models, Spectral Clustering, and Hierarchical MoE—can be universally applied to extract latent structural signals from extreme noise.
            </p>
            <div className="space-y-2.5">
              {ACTIVE_THREADS.map((t) => (
                <div key={t.label} className="rounded-lg border border-white/6 bg-white/[0.03] px-4 py-3">
                  <div className="text-xs font-semibold text-white/80 mb-0.5">{t.label}</div>
                  <p className="text-[11px] leading-relaxed text-white/50">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
