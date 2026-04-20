export type Project = {
  title: string;
  desc: string;
  tags: string[];
  status: 'production' | 'research' | 'published' | 'live';
  href?: string;
};

export type Publication = {
  title: string;
  journal: string;
  publisher: string;
  year: number;
  tier: string;
  coAuthor?: string;
  href?: string;
  desc: string;
};

export type Poem = {
  title: string;
  lines: string[];
};

export type AdventurePhoto = {
  src: string;
  caption: string;
  location: string;
};

export const projects: Project[] = [
  {
    title: 'Self-Healing API Systems',
    desc: 'Production-grade API orchestration with automatic retry logic, circuit breakers, and observability hooks. Built for enterprise-scale fault tolerance.',
    tags: ['Java', 'Spring Boot', 'AWS', 'Observability'],
    status: 'production',
  },
  {
    title: 'Microbiome Network Architecture',
    desc: 'Computational framework for modeling microbial interaction networks. Collaborative research with Prof. Forest Rohwer at SDSU exploring cross-domain biological patterns.',
    tags: ['Python', 'Network Science', 'Research'],
    status: 'research',
  },
  {
    title: 'Computational Script Similarity',
    desc: 'Published in Oxford University Press journal — computational analysis of structural similarity across ancient writing systems using graph-theoretic approaches.',
    tags: ['Python', 'NLP', 'Graph Theory', 'Published'],
    status: 'published',
    href: 'https://academic.oup.com/dsh/article/39/1/dhae004/7624314',
  },
  {
    title: 'vyshakbellur.github.io',
    desc: 'This portfolio — React 19 + TypeScript + Vite + Tailwind CSS. Custom terminal AMA, adventure photo gallery, and GitHub Pages deployment.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    status: 'live',
    href: 'https://vyshakbellur.github.io',
  },
];

export const publications: Publication[] = [
  {
    title: 'Computational Analysis of Script Similarity Across Ancient Writing Systems',
    journal: 'Digital Scholarship in the Humanities',
    publisher: 'Oxford University Press',
    year: 2024,
    tier: 'Q1 Journal',
    coAuthor: 'Prof. Sam Kassegne',
    href: 'https://academic.oup.com/dsh/article/39/1/dhae004/7624314',
    desc: 'A graph-theoretic framework for measuring structural similarity across ancient scripts. Quantifies evolutionary relationships using topological feature vectors and network centrality metrics.',
  },
  {
    title: 'Cross-Domain Pattern Recognition in Ancient Script Analysis',
    journal: "Master's Thesis",
    publisher: 'San Diego State University',
    year: 2019,
    tier: 'Thesis',
    desc: 'Foundational research establishing computational methods for cross-script structural analysis. Applied machine learning to classify glyph morphology across 12 ancient writing systems.',
  },
];

export const poems: Poem[] = [
  {
    title: 'Observer',
    lines: [
      'Between the data and the noise,',
      'a pattern waits — not hidden,',
      'just unasked for.',
      '',
      'The model learns to predict.',
      'The human learns to wonder.',
      'Neither knows which came first.',
    ],
  },
  {
    title: 'What the Marathon Taught Me',
    lines: [
      'Mile 18 is where the math stops working.',
      'The plan dissolves.',
      'Only the legs remember why.',
      '',
      'There is no algorithm for this —',
      'only forward,',
      'only now.',
    ],
  },
  {
    title: 'Naada',
    lines: [
      'the primordial sound,',
      'before language claimed it.',
      '',
      'Every raga is a question',
      'the fingers ask the string.',
      'Every silence between notes',
      'is where the answer lives.',
    ],
  },
];

export const adventurePhotos: AdventurePhoto[] = [
  { src: '/adventure/dubai-zipline.jpg', caption: 'Dubai XLine', location: 'Dubai, UAE' },
  { src: '/adventure/kayaking.jpg', caption: 'White Water Kayaking', location: 'Colorado' },
  { src: '/adventure/paragliding-takeoff.jpg', caption: 'Paragliding', location: 'California' },
  { src: '/adventure/skydive-florida.jpg', caption: 'Skydive', location: 'Florida' },
  { src: '/adventure/skydive-freefall.jpg', caption: 'Freefall', location: 'Florida' },
  { src: '/adventure/rope-bridge.jpg', caption: 'Canyon Traverse', location: 'West Virginia' },
  { src: '/adventure/skydive-keys.jpg', caption: 'Skydive over the Keys', location: 'Florida Keys' },
];

export const consoleKnowledge: Record<string, string> = {
  'who are you': 'I am Vyshak Bellur — ML engineer at JPMorgan Chase, researcher, musician, and marathon runner based in New Jersey.',
  'publications': 'Published in Oxford University Press (Digital Scholarship in the Humanities, 2024). Co-authored with Prof. Sam Kassegne — computational analysis of ancient script similarity using graph theory.',
  'research': 'My research spans computational linguistics, microbiome network modeling (with Prof. Forest Rohwer at SDSU), and enterprise LLM architectures.',
  'music': 'I run v_naada — a music channel with Chinmayi. We explore classical and contemporary Indian music. Find us on YouTube and Instagram @v_naada.',
  'running': 'Completed 1 full marathon, 5+ half marathons. Currently training for NYC Marathon.',
  'rcb': 'Royal Challengers Bangalore. Always. We believe. Ee sala cup namde.',
  'travel': 'Dubai, Florida Keys, Amalfi Coast, Rome, Pisa, West Virginia, California. Skydived over the Keys. Zip-lined in Dubai. Always planning the next one.',
  'tech stack': 'JPMorgan: React/TypeScript, Java, AWS. Personal: Python, LLMs, RAG systems. This site: React 19 + Vite + Tailwind.',
  'contact': 'LinkedIn: linkedin.com/in/vyshak-bellur-40a072310 | GitHub: github.com/vyshakbellur',
  'help': 'Try: who are you · publications · research · music · running · rcb · travel · tech stack · contact',
};

export const hobbiesInfo = {
  music: {
    channel: 'v_naada',
    description: 'A music channel exploring the intersection of classical Indian traditions and contemporary expression. We perform, record, and share the experience of sound.',
    instagram: 'https://instagram.com/v_naada',
    youtube: 'https://youtube.com/@v_naada',
  },
  running: {
    stats: [
      { label: 'Full Marathon', value: '26.2', unit: 'mi' },
      { label: 'Half Marathons', value: '5+', unit: 'races' },
      { label: 'Next Goal', value: 'NYC', unit: 'Marathon' },
    ],
    description: 'Half marathons, one full marathon, training for NYC Marathon. NYRR member — race results and training log below.',
    // TODO: replace with actual NYRR profile URL
    nyrrHref: 'https://results.nyrr.org/runner/[VYSHAK_NYRR_ID]/races',
  },
  travel: {
    places: ['Dubai', 'Florida Keys', 'Amalfi Coast', 'Rome', 'Pisa', 'West Virginia', 'California'],
    description: 'I collect experiences that push the edge — zip-lines off skyscrapers, skydives over turquoise water, canyon rope bridges. The world is too varied to stay comfortable.',
  },
};
  