import { useState } from 'react';
import apiWorldSpeakingUrl from '../assets/api-world-speaking.jpg';
import cisoNewYorkPanelUrl from '../assets/ciso-new-york-panel.jpg';

const BIO = `Applied AI researcher and Senior Software Engineer at JPMorgan Chase. Published by Oxford University Press. I speak and judge work across governed generative AI, agentic security, and reliable production systems.`;

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

type JudgingEngagement = {
  organization: string;
  role: string;
  date: string;
  description: string;
  links: Array<{ label: string; href: string }>;
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

const JUDGING: JudgingEngagement[] = [
  {
    organization: 'Globee Awards for Business',
    role: 'Judge',
    date: '2026 · Completed',
    description: 'Reviewed and scored 50 award submissions. Globee issued a verified judge credential and includes my name and company on its official 2026 judges roster.',
    links: [
      { label: 'Official judges roster', href: 'https://globeeawards.com/2026-judges-business-awards/' },
    ],
  },
  {
    organization: 'NASA Space Apps Yonkers',
    role: 'Judge',
    date: 'November 14–15, 2026',
    description: 'Appointed to evaluate projects at the Yonkers local event for the 2026 NASA International Space Apps Challenge.',
    links: [
      { label: 'Appointment announcement', href: 'https://spaceappsyonkers.org/about/press-release/nasa-space-apps-yonkers-appoints-vyshak-athreya-bellur-keshavamurthy-as-judge-in-2026' },
      { label: 'Event page', href: 'https://www.spaceappschallenge.org/2026/local-events/yonkers/' },
    ],
  },
];

const TOPICS = [
  'Governed generative AI in regulated environments',
  'Secure and reliable agentic systems',
  'Designing production AI beyond prototypes',
  'AI adoption, trust, and human behavior',
  'Engineering controls for enterprise AI',
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
          <h1 className="mb-4 text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">Speaking &amp; Judging</h1>
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

      {/* ── Selected speaking ── */}
      {featured.map((talk) => (
        <article
          key={talk.title}
          className="mb-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 md:p-8"
        >
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="text-xs text-white/45">{talk.venue}</span>
              <span className="text-white/15">·</span>
              <span className="text-xs text-white/45">{talk.date}</span>
            </div>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <div>
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/75">
                  {talk.format}
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

      {/* ── Judging ── */}
      <section className="mb-16 border-t border-white/10 pt-10" aria-labelledby="judging-heading">
        <div className="mb-8 max-w-2xl">
          <h2 id="judging-heading" className="text-2xl font-semibold tracking-[-0.025em] text-white/95 md:text-3xl">Judging</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/45">
            Selected technical and innovation programs where I evaluate the work of others.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {JUDGING.map((item) => (
            <article key={item.organization} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4 text-xs text-white/35">
                <span>{item.role}</span>
                <span>{item.date}</span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white/90">{item.organization}</h3>
              <p className="mt-3 text-sm leading-[1.7] text-white/50">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/8 pt-4">
                {item.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-xs text-white/45 transition-colors hover:text-white/80">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

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
        <div className="mb-4 text-xs font-medium text-white/35">Selected topics</div>
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
          Discuss a talk, panel, judging role, or collaboration →
        </a>
      </div>
    </div>
  );
}
