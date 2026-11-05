import { careerProjects, products } from "./projects";
import type { Period, Project, Role } from "./types";

export { certifications } from "./certifications";
export { education } from "./education";
export { experience } from "./experience";
export { heroProducts, profile, sectors, stats } from "./profile";
export { careerProjects, products } from "./projects";
export { skillGroups } from "./skills";
export type * from "./types";

const CAREER_START_YEAR = 2008;

/** Years since the first role. Note that the published "18+" stat comes from profile.ts. */
export function yearsOfExperience(now: Date = new Date()): number {
  return now.getFullYear() - CAREER_START_YEAR;
}

export function getFeaturedProjects() {
  return careerProjects.filter((project) => project.featured);
}

export function getAllProjects(): Project[] {
  return [...careerProjects, ...products];
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

/** Unconfirmed parts are dropped rather than shown as placeholders. */
export function formatPeriod(period: Period | null): string | null {
  if (!period) return null;
  const { start, end } = period;
  if (start === null) return end === "present" ? "present" : null;
  if (end === null) return `${start}–`;
  return `${start}–${end === "present" ? "present" : end}`;
}

export type RoleBlock =
  { type: "single"; role: Role } | { type: "group"; name: string; roles: Role[] };

/** Collapses consecutive roles sharing a group into one block, keeping order. */
export function groupRoles(roles: Role[]): RoleBlock[] {
  const blocks: RoleBlock[] = [];
  for (const role of roles) {
    const last = blocks.at(-1);
    if (role.group && last?.type === "group" && last.name === role.group) {
      last.roles.push(role);
    } else if (role.group) {
      blocks.push({ type: "group", name: role.group, roles: [role] });
    } else {
      blocks.push({ type: "single", role });
    }
  }
  return blocks;
}
