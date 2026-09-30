import { useState } from 'react';
import apiWorldSpeakingUrl from '../assets/api-world-speaking.jpg';
import cisoNewYorkPanelUrl from '../assets/ciso-new-york-panel.jpg';

const BIO = `Applied AI researcher and Senior Software Engineer at JPMorgan Chase. Published by Oxford University Press. I speak about governed generative AI, agentic security, and reliable production systems.`;

type Engagement = {
  title: string;
  subtitle: string;
  venue: string;
  location: string;
  date: string;
  format: 'Talk' | 'Panel' | 'Workshop';
  duration?: string;
  status: 'featured' | 'upcoming' | 'past';
  abstract: string;
  evidence: Array<{ label: string; href: string }>;
};

/*
 * To add a new talk: just push an object here.
 * - status: 'featured' highlights the most recent engagement
 * - status: 'upcoming' gets featured treatment, 'past' stacks below
 * - format: 'Talk' | 'Panel' | 'Workshop' — shown as a subtle label
 */
const ENGAGEMENTS: Engagement[] = [
  {
    title: 'Attack Surface Expansion Through Generative AI Adoption & Governance',
    subtitle: 'How generative AI changes exposure, data access, monitoring, and governance',
    venue: 'CISO New York 2026',
    location: 'W Hoboken, New Jersey',
    date: 'September 24, 2026',
    format: 'Panel' as const,
    status: 'featured' as const,
    abstract: 'A practitioner panel on hidden risks from generative AI adoption, shadow AI, unmanaged integrations, and governance that keeps pace with a rapidly changing attack surface.',
    evidence: [
      { label: 'Event agenda', href: 'https://ciso-east.coriniumintelligence.com/agenda' },
      { label: 'Speaker list', href: 'https://ciso-east.coriniumintelligence.com/speakers' },
      { label: 'Event announcement', href: 'https://www.linkedin.com/posts/business-of-infosec_cisony-activity-7498379065633021952-BU7q' },
    ],
  },
  {
    title: 'The Latency-vs-Security Curve',
    subtitle: 'Operational Engineering for High-Scale Agentic Architectures',
    venue: 'API World',
    location: 'Santa Clara Convention Center, CA',
    date: 'September 1, 2026',
    format: 'Talk' as const,
    duration: '50 min',
    status: 'past' as const,
    abstract: 'Separating probabilistic LLM exploration from deterministic execution. A layered Guard-Classifier-Verifier pipeline balancing performance with security in regulated environments.',
    evidence: [
      { label: 'Official agenda', href: 'https://apiworld.co/conference/' },
      { label: 'Speaker roster', href: 'https://cloudxconf.com/speakers/' },
    ],
  },
  /*
  {
    title: 'AI Camp Technical Session',
    subtitle: 'Applied Machine Learning and Agentic Systems',
    venue: 'AI Camp',
    location: 'Santa Clara, CA',
    date: 'September 2026 (TBC)',
    format: 'Talk' as const,
    status: 'upcoming' as const,
    abstract: 'Upcoming technical talk focusing on the engineering challenges of deploying agentic systems in production.',
  },
  {
    title: 'Expert Panel on Trustworthy AI',
    subtitle: 'Navigating the Security-Latency Tradeoff',
    venue: 'Industry Panel',
    location: 'Santa Clara, CA',
    date: 'September 2026 (TBC)',
    format: 'Panel' as const,
    status: 'upcoming' as const,
    abstract: 'A deep-dive discussion with industry experts on implementing secure LLM architectures in enterprise environments.',
  },
  */
  {
    title: 'Financial Guardrail Agent',
    subtitle: 'A Security-First Approach to Agentic AI',
    venue: 'JPMorgan Chase Innovation Week',
    location: 'Internal Engineering Conference',
    date: '2026',
    format: 'Talk' as const,
    status: 'past' as const,
    abstract: 'Deterministic Guard–Classifier–Verifier architecture for securing agentic AI in regulated financial environments.',
    evidence: [],
  },
];

const TOPICS = [
  'Building Self-Healing APIs with AI',
  'The Guardian Paradigm: Secure Agentic AI for Regulated Enterprises',
  'Designing AI Systems for Production, Not Prototypes',
  'Beyond Chatbots: Enterprise Applications of Large Language Models',
  'From Observability to Autonomous Operations',
  'Machine Learning Beyond Language: Scripts, Genomes, and Software Systems',
  'Responsible AI in Enterprise Engineering',
];

