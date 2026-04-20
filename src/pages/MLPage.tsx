import { useEffect, useRef } from 'react';

const mlStack = [
  { category: 'Languages & Frameworks', items: ['Java', 'Python', 'TypeScript', 'Spring Boot', 'React'] },
  { category: 'Cloud & Infrastructure', items: ['AWS (EC2, S3, Lambda, RDS)', 'Docker', 'CI/CD pipelines', 'GitHub Actions'] },
  { category: 'ML / AI', items: ['LLM integration', 'RAG systems', 'Prompt engineering', 'Evaluation frameworks', 'Anthropic API'] },
  { category: 'Data & Observability', items: ['PostgreSQL', 'OpenTelemetry', 'Splunk', 'Grafana', 'Datadog'] },
];

const highlights = [
  {
    title: 'Enterprise LLM Patterns',
    body: 'Designing RAG pipelines and LLM orchestration layers for internal tooling at JPMorgan Chase. Focus on context management, evaluation, and enterprise safety.',
    tags: ['Python', 'LLMs', 'RAG', 'AWS'],
  },
  {
    title: 'Self-Healing API Systems',
    body: 'Production-grade circuit breakers, retry logic, and observability hooks across Java microservices. Handles millions of requests with sub-100ms p99 latency.',
    tags: ['Java', 'Spring Boot', 'AWS', 'Observability'],
  },
  {
    title: 'Full-Stack Delivery at Scale',
    body: 'End-to-end feature delivery across React/TypeScript frontends and Java backends. Working in large-scale distributed teams with platform and security constraints.',
    tags: ['React', 'TypeScript', 'Java', 'AWS'],
  },
];

export default function MLPage() {
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
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Engineering</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          ML &amp;{' '}
          <span className="bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
            AWS
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
          Production engineering at JPMorgan Chase — full-stack delivery, cloud infrastructure,
          and practical GenAI systems that actually work at enterprise scale.
        </p>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      {/* Highlights */}
      <div className="grid gap-4 md:grid-cols-3 mb-10">
        {highlights.map((h) => (
          <div key={h.title} className="section-enter rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 text-sm font-medium text-white/90">{h.title}</div>
            <p className="text-sm leading-relaxed text-white/65 mb-4">{h.body}</p>
            <div className="flex flex-wrap gap-1.5">
              {h.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="section-enter">
        <h2 className="mb-4 text-lg font-semibold text-white/90">Stack</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {mlStack.map((group) => (
            <div key={group.category} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 text-xs font-medium tracking-wide text-white/50 uppercase">{group.category}</div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-sm text-white/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
