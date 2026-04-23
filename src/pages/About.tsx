import { useEffect, useRef } from 'react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.section-enter').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-4xl px-5 py-14 min-h-screen">
      <div className="section-enter">
        <div className="mb-10 text-[10px] font-black tracking-[0.6em] uppercase text-white/20">Re · About</div>

        <div className="space-y-6 text-base leading-relaxed text-slate-300">
          <p>
            I am a Senior Software Engineer at JPMorgan Chase and an applied ML researcher whose work spans three domains: financial infrastructure, computational biology, and digital humanities connected by a single obsession: <em>finding structure in complex, noisy systems.</em>
          </p>
          <p>
            At JPMorgan Chase, I work on production grade ML systems focused on autonomous reliability, utilizing anomaly detection and automated recovery pipelines to reduce MTTR to under 15 minutes.
          </p>
          <p>
            Currently pursuing PhD from University of Cumberland. For my research, I collaborate with Prof. Forest Rohwer at San Diego State University on microbiome network architecture and DNA Language Modeling for metagenomics. Previously, my published work with Prof. Sam Kassegne in Oxford University Press applied computational pattern recognition to measure structural similarity across ancient writing systems.
          </p>
          <p>
            Outside of the terminal, I run long distances, do adventure travel, and produce music under the channel <strong className="text-amber-400 font-serif italic">v_naada</strong>. I am a Royal Challengers Bengaluru fan, a mountain person, and a believer that pattern recognition is a universal language.
          </p>
        </div>

        <div className="mt-14 h-px w-full bg-white/10" />

        <div className="section-enter mt-10">
          <h2 className="mb-4 text-xs font-black tracking-[0.3em] uppercase text-white/50">Professional Service & Availability</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Vyshak is heavily engaged in the intersection of biological sequence modeling, linguistic structure, and enterprise anomaly detection. He is open to select opportunities for academic peer review, hackathon/competition judging, and technical speaking engagements regarding cross-domain AI architectures.
          </p>
        </div>
      </div>
    </div>
  );
}
