import { useEffect, useRef, useState } from 'react';

/* ── Published Literature ── */
const PUBLICATIONS = [
  {
    title: 'Machine learning techniques for exploring influence, commonalities, and shared origin of scripts',
    subtitle: 'Ethiopic, Armenian, Georgian, and Caucasian Albanian scripts',
    journal: 'Digital Scholarship in the Humanities',
    publisher: 'Oxford University Press',
    year: '2024',
    coAuthor: 'Prof. Sam Kassegne',
    href: 'https://academic.oup.com/dsh/article/41/2/1092/8539597',
  },
  {
    title: 'Machine Learning Techniques for Identification of Commonalities and Shared Origin of Language Scripts',
    journal: 'MS Thesis',
    publisher: 'San Diego State University',
    year: '2019',
    href: 'https://www.proquest.com/openview/194737039beaa878147991fc6e8aa954/1?pq-origsite=gscholar&cbl=18750&diss=y',
  },
];

/* ── Medium Feed ── */
const MEDIUM_USERNAME = 'vyshak.x.bellur';
const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

const SEED_ARTICLES = [
  {
    title: 'Bridging the Context Gap: A Technical Analysis of LLM Limitations and Enterprise Architectures',
    link: 'https://medium.com/@vyshak.x.bellur/bridging-the-context-gap-a-technical-analysis-of-llm-limitations-and-enterprise-architectures-d961dc35dcfc',
    pubDate: '2024-01-01',
    description: 'A technical deep dive into why context breaks at scale and how enterprise architectures can mitigate limitations.',
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
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').slice(0, 140).trim() + '…';
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
            data.items.slice(0, 6).map((item: Record<string, unknown>) => ({
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
    <div ref={sectionRef} className="mx-auto max-w-6xl px-5 py-8">
      {/* Header */}
      <div className="section-enter mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white/95 md:text-5xl mb-6">
          Research & Writing
        </h1>
        <p className="text-lg md:text-xl text-white/60 font-light max-w-3xl leading-relaxed">
          Exploring the intersection of algorithms and origins. My published work and technical writing focus on applying modern machine learning architectures to complex, unstructured data — from ancient linguistics to enterprise systems.
        </p>
        <div className="mt-10 h-px w-full bg-white/10" />
      </div>

      {/* Two-column: Published | Articles */}
      <div className="grid gap-8 lg:grid-cols-2 items-start">

        {/* ── LEFT: Published Literature ── */}
        <div className="section-enter">
          <div className="mb-8 text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">Academic Publications</div>
          <div className="space-y-10">
            {PUBLICATIONS.map((p, index) => {
              const isHero = index === 0;
              return (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group block ${isHero ? 'bg-white/[0.02] p-6 -mx-6 rounded-2xl border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm ${isHero ? 'bg-amber-400 text-amber-950' : 'text-amber-400/80 border border-amber-400/20'}`}>
                      {p.publisher}
                    </span>
                    {isHero && (
                      <span className="text-[10px] font-bold tracking-[0.1em] text-emerald-400/90 uppercase border border-emerald-400/20 px-2 py-0.5 rounded-sm">
                        Peer-Reviewed
                      </span>
                    )}
                    <span className="text-xs font-mono text-white/40">{p.year}</span>
                  </div>
                  <h3 className={`${isHero ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold leading-tight text-white/95 mb-3 group-hover:text-white transition-colors`}>
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className={`${isHero ? 'text-lg' : 'text-base'} text-white/60 font-light italic mb-5`}>{p.subtitle}</p>
                  )}
                  <div className={`flex items-center justify-between border-t ${isHero ? 'border-white/10 pt-5 mt-3' : 'border-white/5 pt-4 mt-2'}`}>
                    <span className="text-xs text-white/50 font-mono">
                      {p.journal}{p.coAuthor ? ` · ${p.coAuthor}` : ''}
                    </span>
                    <span className="text-sm text-amber-400/0 group-hover:text-amber-400/90 transition-colors transform group-hover:translate-x-1">→</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Medium Articles ── */}
        <div className="section-enter">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">Articles</div>
            <a
              href={`https://medium.com/@${MEDIUM_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-semibold tracking-wider text-white/30 hover:text-amber-400/70 transition-colors uppercase"
            >
              Medium ↗
            </a>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 rounded-lg bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {articles.map((a) => (
                <a
                  key={a.link}
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-white/[0.05] transition-colors"
                >
                  <h3 className="text-xs font-medium leading-snug text-white/70 group-hover:text-white/95 transition-colors truncate">
                    {a.title}
                  </h3>
                  <span className="text-[10px] text-white/25 shrink-0">{a.pubDate.slice(0, 7)}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
