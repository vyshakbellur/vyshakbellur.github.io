import { useState, useRef, useEffect } from 'react';
import { consoleKnowledge } from '../data/content';

type Message = { type: 'input' | 'output'; text: string };

const SUGGESTIONS = [
  'Tell me about your ML research',
  'Ask about Metagenomics',
  'What do you do at JPMC?',
  'Tell me about your running',
];

const WORKER_URL = 'https://chatbot-llm.vyshakathreya.workers.dev';

async function fetchLLMResponse(input: string): Promise<string> {
  const q = input.toLowerCase().trim();
  for (const [key, val] of Object.entries(consoleKnowledge)) {
    if (q.includes(key)) return val;
  }
  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q }),
    });
    if (!res.ok) throw new Error('API down');
    const data = await res.json();
    
    // Intercept Google Cloud HTTP throttling/auth errors cleanly
    if (data.reply && data.reply.includes('GCP')) {
      return "My cognitive uplink to Google's primary servers is currently saturated by traffic. Ask me something from my hardcoded logic (experience, running, publications).";
    }
    
    return data.reply || 'I am currently disconnected from my neural cortex.';
  } catch (err) {
    console.error('LLM Error:', err);
    return 'The LLM routing is currently undergoing maintenance. Ask me something from my local logic (experience, running, publications).';
  }
}

export default function Console() {
  const INIT_MESSAGES: Message[] = [
    { type: 'output', text: "Welcome. I am Vyshak's interactive portfolio console." },
    { type: 'output', text: "Ask me anything — or pick a prompt below to start." },
  ];

  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const handleSubmit = async (query?: string) => {
    const q = (query ?? input).trim();
    if (!q) return;
    setMessages(m => [...m, { type: 'input', text: q }]);
    setInput('');

    if (q.toLowerCase().includes('titanic')) {
      setMessages(m => [...m, { type: 'output', text: 'Initializing Autopilot Synthesis: Titanic...' }]);
      window.dispatchEvent(new CustomEvent('play-song', { detail: 'titanic' }));
      return;
    }

    setThinking(true);
    const reply = await fetchLLMResponse(q);
    setThinking(false);
    setMessages(m => [...m, { type: 'output', text: reply }]);
  };

  /* Show suggestion chips only before the user sends any message */
  const isInitial = messages.length === INIT_MESSAGES.length;

  return (
    <div id="console" className="w-full">
      <div
        className="w-full rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-white/10 overflow-hidden"
        style={{ backgroundColor: '#141414' }}
      >
        {/* ── macOS Title Bar ── */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#252525] border-b border-white/[0.07]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-white/30">vyshak@bellur ~ ask</span>
        </div>

        {/* ── Message log ── */}
        <div
          className="px-4 pt-4 space-y-2 overflow-y-auto"
          style={{ height: '40vh', minHeight: 200, maxHeight: 500 }}
          onClick={() => inputRef.current?.focus()}
        >
          {messages.map((msg, i) => (
            <div key={i} className="flex gap-3">
              <span className={`font-mono text-xs mt-0.5 shrink-0 ${msg.type === 'input' ? 'text-cyan-400' : 'text-emerald-400'}`}>
                {msg.type === 'input' ? '❯' : '→'}
              </span>
              <p className={`font-mono text-sm leading-relaxed ${msg.type === 'input' ? 'text-cyan-400' : 'text-emerald-400'}`}>
                {msg.text}
              </p>
            </div>
          ))}

          {thinking && (
            <div className="flex gap-3">
              <span className="font-mono text-xs text-emerald-400">→</span>
              <span className="font-mono text-sm text-emerald-400 animate-pulse">▋</span>
            </div>
          )}

          {/* ── Suggestion chips — only shown on initial state, inside terminal ── */}
          {isInitial && (
            <div className="mt-3 mb-1 flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => handleSubmit(s)}
                  className="font-mono text-[11px] px-3 py-1.5 rounded-md border border-white/10 text-white/40 hover:border-amber-400/50 hover:text-amber-300 transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ── */}
        <div className="border-t border-white/[0.07] px-4 py-3 flex items-center gap-3 bg-[#181818]">
          <span className="font-mono text-xs text-cyan-400">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="type your question..."
            className="flex-1 bg-transparent font-mono text-sm text-cyan-400 outline-none placeholder:text-white/20"
            style={{ fontSize: 15 }}
          />
        </div>
      </div>
    </div>
  );
}
