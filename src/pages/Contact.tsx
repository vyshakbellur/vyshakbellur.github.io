import { useState, useEffect, useRef } from 'react';
import { profile } from '../data/profile';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) el.querySelectorAll('.section-enter').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hi Vyshak,\n\n${message}\n\n— ${name}`;
    const mailto = `mailto:vyshakbellur@gmail.com?subject=${encodeURIComponent(subject || 'Website Inquiry')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-10">
      <div className="section-enter mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white/95 md:text-5xl mb-6 leading-tight">
          Bring a practical AI voice<br />to your program.
        </h1>
        <p className="mt-3 max-w-2xl text-lg md:text-xl text-white/60 font-light leading-relaxed mb-6">
          Invite me for a conference talk, panel, technical judging, or session-chair role. I also welcome focused research collaborations on governed generative AI and reliable systems.
        </p>

        {/* Quick Links */}
        <div className="flex items-center gap-6">
          <a title="GitHub" href={profile.links.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
            <span className="text-xs font-semibold tracking-wider uppercase">GitHub ↗</span>
          </a>
          <a title="LinkedIn" href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
            <span className="text-xs font-semibold tracking-wider uppercase">LinkedIn ↗</span>
          </a>
          <a title="Medium" href={profile.links.medium} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
            <span className="text-xs font-semibold tracking-wider uppercase">Medium ↗</span>
          </a>
          <a title="Google Scholar" href={profile.links.scholar} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
            <span className="text-xs font-semibold tracking-wider uppercase">Scholar ↗</span>
          </a>
        </div>

        <div className="mt-8 h-px w-full bg-white/10" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* ── Contact Form ── */}
        <div className="section-enter">
          <form onSubmit={handleSubmit} className="rounded-xl border border-white/14 bg-white/[0.06] p-6 space-y-4">
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-white/45 mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-white/14 bg-white/[0.07] px-3 py-2.5 text-sm text-white/90 outline-none focus:border-amber-400/40 transition-colors placeholder:text-white/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-white/45 mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-white/14 bg-white/[0.07] px-3 py-2.5 text-sm text-white/90 outline-none focus:border-amber-400/40 transition-colors placeholder:text-white/30"
                placeholder="Speaking, judging, session chair, or collaboration"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-white/45 mb-1.5">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/90 outline-none focus:border-amber-400/40 transition-colors placeholder:text-white/20 resize-none"
                placeholder="Tell me about your event, project, or idea..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-sm font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              Send Message
            </button>
            <p className="text-[10px] text-white/35 text-center">Opens your email client with the message pre-filled.</p>
          </form>
        </div>

        {/* ── Quick links ── */}
        <div className="section-enter space-y-4">
          <div className="rounded-xl border border-white/14 bg-white/[0.06] p-6">
            <div className="text-[10px] font-semibold tracking-widest uppercase text-white/50 mb-4">Engagement Types</div>
            <div className="space-y-3">
              {[
                { label: 'Conference Speaking', desc: 'Practical sessions on governed generative AI, agentic security, and production reliability.' },
                { label: 'Panel Participation', desc: 'Evidence-based discussion on AI governance, adoption, engineering risk, and regulated workflows.' },
                { label: 'Judging', desc: 'Evaluating technical work across AI, software engineering, responsible innovation, and product execution.' },
                { label: 'Session Chair', desc: 'Keeping technical sessions focused, on time, and useful to both speakers and attendees.' },
                { label: 'Research Collaboration', desc: 'Quantitative and applied research on governed AI adoption and dependable enterprise systems.' },
              ].map(t => (
                <div key={t.label} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-white/90">{t.label}</span>
                    <p className="text-[10px] leading-[1.6] text-white/55 mt-0.5">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/8">
              <p className="text-xs text-white/70 leading-[1.7]">
                View the <a href="/speak" className="text-yellow-400 hover:text-yellow-300 transition-colors">Speaking page</a> for recent events, topics, and source links.
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
