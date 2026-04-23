import Console from '../components/Console';

import mtRainierUrl from '../assets/mt_rainier_aurora.png';
import transformerBgUrl from '../assets/transformer_bg.png';

const SIGNPOST_ITEMS = [
  { label: 'ML Researcher',     color: '#F5A623', dir: 'right', angle: 'rotate-2' },
  { label: 'PhD Candidate',     color: '#FB923C', dir: 'left',  angle: '-rotate-1' },
  { label: 'Musician',          color: '#A78BFA', dir: 'right', angle: 'rotate-1' },
  { label: 'Adventure Traveler',color: '#34D399', dir: 'left',  angle: '-rotate-2' },
  { label: 'Runner',            color: '#FB7185', dir: 'right', angle: 'rotate-2' },
];

function Signpost() {
  return (
    <div className="relative flex flex-col items-center justify-end h-[350px] w-[300px] origin-bottom-left transition-all duration-500 pb-12">

      {/* Vertical Wooden Pole */}
      <div className="absolute top-[20px] bottom-[-200px] w-[20px] left-1/2 -translate-x-1/2 rounded-t z-10" 
           style={{ 
             background: 'linear-gradient(90deg, #2d1c15 0%, #4a2e22 25%, #3a2218 75%, #2d1c15 100%)', 
             boxShadow: 'inset 2px 0 5px rgba(255,255,255,0.05), inset -2px 0 10px rgba(0,0,0,0.8), 5px 0 25px rgba(0,0,0,0.8)' 
           }} />
      
      <div className="flex flex-col gap-[20px] z-10 w-full pt-12 pb-6">
        {SIGNPOST_ITEMS.map((item, i) => {
          const isRight = item.dir === 'right';
          return (
            <div key={i} className={`relative flex items-center justify-center h-[46px] ${isRight ? 'self-end' : 'self-start'} w-[85%] ${item.angle} drop-shadow-[0_15px_15px_rgba(0,0,0,0.7)] group transition-transform hover:z-20`}>
              
              {/* Inner shape with clip-path carving */}
              <div 
                className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]"
                style={{
                  background: 'linear-gradient(180deg, #442a1d 0%, #2b1811 100%)',
                  clipPath: isRight 
                    ? 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' 
                    : 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)',
                }}
              >
                <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)]" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
                
                {/* Accent neon stripe */}
                <div className={`absolute top-0 bottom-0 w-1 ${isRight ? 'left-0' : 'right-0'}`} style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}` }} />
                
                {/* Iron Bolts */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.8)] ${isRight ? 'left-4' : 'right-4'}`} />
                <div className={`absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.8)] ${isRight ? 'left-10' : 'right-10'}`} />
              </div>
              
              {/* Text Layout */}
              <div 
                className={`relative z-10 w-full text-center px-4 font-mono font-bold tracking-widest text-[10px] transition-transform duration-300 group-hover:scale-[1.03] select-none ${isRight ? 'pr-8' : 'pl-8'}`} 
                style={{ color: item.color, textShadow: '0 2px 4px rgba(0,0,0,1)' }}
              >
                {item.label.toUpperCase()}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center z-10 px-4">
      
      {/* ── Mount Rainier & Aurora Backdrop ── */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center bg-[#010610]">
        <img 
          src={mtRainierUrl} 
          alt="Mount Rainier Aurora Sky" 
          className="w-full h-full object-cover opacity-[0.35]"
        />
        {/* Soft vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-black/90 pointer-events-none" /> 
      </div>

      {/* ── RHS: The Adventure Signpost (MINIMAL & FIXED) ── 
          Anchored fixed to the screen right above the 110px footer.
          Moved to the right side of the screen per request.
      */}
      <div className="hidden xl:flex fixed bottom-[110px] right-[2vw] z-20 pointer-events-auto scale-50 opacity-80 hover:opacity-100 transition-opacity transform origin-bottom-right">
        <Signpost />
      </div>

      {/* ── CENTER: The Chatbot Console ── */}
      <div className="relative w-full max-w-[800px] xl:w-[650px] h-[95%] flex-shrink-0 flex items-center justify-center z-20 p-2 sm:p-4">
        
        {/* Subtle Neural Network Backdrop bounded strictly to the terminal wrapper */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.35] mix-blend-screen"
             style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)' }}>
          <img 
            src={transformerBgUrl} 
            alt="Local Neural Network" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* The active terminal window */}
        <div className="relative w-full h-full z-10 shadow-[0_0_100px_rgba(15,200,255,0.12)] rounded-xl backdrop-blur-sm bg-black/50 border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_120px_rgba(15,200,255,0.2)]">
          <Console />
        </div>
      </div>

    </div>
  );
}
