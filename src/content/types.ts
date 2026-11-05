export type Status = "running" | "beta" | "building" | "archived";

export type Social = {
  label: string;
  url: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export type Profile = {
  name: string;
  fullName: string;
  title: string;
  location: string;
  locationNote: string;
  /** null until confirmed. The UI hides anything that depends on it. */
  email: string | null;
  url: string;
  socials: Social[];
  shortBio: string;
  valueProp: string;
  narrative: string[];
  currently: string;
  availability: { open: boolean; label: string };
};

export type Period = {
  /** null = not confirmed yet */
  start: number | null;
  /** "present" = ongoing, null = not confirmed yet */
  end: number | "present" | null;
};

export type Role = {
  slug: string;
  title: string;
  company: string;
  period: Period;
  summary?: string;
  bullets: string[];
  tech: string[];
  /** Roles with the same group render together as a progression. */
  group?: string;
};

export type CareerProject = {
  kind: "career";
  slug: string;
  name: string;
  tagline: string;
  role: string;
  company: string | null;
  period: Period | null;
  problem: string;
  approach: string[];
  stack: string[];
  featured: boolean;
  /** Personal note shown on the detail page. */
  note?: string;
};

export type Product = {
  kind: "product";
  slug: string;
  name: string;
  tagline: string;
  /** null = not confirmed yet. The pill is hidden. */
  status: Status | null;
  url: string | null;
  stack: string[];
  highlights: string[];
  /** null until a real screenshot exists at public/products/<slug>.webp */
  screenshot: string | null;
};

export type Project = CareerProject | Product;

export type Skill = {
  name: string;
  /** Finer detail, e.g. the AWS services used. */
  detail?: string;
  years?: number;
};

export type SkillGroup = {
  category: string;
  skills: Skill[];
};

export type Certification = {
  name: string;
  issuer: string;
  /** Short text badge. No trademark logos. */
  monogram: string;
  date: string;
  year: number;
};

export type Education = {
  degree: string;
  institution: string;
  start: number;
  end: number;
};