export default function Speak() {
  const [copiedBio, setCopiedBio] = useState(false);

  const featured = ENGAGEMENTS.filter((e) => e.status === 'featured');
  const upcoming = ENGAGEMENTS.filter((e) => e.status === 'upcoming');
  const past = ENGAGEMENTS.filter((e) => e.status === 'past');

  return (
    <div className="mx-auto max-w-4xl px-5">

      {/* ── Hero: positioning + verifiable conference image ── */}
      <div className="grid gap-6 mt-6 mb-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] md:items-center">
        <div className="flex flex-col justify-center py-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Speaking</h1>
          <p className="text-sm text-white/50 leading-relaxed max-w-md mb-2">{BIO}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(BIO);
              setCopiedBio(true);
              setTimeout(() => setCopiedBio(false), 2000);
            }}
            className="self-start text-[10px] text-white/25 hover:text-white/50 transition-colors"
          >
            {copiedBio ? '✓ Copied' : 'Copy bio'}
          </button>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/30">
          <img
            src={apiWorldSpeakingUrl}
            alt="Vyshak Bellur presenting The Latency-Security Curve at API World 2026"
            width={2000}
            height={1500}
            fetchPriority="high"
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-[10px] font-mono uppercase tracking-[0.12em] text-white/40">
            <span>API World 2026</span>
            <span className="text-amber-300/70">The Latency-Security Curve</span>
          </figcaption>
        </figure>
      </div>

      {/* ── Recent event ── */}
      {featured.map((talk) => (
        <article
          key={talk.title}
          className="relative mb-16 overflow-hidden rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.09] via-white/[0.035] to-transparent p-6 shadow-2xl shadow-black/20 md:p-8"
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-300/[0.07] blur-3xl" aria-hidden="true" />
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                Recent event
              </span>
              <span className="text-xs font-mono text-white/45">{talk.date}</span>
            </div>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <div>
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/75">
                  {talk.format} · {talk.venue}
                </div>
                <h2 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  {talk.title}
                </h2>
                <p className="mt-3 text-base font-light text-white/60 md:text-lg">{talk.subtitle}</p>
                <p className="mt-5 max-w-2xl text-sm leading-[1.75] text-white/50">{talk.abstract}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left md:min-w-44 md:text-right">
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/30">Location</div>
                <div className="mt-1 text-xs font-medium text-white/65">{talk.location}</div>
              </div>
            </div>
            <figure className="mt-7 overflow-hidden rounded-xl border border-white/10 bg-black/20">
              <img
                src={cisoNewYorkPanelUrl}
                alt="Vyshak Bellur participating in the CISO New York 2026 panel discussion"
                width={2000}
                height={1500}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover object-[center_68%]"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-[10px] font-mono uppercase tracking-[0.12em] text-white/40">
                <span>CISO New York 2026</span>
                <span className="text-amber-300/70">Generative AI adoption & governance panel</span>
              </figcaption>
            </figure>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5">
              {talk.evidence.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-xs text-amber-300/75 transition-colors hover:text-amber-200">
                  {item.label} ↗
                </a>
              ))}
            </div>
          </div>
        </article>
      ))}

      {/* ── Upcoming ── */}
      {upcoming.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xl font-bold tracking-tight text-white/95 mb-8 border-b border-white/10 pb-4">Upcoming Engagements</h2>
          <div className="space-y-10">
            {upcoming.map((talk) => (
              <div key={talk.title} className="relative pl-6 md:pl-8 border-l border-white/10">
                <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-amber-900 bg-amber-400 px-2 py-0.5 rounded-sm">
                    {talk.format}
                  </span>
                  <span className="text-xs font-mono text-white/40">{talk.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white/95 leading-tight mb-1">
                  {talk.title}
                </h3>
                <p className="text-base md:text-lg text-white/60 font-light mb-4">{talk.subtitle}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40 mb-4 font-mono">
                  <span>{talk.venue}</span>
                  <span className="text-white/15">·</span>
                  <span>{talk.location}</span>
                  {talk.duration && (
                    <>
                      <span className="text-white/15">·</span>
                      <span>{talk.duration}</span>
                    </>
                  )}
                </div>
                <p className="text-sm leading-[1.7] text-white/50 max-w-2xl">{talk.abstract}</p>
                {talk.evidence.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {talk.evidence.map((item) => (
                      <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-xs text-amber-300/70 hover:text-amber-300 transition-colors">
                        {item.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Past ── */}
      {past.length > 0 && (
        <div className="mb-12">
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-4">Earlier engagements</div>
          {past.map((talk) => (
            <div key={talk.title} className="py-4 border-t border-white/6 last:border-b">
              <h3 className="text-lg font-semibold text-white/85 mb-0.5">{talk.title}</h3>
              <p className="text-sm text-white/40 mb-2">{talk.subtitle}</p>
              <div className="flex flex-wrap items-center gap-x-3 text-xs text-white/30">
                <span>{talk.venue}</span>
                <span className="text-white/10">·</span>
                <span>{talk.date}</span>
              </div>
              {talk.evidence.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {talk.evidence.map((item) => (
                    <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-xs text-amber-300/55 hover:text-amber-300 transition-colors">
                      {item.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Topics ── */}
      <div className="mb-12">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-4">Also speaks on</div>
        <div className="space-y-2">
          {TOPICS.map((topic) => (
            <div key={topic} className="text-sm text-white/45 hover:text-white/70 transition-colors">
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="text-center pb-10">
        <a
          href="/contact"
          className="text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          Invite me to speak, judge, or chair a session →
        </a>
      </div>
    </div>
  );
}
