/**
 * Portfolio content — edit this file to update the site.
 *
 * Source of truth: "PORTFOLIO (2).pdf" (20 pages). Every project link below is the
 * exact URL annotation extracted from the PDF page noted in `pdfPage`.
 * Artwork lives in /public/work/<slug>/ and was extracted from the PDF at its
 * original embedded resolution.
 */

export type CategoryId = "strategy" | "ideas";

export const categories: { id: CategoryId; label: string; short: string }[] = [
  { id: "strategy", label: "Content Strategies", short: "Strategy" },
  { id: "ideas", label: "Content Ideas & Content Writing", short: "Ideas & Writing" },
];

export type Artwork = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  id: string;
  brand: string;
  /** What the brand does, as shown on its own logo or artwork in the PDF. */
  sector: string;
  category: CategoryId;
  logo: Artwork;
  /** Social posts shown in the PDF. Content-strategy pages only show the logo. */
  artwork: Artwork[];
  link: string;
  linkLabel: string;
  pdfPage: number;
  /** Background tone for logo tiles, sampled from the original logo. */
  tone: string;
  /** Text colour that reads on `tone`. */
  ink: string;
  /** Arabic-language artwork (rendered with dir="rtl" alt text). */
  arabic?: boolean;
};

const img = (src: string, width: number, height: number, alt: string): Artwork => ({
  src,
  width,
  height,
  alt,
});

const post = (slug: string, n: number, brand: string, w = 540, h = 675) =>
  img(`/work/${slug}/0${n}.webp`, w, h, `${brand} social media post ${n}`);

const DRIVE = "Google Drive";

