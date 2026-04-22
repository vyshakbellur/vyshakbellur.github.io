import Console from '../components/Console';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden px-4 md:px-8">
      
      {/* ── Glowing Transformer Architecture Backdrop ── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
        <img 
          src="/src/assets/transformer_bg.png" 
          alt="Transformer AI Architecture" 
          className="w-full h-full object-cover mix-blend-screen opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05070a_80%)]" />
      </div>

      <div className="w-full max-w-4xl relative z-10 shadow-[0_0_80px_rgba(30,136,229,0.15)] rounded-xl my-4">
        <Console />
      </div>
    </div>
  );
}
