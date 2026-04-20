/**
 * HeroScene — NYC skyline at night with RCB red/gold color palette.
 * City silhouette, Empire State Building, bridge cables, cricket bat easter egg.
 */
export default function HeroScene() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-950/30 via-transparent to-yellow-900/10" />

      <div className="relative">
        <svg
          viewBox="0 0 400 300"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          aria-hidden="true"
        >
          {/* ── Sky gradient ── */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0d0000" stopOpacity="1"/>
              <stop offset="60%"  stopColor="#1a0505" stopOpacity="1"/>
              <stop offset="100%" stopColor="#2d0a0a" stopOpacity="1"/>
            </linearGradient>
            <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1a0808"/>
              <stop offset="100%" stopColor="#0d0404"/>
            </linearGradient>
            <radialGradient id="cityGlow" cx="50%" cy="100%" r="60%">
              <stop offset="0%"   stopColor="#c0392b" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="transparent"  stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Sky base */}
          <rect width="400" height="300" fill="url(#skyGrad)"/>

          {/* City glow from below */}
          <rect width="400" height="300" fill="url(#cityGlow)"/>

          {/* ── Stars ── */}
          {[
            [30,20],[80,15],[140,8],[200,18],[260,10],[320,22],[370,14],
            [55,40],[115,35],[175,28],[235,38],[295,30],[355,42],
            [18,55],[90,60],[165,52],[240,58],[310,48],[385,56],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="0.8" fill="white" opacity={0.3 + (i % 4) * 0.15}/>
          ))}

          {/* ── Moon (top right) ── */}
          <circle cx="355" cy="30" r="14" fill="#f5e6c8" opacity="0.85"/>
          <circle cx="361" cy="26" r="12" fill="#1a0505" opacity="0.9"/>

          {/* ── NYC Skyline buildings ── */}
          {/* Left cluster */}
          <rect x="0"  y="210" width="28" height="90" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="32" y="195" width="22" height="105" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="58" y="205" width="18" height="95" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>

          {/* Windows — left cluster */}
          {[215,225,235,245,255,265].map((y, i) =>
            [4,10,16,22].map((x) => (
              <rect key={`wl-${i}-${x}`} x={x} y={y} width="4" height="4"
                fill={Math.random() > 0.4 ? '#c9a84c' : '#c0392b'} opacity="0.5"/>
            ))
          )}

          {/* Empire State Building (center-left) */}
          <rect x="85"  y="180" width="35" height="120" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="91"  y="160" width="23" height="25" fill="url(#buildingGrad)"/>
          <rect x="97"  y="145" width="11" height="18" fill="url(#buildingGrad)"/>
          <rect x="101" y="120" width="3"  height="28" fill="#c9a84c" opacity="0.9"/> {/* Spire */}
          {/* ESB windows */}
          {[185,195,205,215,225,235,245].map((y, i) =>
            [89,96,103,110,116].map((x) => (
              <rect key={`esb-${i}-${x}`} x={x} y={y} width="4" height="5"
                fill={i % 2 === 0 ? '#c9a84c' : '#c0392b'} opacity="0.55"/>
            ))
          )}

          {/* Mid buildings */}
          <rect x="128" y="200" width="25" height="100" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="157" y="185" width="30" height="115" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="191" y="170" width="22" height="130" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>

          {/* One World Trade (tall, center-right) */}
          <rect x="220" y="155" width="30" height="145" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="225" y="140" width="20" height="18" fill="url(#buildingGrad)"/>
          <rect x="229" y="120" width="12" height="22" fill="url(#buildingGrad)"/>
          <rect x="233" y="90"  width="4"  height="32" fill="#c0392b" opacity="0.8"/> {/* Antenna */}
          {/* 1WTC windows */}
          {[160,170,180,190,200,210,220,230,240,250,260].map((y, i) =>
            [224,231,238,245].map((x) => (
              <rect key={`wtc-${i}-${x}`} x={x} y={y} width="4" height="6"
                fill={i % 3 === 0 ? '#c9a84c' : '#e8c97a'} opacity="0.45"/>
            ))
          )}

          {/* Right cluster */}
          <rect x="258" y="195" width="28" height="105" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="290" y="205" width="22" height="95" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="316" y="188" width="32" height="112" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="352" y="210" width="26" height="90" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>
          <rect x="382" y="200" width="20" height="100" fill="url(#buildingGrad)" stroke="#3d0a0a" strokeWidth="0.5"/>

          {/* Windows — right cluster */}
          {[200,210,220,230,240,250].map((y, i) =>
            [262,269,276,295,302,320,328,336,356,363].map((x) => (
              <rect key={`wr-${i}-${x}`} x={x} y={y} width="4" height="4"
                fill={i % 2 === 0 ? '#c9a84c' : '#c0392b'} opacity="0.45"/>
            ))
          )}

          {/* ── Bridge cables (Brooklyn Bridge style) ── */}
          <g opacity="0.35" stroke="#c9a84c" strokeWidth="0.8" fill="none">
            {/* Left tower */}
            <rect x="60" y="240" width="6" height="60" fill="#1a0808" stroke="#c9a84c" strokeWidth="0.5"/>
            {/* Right tower */}
            <rect x="130" y="240" width="6" height="60" fill="#1a0808" stroke="#c9a84c" strokeWidth="0.5"/>
            {/* Main cables */}
            <path d="M 0 270 Q 65 245 98 265 Q 133 245 200 270"/>
            {/* Vertical suspenders */}
            {[15,30,45,60,75,90,110,125,140,155,170,185].map((x) => (
              <line key={x} x1={x} y1="260" x2={x} y2="300" stroke="#c9a84c" strokeWidth="0.5" opacity="0.6"/>
            ))}
          </g>

          {/* ── Ground / water reflection ── */}
          <rect x="0" y="288" width="400" height="12" fill="#1a0000" opacity="0.8"/>
          {/* Water glimmer */}
          {[20,60,100,150,200,250,300,350].map((x, i) => (
            <line key={i} x1={x} y1="292" x2={x + 25} y2="292"
              stroke={i % 2 === 0 ? '#c9a84c' : '#c0392b'} strokeWidth="0.8" opacity="0.3"/>
          ))}

          {/* ── RCB cricket bat (subtle easter egg, bottom right) ── */}
          <g transform="translate(340, 220) rotate(-30)" opacity="0.25">
            <rect x="0" y="0" width="8" height="40" rx="2" fill="#c9a84c"/>
            <rect x="1" y="40" width="6" height="15" rx="1" fill="#8b5e2a"/>
            <rect x="2" y="8"  width="4" height="1" fill="#c0392b" opacity="0.8"/>
            <rect x="2" y="14" width="4" height="1" fill="#c0392b" opacity="0.8"/>
            <rect x="2" y="20" width="4" height="1" fill="#c0392b" opacity="0.8"/>
          </g>
        </svg>

        {/* Interest tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['Music', 'Engineering', 'NYC', 'Writing', 'Running', 'RCB'].map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-3 py-1 text-xs ${
                tag === 'RCB'
                  ? 'border-red-700/50 bg-red-900/20 text-red-400'
                  : 'border-white/10 bg-white/5 text-white/70'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