export const projects: Project[] = [
  // ——— Content Strategies (PDF pages 7–8) ———
  {
    id: "wave-fit-strategy",
    brand: "Wave Fit EMS Egypt",
    sector: "EMS fitness",
    category: "strategy",
    logo: img("/work/wave-fit/logo.webp", 150, 150, "Wave Fit EMS Egypt logo"),
    artwork: [],
    link: "https://drive.google.com/file/d/1YtnbebEBFUg_9W5oxEX45zxX7WD6mgac/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 7,
    tone: "#FFFFFF",
    ink: "#45302C",
  },
  {
    id: "elegant-smile-strategy",
    brand: "Elegant Smile Dental Clinic",
    sector: "Dental clinic",
    category: "strategy",
    logo: img("/work/elegant-smile/logo.webp", 150, 150, "Elegant Smile Dental Clinic logo"),
    artwork: [],
    link: "https://drive.google.com/file/d/1bp46Vmjz7dLS6v48Eh3p476T1NEng6Iv/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 7,
    tone: "#0B0B0B",
    ink: "#FAF6F0",
  },
  {
    id: "seamaty-strategy",
    brand: "Seamaty",
    sector: "Diagnostic analyzers",
    category: "strategy",
    logo: img("/work/seamaty/logo.webp", 150, 150, "Seamaty logo"),
    artwork: [],
    link: "https://drive.google.com/file/d/1y3mcKDtKI38BcFruuuUMHmpmcYo0l46w/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 8,
    tone: "#FFFFFF",
    ink: "#45302C",
  },
  {
    id: "biora-strategy",
    brand: "Biora",
    sector: "Healthy & pure products",
    category: "strategy",
    logo: img("/work/biora/logo.webp", 461, 461, "Biora — Healthy & Pure Products logo"),
    artwork: [],
    link: "https://drive.google.com/file/d/1BcnX5uPomizzh3MHjV48-tMF5Mcp-UEc/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 8,
    tone: "#FFFFFF",
    ink: "#45302C",
  },

  // ——— Content Ideas & Content Writing (PDF pages 9–18) ———
  {
    id: "hadecor",
    brand: "Hadecor",
    sector: "Medical & hospitality décor",
    category: "ideas",
    logo: img("/work/hadecor/logo.webp", 350, 350, "Hadecor — Medical and Hospitality Décor logo"),
    artwork: [1, 2, 3, 4].map((n) => post("hadecor", n, "Hadecor")),
    link: "https://drive.google.com/file/d/1p3JgVZVippKGbt6-tBqutQf2skUjVxqI/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 9,
    tone: "#F4F7FA",
    ink: "#45302C",
    arabic: true,
  },
  {
    id: "elite",
    brand: "Elite",
    sector: "Bags & everyday carry",
    category: "ideas",
    logo: img("/work/elite/logo.webp", 432, 432, "Elite logo"),
    artwork: [1, 2, 3, 4].map((n) => post("elite", n, "Elite")),
    link: "https://drive.google.com/file/d/1xcS7tMn-H5KlOnYMQmuVv5-ldCIChwPK/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 10,
    tone: "#FFFFFF",
    ink: "#45302C",
  },
  {
    id: "quick-connect",
    brand: "Quick Connect",
    sector: "Delivery & fulfilment",
    category: "ideas",
    logo: img("/work/quick-connect/logo.webp", 150, 150, "Quick Connect logo"),
    artwork: [1, 2, 3, 4].map((n) => post("quick-connect", n, "Quick Connect")),
    link: "https://drive.google.com/file/d/1Esmo4I9Ts8kv-aQ4qrxM5SWxgTbOPdx3/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 11,
    tone: "#F26A1B",
    ink: "#FFFFFF",
    arabic: true,
  },
  {
    id: "shams",
    brand: "Shams",
    sector: "Daily intention cards",
    category: "ideas",
    logo: img("/work/shams/logo.webp", 150, 150, "Shams sun logo"),
    artwork: [
      post("shams", 1, "Shams", 512, 640),
      post("shams", 2, "Shams", 512, 640),
      post("shams", 3, "Shams"),
      post("shams", 4, "Shams", 512, 640),
    ],
    link: "https://drive.google.com/file/d/1POHqhKvWtC4a_fenHfLyWIgsX9jzwxal/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 12,
    tone: "#D9AE36",
    ink: "#2B1F0E",
    arabic: true,
  },
  {
    id: "sedra",
    brand: "Sedra Shapely",
    sector: "Shapewear",
    category: "ideas",
    logo: img("/work/sedra/logo.webp", 300, 300, "Sedra Shapely logo"),
    artwork: [1, 2, 3, 4].map((n) => post("sedra", n, "Sedra Shapely")),
    link: "https://drive.google.com/file/d/1pSn2SJZ79A4ULyvngQRLn82krEDlKhuM/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 13,
    tone: "#0B0B0B",
    ink: "#E3C58B",
  },
  {
    id: "babytime",
    brand: "BabyTime",
    sector: "Baby care",
    category: "ideas",
    logo: img("/work/babytime/logo.webp", 400, 400, "BabyTime logo"),
    artwork: [
      post("babytime", 1, "BabyTime"),
      post("babytime", 2, "BabyTime"),
      post("babytime", 3, "BabyTime", 600, 600),
      post("babytime", 4, "BabyTime", 600, 600),
    ],
    link: "https://docs.google.com/presentation/d/1PJYnyZF2Hv4zjoDXRYdVl6khoeZYI55D/edit?usp=sharing&ouid=103221135985575536982&rtpof=true&sd=true",
    linkLabel: "Google Slides",
    pdfPage: 14,
    tone: "#FFFFFF",
    ink: "#45302C",
    arabic: true,
  },
  {
    id: "sign-egypt",
    brand: "Sign Egypt Advertising",
    sector: "Signage & advertising",
    category: "ideas",
    logo: img("/work/sign-egypt/logo.webp", 150, 150, "Sign Egypt Advertising logo"),
    artwork: [
      post("sign-egypt", 1, "Sign Egypt", 627, 627),
      post("sign-egypt", 2, "Sign Egypt", 627, 627),
    ],
    link: "https://drive.google.com/file/d/1EXiYCpoiGFxEAQ5f91wlhlcVyv5tA1hp/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 15,
    tone: "#D8D8D8",
    ink: "#1A1A1A",
    arabic: true,
  },
  {
    id: "seamaty-ideas",
    brand: "Seamaty",
    sector: "Diagnostic analyzers",
    category: "ideas",
    logo: img("/work/seamaty/logo-2.webp", 150, 150, "Seamaty logo"),
    artwork: [1, 2].map((n) => post("seamaty", n, "Seamaty")),
    // Note: the PDF links this page to the same file as the Seamaty content strategy (page 8).
    link: "https://drive.google.com/file/d/1y3mcKDtKI38BcFruuuUMHmpmcYo0l46w/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 16,
    tone: "#FFFFFF",
    ink: "#45302C",
  },
  {
    id: "la-siesta",
    brand: "La Siesta",
    sector: "Restaurant & café",
    category: "ideas",
    logo: img("/work/la-siesta/logo.webp", 150, 150, "La Siesta Restaurant & Café logo"),
    artwork: [1, 2, 3].map((n) => post("la-siesta", n, "La Siesta", 576, 576)),
    link: "https://drive.google.com/file/d/15GshBDPw_y3SjFhf46VuZefbQtTeo82P/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 17,
    tone: "#0B0B0B",
    ink: "#FAF6F0",
  },
  {
    id: "sidamo",
    brand: "Sidamo",
    sector: "Cozy coffee nook",
    category: "ideas",
    logo: img("/work/sidamo/logo.webp", 150, 150, "Sidamo — Cozy Coffee Nook logo"),
    artwork: [post("sidamo", 1, "Sidamo", 512, 640), post("sidamo", 2, "Sidamo")],
    link: "https://drive.google.com/file/d/1KQSOugoXSk3LgfzO0kU7Ruw9AMxWVCHT/view?usp=sharing",
    linkLabel: DRIVE,
    pdfPage: 18,
    tone: "#9DB58C",
    ink: "#FFFFFF",
  },
];

