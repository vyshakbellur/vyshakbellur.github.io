export default function ArtisticBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-slate-950">
      {/* ── Outer Space / Deep Sky Base ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0e] to-black opacity-90" />

      {/* ── Aurora Borealis Glows ── */}
      {/* Top Left Teal Aurora */}
      <div className="absolute -left-[20%] -top-[10%] h-[600px] w-[800px] rounded-[100%] bg-teal-500/10 blur-[120px] mix-blend-screen opacity-70" />
      
      {/* Mid Right Magenta/Purple Aurora */}
      <div className="absolute -right-[10%] top-[20%] h-[500px] w-[700px] rounded-[100%] bg-purple-600/10 blur-[130px] mix-blend-screen opacity-60" />

      {/* Center Deep Blue Core */}
      <div className="absolute left-[30%] top-[10%] h-[400px] w-[600px] rounded-[100%] bg-blue-500/10 blur-[100px] mix-blend-screen opacity-50" />

      {/* ── RCB Gold/Red City Core (Bottom) ── */}
      <div className="absolute bottom-0 left-1/2 h-[300px] w-[70%] -translate-x-1/2 rounded-[100%] bg-red-600/10 blur-[120px] mix-blend-screen opacity-80" />
      <div className="absolute bottom-0 right-[20%] h-[200px] w-[400px] rounded-[100%] bg-yellow-500/10 blur-[100px] mix-blend-screen opacity-50" />

      {/* ── Grid Canvas Overlay (creates structure over the aurora) ── */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* ── Reflective Water Basin Basin (Bottom Edge) ── */}
      <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-b from-transparent via-teal-900/10 to-slate-900/40 mix-blend-screen opacity-60 backdrop-blur-sm z-0" />

      {/* ── Silhouette Foreground (Mountains & Cities hybrid) ── */}
      <div className="absolute bottom-[5vh] left-0 right-0 h-[40vh] w-full flex items-end justify-center overflow-hidden z-10 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        <svg 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none" 
          className="w-full h-full min-w-[1440px] opacity-15"
          fill="url(#aurora-shadow)"
        >
          <defs>
            <linearGradient id="aurora-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="snow-cap" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Mt. Rainier Alpine Peaks (Left side) */}
          <path d="M0,320 L0,150 L60,250 L140,50 L200,180 L290,120 L350,220 L480,90 L580,240 L700,320 Z" />
          {/* Snow caps (overlay piece) */}
          <path d="M140,50 L110,120 L160,110 L200,180 L180,90 Z" fill="url(#snow-cap)" />
          <path d="M480,90 L450,150 L500,140 Z" fill="url(#snow-cap)" />
          
          {/* Core City Block */}
          <rect x="680" y="240" width="30" height="80" />
          <rect x="720" y="180" width="25" height="140" />
          
          {/* Burj Khalifa Detailed */}
          <path d="M780,320 L780,180 L790,180 L790,100 L795,100 L795,30 L798,30 L798,0 L802,0 L802,30 L805,30 L805,100 L810,100 L810,180 L820,180 L820,320 Z" /> 
          
          <rect x="830" y="120" width="45" height="200" />
          <rect x="885" y="200" width="35" height="120" />
          
          {/* Marina Bay Sands Detailed */}
          <rect x="940" y="150" width="20" height="170" />
          <rect x="980" y="150" width="20" height="170" />
          <rect x="1020" y="150" width="20" height="170" />
          {/* The Boat Deck */}
          <path d="M920,150 Q980,120 1050,150 L1050,165 Q980,135 920,165 Z" />
          
          {/* Further cityscape dropping off */}
          <rect x="1070" y="220" width="40" height="100" />
          <path d="M1120,320 L1120,250 L1200,100 L1260,260 L1350,180 L1440,280 L1440,320 Z" />
        </svg>
      </div>

      {/* Deep Lake Reflection Blur Layer (bottom 5vh) */}
      <div className="absolute inset-x-0 bottom-0 h-[10vh] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20" />
    </div>
  );
}
