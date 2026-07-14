// SCALESY — shared content types.

export interface WorkSection {
  heading: string;
  body: string;
}

export interface WorkProject {
  slug: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  name: string;
  industry: string;
  location: string;
  year: string;
  services: string[];
  image: string;
  featured: boolean;
  excerpt: string;
  intro: string;
  sections: WorkSection[];
}

export interface Insight {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  readingTime: string;
  excerpt: string;
  body: string[];
}

export interface Discipline {
  n: string;
  key: string;
  title: string;
  tagline: string;
  body: string;
  caps: string[];
  feeds: string;
}

export interface Service {
  title: string;
  summary: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Founder {
  name: string;
  role: string;
}

export interface Studio {
  statement: string[];
  founded: string;
  signature: string;
  image: string;
  founders: Founder[];
}

export interface ProofFigure {
  value?: string;
  count?: number;
  pad?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
}

export interface BookingFormConfig {
  formId: string;
  entries: Record<'name' | 'email' | 'phone' | 'company' | 'service' | 'message', string>;
  serviceOptions: string[];
}
