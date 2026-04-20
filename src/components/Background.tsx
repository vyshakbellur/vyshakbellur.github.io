export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div
        className="absolute -top-48 left-1/2 h-[720px] w-[980px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
        style={{ background: 'linear-gradient(to right, #a855f7, #38bdf8, #34d399)' }}
      />
      <div
        className="absolute bottom-[-260px] left-[-260px] h-[560px] w-[560px] rounded-full blur-3xl opacity-20"
        style={{ background: 'linear-gradient(to right, #fbbf24, #f43f5e, #7c3aed)' }}
      />
      <div
        className="absolute right-[-240px] top-[35%] h-[520px] w-[520px] rounded-full blur-3xl opacity-15"
        style={{ background: 'linear-gradient(to right, #22d3ee, #3b82f6, #a855f7)' }}
      />
    </div>
  );
}
