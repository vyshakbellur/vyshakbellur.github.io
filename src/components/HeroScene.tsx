/** Decorative SVG illustration — city skyline, laptop, piano, notebook */
export default function HeroScene() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative">
        <svg
          viewBox="0 0 380 280"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          aria-hidden="true"
        >
          {/* ── City skyline silhouette ── */}
          <g opacity="0.35" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth="1">
            <rect x="10"  y="160" width="30" height="80" rx="1"/>
            <rect x="44"  y="130" width="22" height="110" rx="1"/>
            <rect x="70"  y="145" width="28" height="95" rx="1"/>
            <rect x="102" y="110" width="20" height="130" rx="1"/>
            <rect x="126" y="140" width="26" height="100" rx="1"/>
            <rect x="10"  y="170" width="8"  height="10" fill="rgba(99,102,241,0.5)" stroke="none"/>
            <rect x="50"  y="145" width="8"  height="10" fill="rgba(99,102,241,0.5)" stroke="none"/>
            <rect x="108" y="125" width="8"  height="10" fill="rgba(167,139,250,0.5)" stroke="none"/>
          </g>

          {/* ── Laptop / code editor (top right) ── */}
          <g transform="translate(165, 20)">
            <rect width="195" height="130" rx="6" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            {/* screen glow */}
            <rect x="12" y="12" width="171" height="106" rx="3" fill="rgba(15,23,42,0.8)"/>
            {/* code lines */}
            <rect x="22" y="28" width="60"  height="5" rx="2" fill="rgba(167,139,250,0.7)"/>
            <rect x="22" y="40" width="110" height="5" rx="2" fill="rgba(255,255,255,0.25)"/>
            <rect x="32" y="52" width="80"  height="5" rx="2" fill="rgba(56,189,248,0.6)"/>
            <rect x="32" y="64" width="95"  height="5" rx="2" fill="rgba(255,255,255,0.2)"/>
            <rect x="22" y="76" width="50"  height="5" rx="2" fill="rgba(52,211,153,0.6)"/>
            <rect x="32" y="88" width="120" height="5" rx="2" fill="rgba(255,255,255,0.2)"/>
            <rect x="22" y="100" width="70" height="5" rx="2" fill="rgba(251,191,36,0.5)"/>
            {/* cursor blink */}
            <rect x="22" y="112" width="8" height="8" rx="1" fill="rgba(99,102,241,0.9)"/>
          </g>

          {/* ── Analytics bar chart (mid-left) ── */}
          <g transform="translate(10, 100)" opacity="0.6">
            {[
              { x: 0,  h: 45, color: 'rgba(167,139,250,0.7)' },
              { x: 22, h: 65, color: 'rgba(56,189,248,0.7)'  },
              { x: 44, h: 52, color: 'rgba(52,211,153,0.7)'  },
              { x: 66, h: 70, color: 'rgba(251,191,36,0.7)'  },
              { x: 88, h: 40, color: 'rgba(167,139,250,0.7)' },
            ].map((bar, i) => (
              <rect key={i} x={bar.x} y={80 - bar.h} width="16" height={bar.h} rx="2" fill={bar.color}/>
            ))}
            <line x1="0" y1="80" x2="110" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          </g>

          {/* ── Music wave ── */}
          <g transform="translate(10, 195)" opacity="0.6">
            <path
              d="M0 25 C15 5, 25 45, 40 25 C55 5, 65 45, 80 25 C95 5, 105 45, 120 25 C135 5, 145 45, 160 25"
              fill="none" stroke="rgba(56,189,248,0.7)" strokeWidth="2" strokeLinecap="round"
            />
            <path
              d="M0 40 C20 20, 35 60, 55 40 C75 20, 90 60, 110 40 C130 20, 145 60, 165 40"
              fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" strokeLinecap="round"
            />
          </g>

          {/* ── Piano keyboard (bottom right) ── */}
          <g transform="translate(165, 185)" opacity="0.55">
            {[0,1,2,3,4,5,6].map((i) => (
              <rect key={i} x={i * 28} y="0" width="25" height="65" rx="2"
                fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            ))}
            {[0,1,3,4,5].map((i) => (
              <rect key={i} x={i * 28 + 16} y="0" width="15" height="40" rx="2"
                fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            ))}
          </g>

          {/* ── Notebook (bottom center) ── */}
          <g transform="translate(120, 195)" opacity="0.4">
            <rect width="38" height="50" rx="2" fill="rgba(30,41,59,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            <line x1="8" y1="14" x2="30" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="8" y1="22" x2="30" y2="22" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="8" y1="30" x2="24" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="4" y1="0" x2="4" y2="50" stroke="rgba(167,139,250,0.4)" strokeWidth="2"/>
          </g>
        </svg>

        {/* Interest tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['Music', 'Engineering', 'NYC', 'Writing', 'Running', 'Nature'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
