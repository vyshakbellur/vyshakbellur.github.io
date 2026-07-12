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
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-8">
      <div className="section-enter mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white/95 md:text-3xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Contact
          </span>
        </h1>
        <div className="mt-3 h-px w-full bg-white/10" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* ── Contact Form ── */}
        <div className="section-enter">
          <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-white/30 mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/90 outline-none focus:border-amber-400/40 transition-colors placeholder:text-white/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-white/30 mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/90 outline-none focus:border-amber-400/40 transition-colors placeholder:text-white/20"
                placeholder="Speaking invitation, Collaboration, etc."
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-white/30 mb-1.5">Message</label>
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
            <p className="text-[10px] text-white/25 text-center">Opens your email client with the message pre-filled.</p>
          </form>
        </div>

        {/* ── Quick links ── */}
        <div className="section-enter space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-[10px] font-medium tracking-widest uppercase text-white/30 mb-3">Available For</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Technical Speaking', 'Panel Discussions', 'Hackathon Judging', 'ML Mentorship', 'GenAI Consulting'].map(t => (
                <span key={t} className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">{t}</span>
              ))}
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              View the <a href="/speak" className="text-yellow-400 hover:text-yellow-300 transition-colors">Speaking page</a> for full topic list and press kit.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-[10px] font-medium tracking-widest uppercase text-white/30 mb-3">Links</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors text-xs">GitHub ↗</a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors text-xs">LinkedIn ↗</a>
              <a href={profile.links.medium} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors text-xs">Medium ↗</a>
              <a href={profile.links.scholar} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors text-xs">Google Scholar ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
