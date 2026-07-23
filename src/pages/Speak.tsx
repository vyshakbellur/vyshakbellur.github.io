import { useEffect, useRef, useState } from 'react';

const SPEAKING_TOPICS = [
  {
    title: 'Building Self-Healing APIs with AI',
    badges: ['Cloud Engineering', 'AIOps', 'Enterprise AI'],
    abstract: 'Modern cloud platforms generate millions of logs, metrics, traces, and deployment events every day, yet most organizations remain reactive to production failures. This talk explores how machine learning and large language models can transform operational telemetry into actionable intelligence. Drawing from enterprise engineering experience and research into self-healing cloud architectures, the session demonstrates how knowledge graphs, dependency analysis, anomaly detection, and risk-aware automation can reduce incident resolution time while preserving operational safety. Attendees will learn practical architectural patterns for integrating AI into production systems without sacrificing observability, auditability, or human oversight.',
  },
  {
    title: 'The Guardian Paradigm: Secure Agentic AI for Regulated Enterprises',
    badges: ['Agentic AI', 'AI Security', 'Enterprise Architecture'],
    abstract: 'As AI systems evolve from assistants into autonomous agents, traditional software security models must also evolve. This session introduces the Guardian Paradigm, a deterministic governance architecture designed to supervise AI agents operating in regulated environments. The talk covers prompt injection defenses, tool governance, intent verification, progressive validation, and policy-driven execution. Rather than trusting an AI model to make security decisions, the architecture separates probabilistic reasoning from deterministic enforcement, enabling secure adoption of agentic AI in enterprise systems.',
  },
  {
    title: 'What Ancient Scripts Taught Me About Cloud Telemetry',
    badges: ['Machine Learning', 'Digital Humanities', 'Applied AI'],
    abstract: 'What do ancient Ethiopian manuscripts, microbial DNA sequences, and cloud microservice telemetry have in common? They are all structured sequences that can be analyzed using similar machine learning principles. Drawing from published research in historical manuscript analysis, genomic sequence modeling, and enterprise AI systems, this talk explores how representation learning, embeddings, similarity metrics, and anomaly detection transfer across seemingly unrelated domains.',
  },
  {
    title: 'Designing AI Systems for Production, Not Prototypes',
    badges: ['LLMs', 'Software Engineering', 'MLOps'],
    abstract: 'Many AI demonstrations work well in isolation but fail under the demands of production systems. This talk discusses the engineering principles required to move beyond proof-of-concept applications toward reliable enterprise AI. Topics include architecture design, observability, evaluation, governance, deployment strategies, and operational guardrails.',
  },
  {
    title: 'Beyond Chatbots: Enterprise Applications of Large Language Models',
    badges: ['LLMs', 'Enterprise AI', 'Applied Machine Learning'],
    abstract: 'Large language models are rapidly becoming foundational components of enterprise software, but successful adoption requires much more than conversational interfaces. This session explores practical architectural patterns for integrating LLMs into enterprise workflows, including intelligent search, operational assistance, incident management, decision support, and workflow automation.',
  },
  {
    title: 'From Observability to Autonomous Operations',
    badges: ['Cloud Platforms', 'DevOps', 'AI Infrastructure'],
    abstract: 'Modern observability platforms provide unprecedented visibility into production systems, yet engineers often remain responsible for manually correlating alerts and diagnosing failures. This talk explores how AI can augment traditional observability by connecting logs, metrics, traces, deployment history, and service dependencies into actionable operational intelligence.',
  },
  {
    title: 'Machine Learning Beyond Language: Lessons from Scripts, Genomes, and Software Systems',
    badges: ['Machine Learning', 'AI Research'],
    abstract: 'Machine learning techniques developed for natural language processing are increasingly being applied to biological sequences, historical manuscripts, source code, and distributed systems. This presentation examines the common statistical principles underlying these seemingly unrelated domains, including representation learning, sequence modeling, metric learning, and anomaly detection.',
  },
  {
    title: 'Responsible AI in Enterprise Engineering',
    badges: ['AI Governance', 'Security', 'Compliance'],
    abstract: 'Responsible AI requires more than model accuracy. Enterprise AI systems must satisfy requirements for transparency, security, auditability, governance, and regulatory compliance. This talk discusses architectural approaches for building trustworthy AI systems, including human-in-the-loop decision making, policy enforcement, monitoring, explainability, and risk-based validation.',
  },
];

const INVITED_TALKS = [
  {
    event: 'JPMorgan Chase Innovation Week 2026',
    title: 'Financial Guardrail Agent: A Security-First Approach to Agentic AI',
    audience: 'Internal engineering cohorts, application owners, and technology leadership stakeholders.',
    overview: 'Presented a deterministic Guard\u2013Classifier\u2013Verifier architecture for securing agentic AI workflows in regulated financial environments. The session demonstrated how policy enforcement, intent verification, and human approval mechanisms can reduce the risks associated with autonomous tool-calling agents while maintaining auditability and compliance.',
    badges: ['Agentic AI', 'AI Governance', 'Runtime Security'],
    year: '2026',
  },
];

const PRESS_BIO = `Vyshak Athreya Bellur Keshavamurthy is a Senior Full-Stack and Platform Engineer at JPMorgan Chase & Co., where he builds production AI systems including an LLM-powered client intelligence platform serving wealth advisors. He is a PhD candidate in Computer Science at the University of the Cumberlands, with research focused on AI-driven self-healing API frameworks. A published co-author in Oxford University Press's Digital Scholarship in the Humanities, Vyshak is recognized for his rare ability to transfer ML intuition across radically different domains from financial infrastructure to genomic sequence analysis. Outside the terminal, he is an avid marathon runner and adventure traveler who has visited 43 U.S. states and 14 countries.`;

