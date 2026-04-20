import { useEffect, useRef } from 'react';

const certs = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    status: 'In Progress',
    statusColor: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
    desc: 'Designing distributed systems and cloud-native architectures on AWS.',
  },
  {
    name: 'Anthropic Prompt Engineering',
    issuer: 'Anthropic',
    status: 'Completed',
    statusColor: 'bg-green-400/20 text-green-300 border-green-400/30',
    desc: 'Advanced techniques for LLM prompt design, evaluation, and safety.',
  },
];

export default function Certs() {
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
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Credentials</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
            Certifications
          </span>
        </h1>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {certs.map((c) => (
          <div key={c.name} className="section-enter rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-white/50">{c.issuer}</span>
              <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${c.statusColor}`}>
                {c.status}
              </span>
            </div>
            <div className="mb-2 font-semibold text-white/90">{c.name}</div>
            <p className="text-sm leading-relaxed text-white/60">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
