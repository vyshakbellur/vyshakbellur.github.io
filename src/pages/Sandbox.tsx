import { useState } from 'react';

export default function Sandbox() {
  const [nodes, setNodes] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="flex flex-col h-full bg-[#02040a] overflow-hidden text-white pt-24 px-8 pb-8">
      
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-black tracking-widest uppercase mb-2">Algorithm Sandbox</h1>
        <p className="font-mono text-white/50 tracking-widest uppercase text-sm mb-12">
          Interactive Data Structure Executions
        </p>

        {/* Algorithm Container */}
        <div className="border border-white/10 rounded-xl bg-white/[0.02] p-8 mt-8 relative overflow-hidden">
           
           <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
             <span className="text-[#00D4FF]">λ</span> 
             Reverse a Linked List
           </h2>

           <div className="flex items-center justify-center gap-4 my-16">
              {nodes.map((node, i) => (
                <div key={node} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded border-2 border-[#00D4FF] bg-[#00D4FF]/10 flex items-center justify-center font-mono text-xl shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                    {node}
                  </div>
                  {i < nodes.length - 1 && (
                    <div className="text-white/30 font-mono">→</div>
                  )}
                </div>
              ))}
           </div>

           <div className="flex gap-4 border-t border-white/10 pt-6 mt-8">
             <button 
                onClick={() => setNodes([...nodes].reverse())}
                className="px-6 py-3 bg-[#00D4FF] text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-[#00e5ff] transition-colors"
              >
               Execute Reverse()
             </button>
             <button 
                onClick={() => setNodes([1, 2, 3, 4, 5])}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white uppercase tracking-widest text-xs rounded hover:bg-white/10 transition-colors"
              >
               Reset List
             </button>
           </div>

        </div>
      </div>
    </div>
  );
}