export default function Speak() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedBio, setCopiedBio] = useState(false);
  const [expandedInvited, setExpandedInvited] = useState<number | null>(0);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) el.querySelectorAll('.section-enter').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const copyTopic = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const t = SPEAKING_TOPICS[idx];
    const text = `${t.title}\n\n${t.badges.join(' \u2022 ')}\n\nAbstract\n\n${t.abstract}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyBio = () => {
    navigator.clipboard.writeText(PRESS_BIO);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-10">
      {/* Header */}
      <div className="section-enter mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">Speaking</span>
        </h1>
        <p className="mt-2 max-w-2xl text-xs leading-[1.65] text-white/70">
          Available for keynotes, technical sessions, panel discussions, and judging roles.{' '}
          <a href="/contact" className="text-yellow-400 hover:text-yellow-300 transition-colors">Get in touch →</a>
        </p>
        <div className="mt-3 h-px w-full bg-white/14" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── LEFT: Invited + Topics (2/3 width) ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Invited Talks — Collapsible */}
          <div className="section-enter">
            <h2 className="text-sm font-semibold text-white/85 mb-3 uppercase tracking-widest">Invited Talks</h2>
            <div className="space-y-2">
              {INVITED_TALKS.map((talk, idx) => (
                <div key={talk.title} className="rounded-xl border border-yellow-400/20 bg-yellow-400/[0.04] overflow-hidden">
                  <button
                    onClick={() => setExpandedInvited(expandedInvited === idx ? null : idx)}
                    className="w-full px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-yellow-400/[0.03] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-yellow-400/60 mb-0.5 uppercase tracking-wider font-medium">{talk.event} · {talk.year}</div>
                      <h3 className="text-sm font-semibold text-white/90 leading-snug truncate">{talk.title}</h3>
                    </div>
                    <svg className={`w-4 h-4 shrink-0 text-white/40 transition-transform duration-200 ${expandedInvited === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedInvited === idx && (
                    <div className="px-5 pb-4 border-t border-yellow-400/10 pt-3 space-y-2">
                      <div>
                        <span className="text-[10px] font-medium tracking-wider text-white/45 uppercase">Audience</span>
                        <p className="text-xs text-white/75 mt-0.5">{talk.audience}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-medium tracking-wider text-white/45 uppercase">Overview</span>
                        <p className="text-xs leading-[1.65] text-white/75 mt-0.5">{talk.overview}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {talk.badges.map((b) => (
                          <span key={b} className="rounded-full border border-white/14 bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/60">{b}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Speaking Topics — Collapsible */}
          <div className="section-enter">
            <h2 className="text-sm font-semibold text-white/85 mb-2 uppercase tracking-widest">Speaking Topics</h2>
            <p className="text-[10px] text-white/50 mb-3">Click to expand. Use Copy to export any topic into your event schedule.</p>
            <div className="space-y-1.5">
              {SPEAKING_TOPICS.map((topic, idx) => (
                <div key={topic.title} className="rounded-xl border border-white/12 bg-white/[0.04] overflow-hidden">
                  <button
                    onClick={() => setExpandedTopic(expandedTopic === idx ? null : idx)}
                    className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-white/35 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                      <h3 className="text-xs font-semibold text-white/85 leading-snug truncate">{topic.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => copyTopic(idx, e)}
                        className="rounded-md border border-white/14 bg-white/[0.06] px-2 py-1 text-[10px] font-medium text-white/60 hover:bg-white/[0.10] hover:text-white/85 transition-colors"
                      >
                        {copiedIdx === idx ? '✓' : 'Copy'}
                      </button>
                      <svg className={`w-3.5 h-3.5 text-white/35 transition-transform duration-200 ${expandedTopic === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {expandedTopic === idx && (
                    <div className="px-4 pb-4 border-t border-white/8 pt-3">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {topic.badges.map((b) => (
                          <span key={b} className="rounded-full border border-white/14 bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/60">{b}</span>
                        ))}
                      </div>
                      <p className="text-xs leading-[1.65] text-white/75">{topic.abstract}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Speaker Bio (1/3 width) ── */}
        <div className="section-enter space-y-4">
          <h2 className="text-sm font-semibold text-white/85 uppercase tracking-widest">Speaker Bio</h2>

          <div className="rounded-xl border border-white/14 bg-white/[0.06] p-5">
            <p className="text-xs leading-[1.65] text-white/75 mb-4">{PRESS_BIO}</p>
            <button
              onClick={copyBio}
              id="copy-bio-btn"
              className="w-full rounded-lg border border-white/14 bg-white/[0.06] px-3 py-2 text-[10px] font-semibold text-white/75 hover:bg-white/[0.10] transition-colors"
            >
              {copiedBio ? '✓ Copied to Clipboard' : 'Copy Bio'}
            </button>
          </div>

          <div className="rounded-xl border border-white/14 bg-white/[0.06] p-5 space-y-3">
            <a
              href="/Vyshak_Bellur_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r from-red-600 via-yellow-500 to-red-500 px-4 py-2.5 text-xs font-bold text-slate-950"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Speaker Bio PDF
            </a>
            <a
              href="/contact"
              className="flex items-center justify-center w-full rounded-lg border border-white/14 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white/75 hover:bg-white/[0.10] transition-colors"
            >
              Invite to Speak
            </a>
          </div>

          <div className="rounded-xl border border-white/14 bg-white/[0.06] p-5">
            <div className="text-[10px] font-medium tracking-widest uppercase text-white/45 mb-2">Available For</div>
            <div className="flex flex-wrap gap-1.5">
              {['Keynotes', 'Technical Sessions', 'Panel Discussions', 'Hackathon Judging', 'ML Mentorship'].map(t => (
                <span key={t} className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-2.5 py-0.5 text-[10px] text-yellow-300">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
