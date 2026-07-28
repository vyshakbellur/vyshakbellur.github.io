import { useEffect, useRef, useState } from 'react';

const MEDIUM_USERNAME = 'vyshak.x.bellur';
const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

const SEED_ARTICLES = [
  {
    title: 'Bridging the Context Gap: A Technical Analysis of LLM Limitations and Enterprise Architectures',
    link: 'https://medium.com/@vyshak.x.bellur/bridging-the-context-gap-a-technical-analysis-of-llm-limitations-and-enterprise-architectures-d961dc35dcfc',
    pubDate: '2024-01-01',
    description: 'A technical deep dive into why context breaks at scale and how enterprise architectures can mitigate limitations with retrieval, orchestration, and governance.',
    categories: ['LLMs', 'Enterprise'],
  },
];

type Article = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').slice(0, 180).trim() + '...';
}

export default function Writing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(RSS_URL)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'ok' && data.items?.length) {
          setArticles(
            data.items.slice(0, 8).map((item: Record<string, unknown>) => ({
              title: item.title as string,
              link: item.link as string,
              pubDate: ((item.pubDate as string) ?? '').slice(0, 10),
              description: stripHtml((item.description as string) ?? ''),
              categories: (item.categories as string[]) ?? [],
            }))
          );
        } else {
          setArticles(SEED_ARTICLES);
        }
      })
      .catch(() => setArticles(SEED_ARTICLES))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) el.querySelectorAll('.section-enter').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [articles]);

  return (
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-14">
      <div className="section-enter mb-10">
        <div className="mb-2 text-xs font-semibold tracking-widest text-white/55 uppercase">Thought Leadership</div>
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-300 bg-clip-text text-transparent">
            Writing
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-white/80">
          Technical writing on enterprise AI, system design, and engineering at scale. Each article represents original analysis from production experience and applied research. Auto-synced from{' '}
          <a
            href={`https://medium.com/@${MEDIUM_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Medium
          </a>
        </p>
        <div className="mt-4 h-px w-full bg-white/14" />
      </div>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-white/14 bg-white/[0.06] p-6 animate-pulse">
              <div className="h-3 w-16 bg-white/10 rounded mb-4" />
              <div className="h-4 w-full bg-white/10 rounded mb-2" />
              <div className="h-4 w-3/4 bg-white/10 rounded mb-4" />
              <div className="h-3 w-full bg-white/5 rounded mb-1" />
              <div className="h-3 w-2/3 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Featured Article (first one) */}
          {articles.length > 0 && (
            <a
              key={articles[0].link}
              href={articles[0].link}
              target="_blank"
              rel="noreferrer"
              className="section-enter group block rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-8 transition hover:bg-amber-400/[0.07]"
            >
              <div className="mb-2 text-[10px] font-semibold tracking-widest uppercase text-amber-400/70">Featured</div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs text-white/55">{articles[0].pubDate}</span>
                {articles[0].categories[0] && (
                  <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-xs text-amber-300">
                    {articles[0].categories[0]}
                  </span>
                )}
              </div>
              <div className="mb-3 text-lg font-bold leading-snug text-white/95">{articles[0].title}</div>
              <p className="text-sm leading-[1.65] text-white/80 mb-4">{articles[0].description}</p>
              <div className="text-xs font-semibold text-amber-400/70 group-hover:text-amber-400 transition-colors">Read on Medium ↗</div>
            </a>
          )}

          {/* Remaining articles */}
          <div className="grid gap-5 md:grid-cols-2">
            {articles.slice(1).map((w) => (
              <a
                key={w.link}
                href={w.link}
                target="_blank"
                rel="noreferrer"
                className="section-enter group rounded-2xl border border-white/14 bg-white/[0.06] p-6 transition hover:bg-white/[0.10]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-white/50">{w.pubDate}</span>
                  {w.categories[0] && (
                    <span className="rounded-full border border-white/14 bg-white/[0.06] px-2 py-0.5 text-xs text-white/70">
                      {w.categories[0]}
                    </span>
                  )}
                </div>
                <div className="mb-2 font-semibold leading-snug text-white/95">{w.title}</div>
                <p className="text-sm leading-[1.7] text-white/75">{w.description}</p>
                <div className="mt-4 text-xs font-medium text-white/60 group-hover:text-amber-400 transition-colors">Read on Medium ↗</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
