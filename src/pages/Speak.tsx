import { useEffect, useRef } from 'react';

const EXPERTISE_TOPICS = [
  {
    icon: '🧠',
    title: 'Large Language Models in Production',
    desc: 'Designing, deploying, and governing LLM systems in regulated enterprise environments. Prompt engineering, RAG pipelines, compliance controls.',
  },
  {
    icon: '🔬',
    title: 'Cross-Domain ML & Metagenomics',
    desc: 'Applying NLP pattern recognition to genomic sequences — a rare transfer of ML intuition across computational biology and software engineering.',
  },
  {
    icon: '⚙️',
    title: 'AI-Driven AIOps & Self-Healing Systems',
    desc: 'Building autonomous anomaly detection, root-cause analysis, and automated remediation for enterprise APIs. From PhD research to production.',
  },
  {
    icon: '🏗️',
    title: 'Enterprise Platform Architecture',
    desc: 'Event-driven microservices, cloud-native migration, and modernizing legacy SOAP/monolith systems to resilient REST ecosystems at scale.',
  },
  {
    icon: '📊',
    title: 'AI in Financial Services',
    desc: 'Responsible AI deployment inside a top-5 global bank. Balancing performance, governance, regulatory controls, and real-time decision intelligence.',
  },
  {
    icon: '🛤️',
    title: 'Career & Research in ML Engineering',
    desc: 'Navigating the intersection of industry engineering and academic research — from HCL to JPMC to PhD and Oxford publications.',
  },
];

const PRESS_BIO = `Vyshak Athreya Bellur Keshavamurthy is a Senior Full-Stack and Platform Engineer at JPMorgan Chase & Co., where he builds production AI systems including an LLM-powered client intelligence platform serving wealth advisors. He is a PhD candidate in Computer Science at the University of the Cumberlands, with research focused on AI-driven self-healing API frameworks. A published co-author in Oxford University Press's Digital Scholarship in the Humanities, Vyshak is recognized for his rare ability to transfer ML intuition across radically different domains — from financial infrastructure to genomic sequence analysis. Outside the terminal, he is an avid marathon runner and adventure traveler who has visited 43 U.S. states and 14 countries.`;

export default function Speak() {
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

  const copyBio = () => {
    navigator.clipboard.writeText(PRESS_BIO);
  };

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-14">
      {/* Header */}
      <div className="section-enter mb-10">
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Speaking & Judging</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            On Stage
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
          Available for technical speaking, panel discussions, and judging roles in AI, ML, and enterprise engineering.
          Reach out via <a href="/contact" className="text-yellow-400 hover:text-yellow-300 transition-colors">Contact</a> to discuss.
        </p>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      {/* Featured Talk */}
      <div className="section-enter mb-12">
        <div className="mb-5 text-xs font-medium tracking-widest text-white/40 uppercase">Featured Engagement</div>
        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="text-xs text-yellow-400/80 mb-1 uppercase tracking-wider">Internal Technical Talk · JPMorgan Chase</div>
              <h2 className="text-lg font-semibold text-white/95 leading-snug">
                "Magic Button: Building a Production LLM System Inside a Regulated Bank"
              </h2>
            </div>
            <span className="shrink-0 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">
              2024
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Presented to an internal audience of engineers and stakeholders at JPMorgan Chase, this talk detailed the architecture
            and delivery of "Magic Button" — an LLM-powered system generating real-time client intelligence summaries for wealth advisors.
            The session covered prompt engineering strategies, integration with internal data pipelines, compliance and governance controls
            required inside a heavily regulated Tier-1 financial institution, and lessons learned scaling a generative AI product from
            prototype to production. The talk explored how enterprise constraints — security, auditability, latency SLAs — shape
            real-world LLM deployment in ways academic benchmarks never surface.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['LLMs', 'RAG', 'Enterprise AI', 'Financial Services', 'Production Systems'].map(t => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Expertise Topics */}
      <div className="section-enter mb-12">
        <div className="mb-5 text-xs font-medium tracking-widest text-white/40 uppercase">Topics I Cover</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE_TOPICS.map((t) => (
            <div
              key={t.title}
              className="section-enter rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] transition"
            >
              <div className="text-2xl mb-3">{t.icon}</div>
              <div className="mb-2 text-sm font-semibold text-white/90 leading-snug">{t.title}</div>
              <p className="text-xs leading-relaxed text-white/55">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Proposed Talks */}
      <div className="section-enter mb-12">
        <div className="mb-5 text-xs font-medium tracking-widest text-white/40 uppercase">Proposed Talk Formats</div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              format: 'Keynote / Conference Talk (30–45 min)',
              title: 'From DNA to Dollars: How ML Pattern Recognition Crosses Domain Boundaries',
              desc: 'A narrative talk connecting metagenomics NLP research with enterprise LLM deployments — arguing that the future of ML belongs to engineers who can operate across radically different problem spaces.',
            },
            {
              format: 'Technical Deep-Dive (45–60 min)',
              title: 'Self-Healing APIs: AI-Driven AIOps from Research to Production',
              desc: 'A hands-on session walking through the ARIA framework — anomaly detection, root-cause analysis, and automated remediation — with live architecture diagrams and real production benchmarks.',
            },
            {
              format: 'Panel / Fireside Chat',
              title: 'Responsible LLMs in Finance: What Nobody Tells You',
              desc: 'A candid conversation on the gap between LLM demos and production reality inside a regulated bank — governance, auditability, latency, and the politics of shipping AI at scale.',
            },
            {
              format: 'Workshop / Judging',
              title: 'AI Hackathon Mentor & Judge',
              desc: 'Available to mentor teams building LLM-powered, AIOps, or cross-domain ML applications. Experienced evaluating both technical depth and practical production-readiness.',
            },
          ].map((p) => (
            <div key={p.title} className="section-enter rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-2 text-xs text-white/40 uppercase tracking-wider">{p.format}</div>
              <div className="mb-2 text-sm font-semibold text-white/90 leading-snug">{p.title}</div>
              <p className="text-xs leading-relaxed text-white/55">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Press Kit */}
      <div className="section-enter">
        <div className="mb-5 text-xs font-medium tracking-widest text-white/40 uppercase">Press Kit</div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 text-sm font-semibold text-white/90">Official Bio (150 words)</div>
            <p className="text-xs leading-relaxed text-white/60 mb-4">{PRESS_BIO}</p>
            <button
              onClick={copyBio}
              id="copy-bio-btn"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
            >
              Copy Bio to Clipboard
            </button>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-3 text-sm font-semibold text-white/90">Assets</div>
              <p className="text-xs leading-relaxed text-white/55 mb-4">
                For headshots, speaker photos, or additional materials, reach out directly. Assets can be provided in print-ready resolution upon request.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="/Vyshak_Bellur_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                id="download-resume-speak"
                className="rounded-xl bg-gradient-to-r from-red-600 via-yellow-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-slate-950 text-center"
              >
                Download CV / Resume
              </a>
              <a
                href="/contact"
                id="contact-speaking"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors text-center"
              >
                Contact for Speaking
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
