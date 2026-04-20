import { useEffect, useRef } from 'react';
import { profile } from '../data/profile';

export default function Contact() {
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
        <div className="mb-2 text-xs font-medium tracking-widest text-white/40 uppercase">Get in touch</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Contact
          </span>
        </h1>
        <div className="mt-4 h-px w-full bg-white/10" />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="section-enter md:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/75 leading-relaxed">
              The fastest way to reach me is on LinkedIn. I&apos;m happy to discuss full-stack
              engineering, GenAI systems, and platform architecture.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-gradient-to-r from-red-600 via-yellow-500 to-red-500 px-5 py-2 text-sm font-semibold text-slate-950"
              >
                Message on LinkedIn
              </a>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                Open Resume
              </a>
            </div>
          </div>
        </div>

        <div className="section-enter md:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/70 mb-3">Links</div>
            <div className="flex flex-col gap-2 text-sm">
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors">
                GitHub ↗
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors">
                LinkedIn ↗
              </a>
              <a href={profile.links.medium} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors">
                Medium ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
