import { useState, useRef, useEffect } from 'react';
import { consoleKnowledge } from '../data/content';

type Message = { type: 'input' | 'output'; text: string };

const suggestions = ['Ask about AI in FinTech', 'Tell me about Metagenomics'];

const WORKER_URL = 'https://chatbot-llm.vyshak-bellur.workers.dev';

async function fetchLLMResponse(input: string): Promise<string> {
  const q = input.toLowerCase().trim();
  
  // First, check local hardcoded knowledge for instant responses
  for (const [key, val] of Object.entries(consoleKnowledge)) {
    if (q.includes(key)) return val;
  }

  // Fallback to calling the secure worker API
  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q }),
    });
    
    if (!res.ok) throw new Error('API down');
    
    const data = await res.json();
    return data.reply || "I am currently disconnected from my neural cortex.";
  } catch (err) {
    console.error("LLM Error:", err);
    return "The LLM routing is currently undergoing maintenance. Ask me something from my local logic (experience, running, publications).";
  }
}

export default function Console() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'output', text: "Welcome. I am Vyshak's interactive portfolio console." },
    { type: 'output', text: "Ask me anything. Type 'help' for suggestions." },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) el.querySelectorAll('.section-enter').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (query?: string) => {
    const q = (query ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { type: 'input', text: q }]);
    setInput('');
    setThinking(true);
    
    const reply = await fetchLLMResponse(q);
    setThinking(false);
    setMessages((m) => [...m, { type: 'output', text: reply }]);
  };

  return (
    <div id="console" ref={sectionRef} className="w-full">
      <div className="section-enter console-window w-full">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gold/10">
            <span className="w-3 h-3 rounded-full bg-ember" />
            <span className="w-3 h-3 rounded-full bg-gold" />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} />
            <span className="ml-3 font-mono text-xs text-mist">vyshak@bellur ~ ask</span>
          </div>

          <div
            className="px-4 py-4 space-y-2 overflow-y-auto"
            style={{ minHeight: '200px', maxHeight: '320px' }}
            onClick={() => inputRef.current?.focus()}
          >
            {messages.map((msg, i) => (
              <div key={i} className="flex gap-2">
                <span className="font-mono text-xs text-mist shrink-0 mt-0.5">
                  {msg.type === 'input' ? '❯' : '→'}
                </span>
                <p className={`font-mono text-sm leading-relaxed ${msg.type === 'input' ? 'text-gold' : 'text-cream/80'}`}>
                  {msg.text}
                </p>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-2">
                <span className="font-mono text-xs text-mist">→</span>
                <span className="font-mono text-sm text-mist animate-blink">▋</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-gold/10 px-4 py-3 flex items-center gap-2">
            <span className="font-mono text-xs text-gold">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="type your question..."
              className="flex-1 bg-transparent font-mono text-sm text-cream outline-none placeholder:text-mist/40"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>

        <div className="section-enter mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSubmit(s)}
              className="font-mono text-xs px-3 py-1.5 border border-cream/10 text-mist hover:border-gold/40 hover:text-gold transition-all"
            >
              {s}
            </button>
          ))}
        </div>
    </div>
  );
}
