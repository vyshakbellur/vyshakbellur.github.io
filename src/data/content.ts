export type ExperienceItem = {
    title: string;
    org: string;
    time: string;
    bullets: string[];
  };
  
  export type Project = {
    title: string;
    href: string;
    desc: string;
    tags: string[];
  };
  
  export type Writing = {
    title: string;
    href: string;
    where: string;
    tag: string;
    blurb: string;
  };
  
  export const experience: ExperienceItem[] = [
    {
      title: "Software Engineer (SDE III)",
      org: "JPMorgan Chase & Co.",
      time: "Present",
      bullets: [
        "Build and maintain full-stack applications using React/TypeScript, Java, and AWS in a large-scale enterprise environment.",
        "Develop and integrate internal APIs and microservices with focus on reliability, security, and performance.",
        "Collaborate across product, platform, and engineering teams to deliver features and improve developer productivity.",
        "Explore ML/LLM-driven patterns (RAG, evaluation, observability) for practical enterprise use cases.",
      ],
    },
    // Add prior roles below (keep short; link to LinkedIn for full history)
  ];
  
  export const projects: Project[] = [
    {
      title: "LLM / RAG Prototypes",
      href: "https://github.com/vyshakbellur",
      desc: "Experiments around retrieval, context management, and practical LLM system patterns.",
      tags: ["LLMs", "RAG", "Systems"],
    },
    {
      title: "Full-Stack Builds",
      href: "https://github.com/vyshakbellur",
      desc: "React + API services focused on clean UX and maintainable architecture.",
      tags: ["React", "APIs", "Cloud"],
    },
    {
      title: "Legacy Portfolio Projects",
      href: "https://vyshakbellur.github.io/",
      desc: "Older web builds and academic projects (kept for reference).",
      tags: ["Web", "Archive"],
    },
  ];
  
  export const writing: Writing[] = [
    {
      title:
        "Bridging the Context Gap: A Technical Analysis of LLM Limitations and Enterprise Architectures",
      href:
        "https://medium.com/@vyshak.x.bellur/bridging-the-context-gap-a-technical-analysis-of-llm-limitations-and-enterprise-architectures-d961dc35dcfc",
      where: "Medium",
      tag: "LLMs / Enterprise",
      blurb:
        "A technical deep dive into why context breaks at scale and how enterprise architectures can mitigate limitations with retrieval, orchestration, and governance.",
    },
  ];
  