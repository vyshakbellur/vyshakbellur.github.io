export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #c0392b 0%, transparent 70%)' }}
        />
      </div>

      <div
        className="absolute top-1/4 right-8 font-display font-bold select-none pointer-events-none"
        style={{ fontSize: '18rem', color: 'rgba(201,168,76,0.03)', lineHeight: 1 }}
      >
        01
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div
          className="tag mb-6"
          style={{ animation: 'fadeUp 0.8s ease 0.1s forwards', opacity: 0 }}
        >
          ML Engineer · Musician · Runner
        </div>

        <h1
          className="font-display font-bold text-cream mb-6 leading-none"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7.5rem)',
            animation: 'fadeUp 0.8s ease 0.2s forwards',
            opacity: 0,
          }}
        >
          Vyshak{' '}
          <span className="text-gold-gradient">Bellur</span>
        </h1>

        <p
          className="text-mist text-xl md:text-2xl max-w-xl mb-10 leading-relaxed"
          style={{ animation: 'fadeUp 0.8s ease 0.35s forwards', opacity: 0 }}
        >
          I build systems that{' '}
          <span className="text-cream">think</span>,{' '}
          <span className="text-cream">scale</span>, and{' '}
          <span className="text-cream">sing</span>.
        </p>

        <div className="flex flex-wrap gap-4" style={{ animation: 'fadeUp 0.8s ease 0.5s forwards', opacity: 0 }}>
          <a
            href="#work"
            className="font-mono text-sm tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-ink transition-all duration-300"
          >
            VIEW WORK
          </a>
          <a
            href="#console"
            className="font-mono text-sm tracking-widest uppercase px-6 py-3 border border-cream/20 text-cream hover:border-gold/50 hover:text-gold transition-all duration-300"
          >
            ASK ME ANYTHING →
          </a>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'fadeIn 1s ease 1s forwards', opacity: 0 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
          <span className="font-mono text-xs tracking-widest text-mist">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
