export type NavItem = {
  label: string;
  href: string;
  /** Home page section id used for active highlighting. */
  section: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Products", href: "/#products", section: "products" },
  { label: "Blog", href: "/blog", section: "blog" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

/** Palette targets: every home section, including those not in the nav. */
export const paletteSections = [
  ...navItems,
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Certifications", href: "/#certifications", section: "certifications" },
  { label: "All projects", href: "/projects", section: "all-projects" },
];
