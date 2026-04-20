import { useState, useRef, useEffect } from 'react';
import { consoleKnowledge } from '../data/content';

type Message = { type: 'input' | 'output'; text: string };

const suggestions = ['who are you', 'publications', 'music', 'running', 'rcb', 'travel', 'tech stack', 'contact'];

function getResponse(input: string): string {
  const q = input.toLowerCase().trim();
  for (const [key, val] of Object.entries(consoleKnowledge)) {
    if (q.includes(key)) return val;
  }
  return "Command not recognized. Type 'help' to see available commands.";
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
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleSubmit = (query?: string) => {
    const q = (query ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { type: 'input', text: q }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, { type: 'output', text: getResponse(q) }]);
    }, 600);
  };

  return (
    <section id="console" ref={sectionRef} className="py-24 bg-ink-soft">
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-enter mb-12">
          <div className="tag mb-4">AMA</div>
          <h2 className="font-display font-bold text-cream text-4xl md:text-5xl">
            Ask Me{' '}
            <span className="text-gold-gradient">Anything</span>
          </h2>
          <div className="gold-line" />
        </div>

        <div className="section-enter console-window" style={{ maxWidth: '720px' }}>
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
    </section>
  );
}
