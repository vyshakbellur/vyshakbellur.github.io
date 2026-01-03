import { profile } from "./data/profile";
import { experience, projects, writing } from "./data/content";
import { nav } from "./data/nav";

function cn(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-7 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white/95">
            {title}
          </h2>
          {subtitle ? (
            <p className="max-w-3xl text-sm leading-relaxed text-white/65">
              {subtitle}
            </p>
          ) : null}
          <div className="h-px w-full bg-white/10" />
        </div>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[720px] w-[980px] -translate-x-1/2 rounded-full blur-3xl opacity-35
                        bg-gradient-to-r from-fuchsia-500 via-sky-500 to-emerald-400" />
        <div className="absolute bottom-[-260px] left-[-260px] h-[560px] w-[560px] rounded-full blur-3xl opacity-25
                        bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600" />
        <div className="absolute right-[-240px] top-[35%] h-[520px] w-[520px] rounded-full blur-3xl opacity-20
                        bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />
      </div>

      {/* header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#home" className="font-semibold tracking-tight text-white/90 hover:text-white">
            {profile.name}
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href={profile.links.linkedin}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/15"
            target="_blank"
            rel="noreferrer"
          >
            Connect
          </a>
        </div>
      </header>

      {/* hero */}
      <main id="home" className="relative">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-14">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span>{profile.location}</span>
                <span className="text-white/35">•</span>
                <span>Open to impactful work</span>
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                <span className="bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
                  {profile.tagline}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
                I ship production-grade software and explore practical GenAI systems—clean UX, dependable services, and architecture that scales.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={profile.links.resume}
                  className="rounded-xl bg-gradient-to-r from-fuchsia-500 via-sky-500 to-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950"
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                </a>
                <a
                  href={profile.links.github}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={profile.links.medium}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10"
                  target="_blank"
                  rel="noreferrer"
                >
                  Medium
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {profile.highlights.map((x) => (
                  <div key={x.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">{x.k}</div>
                    <div className="mt-1 text-sm font-medium text-white/90">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative">
                  <p className="text-sm text-white/70">Now</p>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                      <div className="text-sm font-medium text-white/90">Building @ JPMC</div>
                      <div className="mt-1 text-sm text-white/65">
                        Full-stack delivery + exploring enterprise LLM patterns.
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                      <div className="text-sm font-medium text-white/90">Writing</div>
                      <div className="mt-1 text-sm text-white/65">
                        Publishing technical breakdowns on LLM limitations + architectures.
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                      <div className="text-sm font-medium text-white/90">Coming soon</div>
                      <div className="mt-1 text-sm text-white/65">
                        “Chat with my profile” (resume + projects) + analytics dashboard.
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["React", "TypeScript", "Java", "AWS", "Python", "LLMs", "RAG"].map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Section
          id="about"
          title="About"
          subtitle="A quick snapshot. Keep the long version on LinkedIn—this page should stay sharp."
        >
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="space-y-3 text-white/75">
                  {profile.about.map((p) => (
                    <p key={p} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/70">Core areas</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Frontend systems",
                    "API design",
                    "Cloud-native delivery",
                    "Observability",
                    "LLM/RAG architecture",
                    "Evaluation & safety",
                  ].map((x) => (
                    <Pill key={x}>{x}</Pill>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm text-white/65">
                  Pro tip: keep project pages tight. 3–6 strong projects beat 20 weak links.
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="experience"
          title="Experience"
          subtitle="Latest first. Keep bullets impact-focused and safe (no internal details)."
        >
          <div className="grid gap-4">
            {experience.map((e) => (
              <div key={e.title + e.org} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="text-lg font-semibold text-white/95">
                    {e.title} <span className="text-white/55">• {e.org}</span>
                  </div>
                  <div className="text-sm text-white/60">{e.time}</div>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/75">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          title="Projects"
          subtitle="Make each card a ‘why it matters’. If it’s not strong, archive it."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group rounded-3xl border border-white/10 bg-white/5 p-6 transition",
                  "hover:-translate-y-0.5 hover:bg-white/10"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white/95">{p.title}</div>
                    <div className="mt-1 text-sm text-white/65">{p.desc}</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>

                <div className="mt-4 text-sm text-white/60 group-hover:text-white/80">
                  Open ↗
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="writing"
          title="Writing"
          subtitle="Your technical writing is a differentiator. Keep it visible."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {writing.map((w) => (
              <a
                key={w.href}
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-white/60">{w.where}</div>
                    <div className="mt-1 font-semibold text-white/95">{w.title}</div>
                  </div>
                  <Pill>{w.tag}</Pill>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{w.blurb}</p>
                <div className="mt-4 text-sm text-white/60">Read ↗</div>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          title="Contact"
          subtitle="Keep this simple. Most recruiters will click LinkedIn or Resume."
        >
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-white/75">
                  The fastest way to reach me is on LinkedIn. I’m happy to discuss full-stack engineering, GenAI systems, and platform architecture.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-gradient-to-r from-fuchsia-500 via-sky-500 to-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950"
                  >
                    Message on LinkedIn
                  </a>
                  <a
                    href={profile.links.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/10"
                  >
                    Open Resume
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/70">Next upgrades</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                  <li>Add analytics (GoatCounter or Cloudflare)</li>
                  <li>Add a small chatbot (FAQ → RAG later)</li>
                  <li>Polish project case studies</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} {profile.name}</div>
            <div className="flex gap-4">
              <a className="hover:text-white" href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="hover:text-white" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="hover:text-white" href={profile.links.medium} target="_blank" rel="noreferrer">
                Medium
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
