import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ArtisticBackground from '../components/ArtisticBackground';
import Console from '../components/Console';
import AdventureGallery from '../components/AdventureGallery';
import { profile } from '../data/profile';
import { hobbiesInfo, experience } from '../data/content';

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

export default function Home() {
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
    <div ref={sectionRef}>
      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-6xl px-5 pb-10 pt-14 text-white overflow-hidden">
        <ArtisticBackground />

        <div className="relative z-10 grid gap-12 md:grid-cols-12 md:items-start lg:gap-16">
          {/* Left: text */}
          <div className="md:col-span-7">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl text-white/95">
              {profile.tagline.split('•')[0]} <br/>
              <span className="text-gold opacity-90 text-2xl md:text-3xl font-normal block mt-2 text-white/60">
                Musician • Runner • Adrenaline Junkie
              </span>
            </h1>

            <div className="mt-8 space-y-5 text-sm leading-relaxed text-slate-300">
              <p>
                I am a Senior Engineer at JPMorgan Chase and an applied ML researcher whose work spans three unlikely domains—financial infrastructure, computational biology, and digital humanities—connected by a single obsession: finding structure in complex, noisy systems.
              </p>
              <p>
                At JPMorgan Chase, I architect production ML systems with a focus on autonomous reliability, utilizing anomaly detection and automated recovery pipelines to reduce MTTR to under 15 minutes. In my research, I collaborate with Prof. Forest Rohwer at San Diego State University on microbiome network architecture and DNA Language Modeling for Metagenomics. Previously, my published work with Prof. Sam Kassegne in Oxford University Press applied computational pattern recognition to measure structural similarity across ancient writing systems.
              </p>
              <p>
                The common thread across all three: ML as a lens for recognizing patterns that cut across domain boundaries. Outside of the terminal, I run long distances, train for half-marathons, and run a music channel called <strong>v_naada</strong>.
              </p>
            </div>

            {/* Minimalist Iterative Socials */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href={profile.links.resume} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/80" /> Resume
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                GitHub ↗
              </a>
              <a href={profile.links.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                Scholar ↗
              </a>
              <a href={profile.links.medium} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                Medium ↗
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right: Console Chatbot (Sticky) */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-24 flex items-center justify-center">
              <Console />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bespoke ML/Runner Graphic Capstone ── */}
      <section className="relative mx-auto mt-20 max-w-7xl px-5 pb-20 fade-in section-enter">
        <div className="w-full relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 bg-slate-900/50 backdrop-blur-md group">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
          <img 
            src="/surreal_ml_runner_nyc.png" 
            alt="Futuristic Neural Network with NYC Marathon Bib and Running Shoes"
            className="w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            style={{ maxHeight: '600px' }}
          />
          <div className="absolute bottom-6 left-8 z-20">
            <h3 className="text-2xl font-bold tracking-tight text-white/90">The Convergence</h3>
            <p className="text-sm font-mono text-cyan-400 mt-1 uppercase tracking-widest">Endurance • Neural Architecture</p>
          </div>
        </div>
      </section>
    </div>
  );
}
