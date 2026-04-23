

/* ─── Audio singleton ─────────────────────────────────────────────────── */
let globalAudioCtx: AudioContext | null = null;
const initAudio = () => {
  if (!globalAudioCtx)
    globalAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
  return globalAudioCtx;
};

/* ─── Piano: 3 octaves ───────────────────────────────────────────────── */
const BLACK_S = new Set([1, 3, 6, 8, 10]);
const NS = 36;
const WW = 66;
const WH = 165;
const BW = 40;
const BH = 86;
const KGAP = 1;

interface KInfo { s: number; freq: number; isBlack: boolean; x: number; wi: number; }
const buildKeys = (): KInfo[] => {
  const out: KInfo[] = [];
  let wi = 0;
  for (let s = 0; s < NS; s++) {
    const freq = 261.63 * Math.pow(2, s / 12);
    const isBlack = BLACK_S.has(s % 12);
    if (!isBlack) {
      out.push({ s, freq, isBlack, x: wi * (WW + KGAP), wi });
      wi++;
    } else {
      out.push({ s, freq, isBlack, x: (wi - 1) * (WW + KGAP) + WW - BW / 2, wi: wi - 0.5 });
    }
  }
  return out;
};
const ALL_KEYS = buildKeys();
const PIANO_W = 21 * (WW + KGAP);

const flashEl = (id: string, bg = '#ffbd2e') => {
  const el = document.getElementById(id) as HTMLElement | null;
  if (!el) return;
  el.style.filter = 'brightness(0.65)';
  el.style.backgroundColor = bg;
  setTimeout(() => { el.style.filter = ''; el.style.backgroundColor = ''; }, 160);
};

export default function Music() {
  const playNote = (freq: number, id: string) => {
    try {
      const ctx = initAudio();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = freq; o.type = 'square';
      o.connect(g); g.connect(ctx.destination); o.start();
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      o.stop(ctx.currentTime + 1.0);
    } catch { }
    flashEl(id);
  };

  const whiteBase = {
    position: 'absolute' as const, top: 0, width: WW, height: WH,
    background: 'linear-gradient(180deg,#fff 0%,#ddd 100%)',
    borderRadius: '0 0 6px 6px', cursor: 'pointer', zIndex: 10,
    overflow: 'hidden', border: '1px solid rgba(0,0,0,0.09)',
    boxShadow: '1px 0 1px rgba(0,0,0,0.1),0 5px 12px rgba(0,0,0,0.4)',
    transition: 'filter .07s,background-color .07s',
  };
  const blackBase = {
    position: 'absolute' as const, top: 0, width: BW, height: BH,
    background: 'linear-gradient(180deg,#222 0%,#000 100%)',
    borderRadius: '0 0 5px 5px', cursor: 'pointer', zIndex: 20,
    boxShadow: '0 8px 18px rgba(0,0,0,0.9)',
    transition: 'filter .07s,background-color .07s',
  };

  return (
    <div className="flex flex-col h-full bg-[#02040a] overflow-x-hidden overflow-y-auto text-white pt-24 px-8 pb-16 no-scrollbar">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-black tracking-widest uppercase mb-2">Music & Audio Lab</h1>
        <p className="font-mono text-white/50 tracking-widest uppercase text-sm mb-16">
          Interactive Synthesizers · Acoustic Modeling
        </p>

        {/* ─── Grand Piano Module ─── */}
        <div className="mb-24">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-4 text-amber-400">
            <span className="text-2xl">🎹</span> Virtual Square-Wave Synthesizer
          </h2>
          
          <div className="overflow-x-auto pb-8 snap-x no-scrollbar flex justify-start">
            <div style={{
                display: 'inline-block',
                border: '5px solid #1e0900',
                borderRadius: '14px',
                boxShadow: 'inset 0 0 0 1px rgba(255,180,80,0.10), 0 0 0 2px rgba(10,3,0,0.9), 0 16px 60px rgba(0,0,0,0.90)',
                background: '#070300',
                minWidth: PIANO_W,
                flexShrink: 0
              }}>
              
              {/* Fallboard / Headboard */}
               <div style={{
                  width: PIANO_W, height: 50,
                  background: 'linear-gradient(90deg, #1a0800 0%, #080300 18%, #030100 50%, #080300 82%, #1a0800 100%)',
                  borderBottom: '4px solid rgba(0,0,0,0.98)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255,200,100,0.08)',
                }}>
                  <div className="text-amber-500/80 font-serif italic text-sm tracking-[0.3em]">
                    v_naada acoustics
                  </div>
               </div>

              {/* Keys track */}
              <div style={{ position: 'relative', width: PIANO_W, height: WH, background: '#000' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'rgba(0,0,0,0.4)', zIndex: 30 }} />
                
                {ALL_KEYS.map((k) => (
                  <div
                    key={k.s}
                    id={`sk-${k.s}`}
                    onMouseDown={() => playNote(k.freq, `sk-${k.s}`)}
                    style={{
                      ...(k.isBlack ? blackBase : whiteBase),
                      left: k.x,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Virtual Guitar Module Placeholder ─── */}
        <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-10 relative overflow-hidden backdrop-blur-sm">
           <h2 className="text-xl font-bold mb-4 flex items-center gap-4 text-cyan-400">
             <span className="text-2xl">🎸</span> 6-String Physical Modeling (In Progress)
           </h2>
           <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
             An upcoming module that simulates acoustic guitar string excitation and resonant body frequency responses using finite difference time domain (FDTD) wave equations. Check back later to interact with the Fretboard.
           </p>
           <div className="mt-8 flex gap-2">
             <div className="h-0.5 w-full bg-white/10 rounded" />
             <div className="h-0.5 w-full bg-white/20 rounded" />
             <div className="h-0.5 w-full bg-white/30 rounded" />
             <div className="h-1 w-full bg-white/40 rounded" />
             <div className="h-1.5 w-full bg-white/50 rounded" />
             <div className="h-2 w-full bg-white/60 rounded" />
           </div>
        </div>

      </div>
    </div>
  );
}
