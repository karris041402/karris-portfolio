// Shared types. content.ts is checked against these, so a typo in a field name
// (or a wrong category) shows up as an editor error instead of a broken page.

export interface Accent {
  id: string;
  name: string;
  c1: string;
  c2: string;
  c3: string;
}

export type ProjectCategory = 'Web App' | 'Mobile App' | 'AI/ML' | 'Business';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tech: string[];
  /** Folder name inside src/assets/project/ (case-sensitive). Every image in it forms the gallery. */
  folder: string;
  /** Optional filename inside `folder` to use as the card cover. Defaults to the first file. */
  cover?: string;
  /** Full URL, or "" to show the "Case study coming soon" badge. */
  link: string;
  featured: boolean;
}

export interface ProjectFilter {
  label: string;
  value: 'All' | ProjectCategory;
}

export interface Social {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  includes: string[];
}
