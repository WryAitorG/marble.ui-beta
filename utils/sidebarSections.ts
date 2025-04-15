export interface SidebarItem {
  slug: string;
  count?: number | null;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const sidebarSections: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { slug: "introduction", count: null },
    ],
  },
  {
    title: "Components",
    items: [
      { slug: "CTA", count: 4 },
      { slug: "headers", count: 2 },
      { slug: "footers", count: 1 },
      { slug: "infinite-scroll", count: 2 },
      { slug: "animate-border", count: 1 },
    ],
  },
];
