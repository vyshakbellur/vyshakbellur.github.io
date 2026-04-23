import { useEffect, useRef } from 'react';

const pubs = [
  {
    title: 'Computational Analysis of Ancient Script Similarity Using Graph Theory',
    journal: 'Digital Scholarship in the Humanities',
    publisher: 'Oxford University Press',
    year: '2024',
    quarter: 'Q1',
    coAuthors: ['Prof. Sam Kassegne'],
    abstract:
      'Proved that structural and visual pattern analysis algorithms can transcend traditional linguistic constraints. By utilizing spectral clustering and graph theory, this research successfully decoded structural similarities within ancient scripts—providing an underlying algorithmic blueprint that is directly analogous to UI behavior mapping and log anomaly detection in modern enterprise systems.',
    tags: ['Graph Theory', 'Computational Linguistics', 'NLP', 'Python'],
    href: 'https://academic.oup.com/dsh',
    badge: 'Oxford · OUP 2024',
    badgeColor: 'bg-red-400/20 text-red-300 border-red-400/30',
  },
  {
    title: 'Network Modeling of Human Gut Microbiome Dynamics',
    journal: 'MS Thesis',
    publisher: 'San Diego State University',
    year: '2019',
    quarter: '',
    coAuthors: ['Prof. Forest Rohwer'],
    abstract:
      'Graph-based analysis of microbial co-occurrence patterns in the human gut using metagenomic sequencing data. Explored how network topology shifts under dietary interventions, establishing a computational framework for microbiome surveillance.',
    tags: ['Bioinformatics', 'Network Science', 'Python', 'R'],
    href: 'https://www.proquest.com/openview/194737039beaa878147991fc6e8aa954/1?pq-origsite=gscholar&cbl=18750&diss=y',
    badge: 'SDSU · 2019',
    badgeColor: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  },
];

export default function Research() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-14">
      <div className="section-enter mb-10">
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Research</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Research & Literature
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
          Academic research spanning computational linguistics, graph theory, and microbiome network modeling.
        </p>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      <div className="section-enter mb-14">
        <h2 className="mb-4 text-xl font-bold text-white/90">Primary Research Focus</h2>
        <div className="rounded-2xl border border-white/10 bg-[#0a0f18] p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-amber-400 mb-3">Cross-Domain Pattern Recognition via Machine Learning</h3>
          <p className="text-sm leading-relaxed text-white/70 mb-4">
            My core thesis explores how mathematically rigorous pattern-detection architectures—such as State Space Models, Spectral Clustering, and Hierarchical MoE—can be universally applied to extract latent structural signals from extreme noise.
          </p>
          <ul className="list-disc list-inside text-sm text-white/60 space-y-2">
            <li><strong className="text-white/80">Biological Sequence Discovery:</strong> Harvesting highly-noisy metagenomic environments for evolutionary sequence patterns.</li>
            <li><strong className="text-white/80">Linguistic Topologies:</strong> Decoding the visual and graphical grammar of unrecognized ancient texts using adjacency-matrix formations.</li>
            <li><strong className="text-white/80">Enterprise Telemetry:</strong> Hardening mathematical anomaly detection into scalable architectures for FinTech fraud and UI state corruption.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="section-enter mb-1 text-xl font-bold text-white/90">Published Literature</h2>
        {pubs.map((p) => (
          <div
            key={p.title}
            className="section-enter rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/[0.07]"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${p.badgeColor}`}>
                {p.badge}
              </span>
              <span className="text-xs text-white/40">{p.journal}</span>
            </div>

            <h2 className="mb-2 text-base font-semibold leading-snug text-white/95">{p.title}</h2>

            <p className="mb-1 text-xs text-white/50">
              With {p.coAuthors.join(', ')} &mdash; {p.publisher}{p.quarter ? `, ${p.quarter} ${p.year}` : `, ${p.year}`}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-white/65">{p.abstract}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>

            {p.href && (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-xs text-white/50 hover:text-white/90 transition-colors"
              >
                View publication ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