/** Shown as large cinematic previews before the full gallery. */
export const featuredIds = ["quick-connect", "shams", "elite", "hadecor"];

export const featuredCopy: Record<string, { kicker: string; line: string }> = {
  "quick-connect": { kicker: "Arabic social content", line: "Speed, care and control — told in bold orange." },
  shams: { kicker: "Arabic social content", line: "Quiet, sunlit moments for a daily ritual." },
  elite: { kicker: "Product storytelling", line: "One bag, three ways, real-life energy." },
  hadecor: { kicker: "Arabic social content", line: "Turning medical interiors into human stories." },
};

export const profile = {
  name: "Shahd Hesham",
  firstName: "Shahd",
  role: "Content Creator & Creative Storyteller",
  email: "shahdhesham2244@gmail.com",
  phoneDisplay: "01282400729",
  phoneHref: "tel:+201282400729",
  bio: "I’m Shahd, a content creator passionate about storytelling, creative thinking, and marketing. My journey began at the Faculty of Mass Communication, where I majored in Public Relations and Advertising. Since then, I’ve been continuously developing my skills through hands-on experience, working across different industries and managing multiple accounts. I enjoy turning ideas into meaningful content that captures attention, connects with audiences, and helps brands communicate their value.",
  education: {
    degree: "Bachelor of Mass Communication",
    major: "Public Relations & Advertising",
    school: "Cairo University",
    gpa: "3.9",
  },
  highlights: [
    "1+ year of experience in content creation, social media marketing & account management.",
    "Worked at 2 marketing agencies, managing client accounts, developing content strategies, and planning creative content across different industries.",
    "Freelance experience working with different brands, developing tailored content plans and marketing strategies.",
  ],
};

export const experience = [
  {
    company: "Vook Marketing Agency",
    role: "Account Manager & Content Creator",
    period: "November 2025 — Present",
    current: true,
    points: [
      "Develop creative content strategies aligned with brand goals.",
      "Manage content planning, client communication, and execution.",
    ],
  },
  {
    company: "Al Fares Marketing Agency",
    role: "Content Creator",
    period: "July 2025 — November 2025",
    current: false,
    points: [
      "Create engaging content ideas and tailored content calendars.",
      "Support campaigns and manage online communities.",
    ],
  },
  {
    company: "Freelance",
    role: "Content Creator",
    period: "Independent work",
    current: false,
    points: [
      "Work with different brands, developing tailored content plans and marketing strategies.",
    ],
  },
];

/** The eight skills from PDF page 6. Descriptions explain each service. */
export const services = [
  {
    title: "Social Media Account Management",
    blurb: "Looking after a brand’s accounts end to end, so its voice stays consistent and its community feels heard.",
    tags: ["Accounts", "Community", "Consistency"],
  },
  {
    title: "Content Strategy & Research",
    blurb: "Building the plan behind the posts — who we talk to, what we say, and why it matters to the brand.",
    tags: ["Audience", "Pillars", "Goals"],
  },
  {
    title: "Script Writing",
    blurb: "Writing scripts that hook in the first seconds and carry a clear story to the end.",
    tags: ["Hooks", "Reels", "Storytelling"],
  },
  {
    title: "Competitor Research",
    blurb: "Studying the market and competitors to find the gaps a brand can own.",
    tags: ["Market", "Benchmarks", "Gaps"],
  },
  {
    title: "Content Ideation",
    blurb: "Turning briefs into fresh, scroll-stopping ideas that still feel true to the brand.",
    tags: ["Concepts", "Angles", "Trends"],
  },
  {
    title: "Content Calendar Planning",
    blurb: "Mapping ideas into tailored calendars with the right rhythm, occasions and balance.",
    tags: ["Rhythm", "Occasions", "Planning"],
  },
  {
    title: "Caption Writing & Tone of Voice",
    blurb: "Finding how a brand sounds — then writing captions in Arabic and English that sound exactly like it.",
    tags: ["Captions", "TOV", "Copy"],
  },
  {
    title: "Content Scheduling & Publishing",
    blurb: "Getting the right content out at the right moment, organised and on time.",
    tags: ["Scheduling", "Publishing", "Timing"],
  },
];

export const process = [
  { step: "Discover", text: "Understand the brand, its goals and the people it wants to reach.", skills: ["Account Management"] },
  { step: "Research", text: "Study the audience, the market and what competitors are doing.", skills: ["Strategy & Research", "Competitor Research"] },
  { step: "Ideate", text: "Shape angles and concepts, then map them into a content calendar.", skills: ["Content Ideation", "Calendar Planning"] },
  { step: "Create", text: "Write the scripts and captions that bring each idea to life in the brand’s voice.", skills: ["Script Writing", "Captions & TOV"] },
  { step: "Publish", text: "Schedule, publish and keep the conversation going.", skills: ["Scheduling & Publishing"] },
];
