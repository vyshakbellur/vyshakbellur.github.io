/**
 * Background — RCB palette (deep red, gold) with NYC night-sky atmosphere.
 * Fixed behind all content.
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10 bg-slate-950">
      {/* Deep red glow — top left (RCB red) */}
      <div
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, #c0392b 0%, #7b1010 40%, transparent 70%)' }}
      />
      {/* Gold accent — top right */}
      <div
        className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 65%)' }}
      />
      {/* NYC night city haze — bottom center */}
      <div
        className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(ellipse, #c0392b 0%, #4a0000 40%, transparent 70%)' }}
      />
      {/* Subtle gold shimmer — mid right */}
      <div
        className="absolute top-[40%] right-[-150px] h-[400px] w-[400px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #e8c97a 0%, transparent 65%)' }}
      />
    </div>
  );
}
