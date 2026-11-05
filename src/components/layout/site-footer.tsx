import { Container } from "@/components/ui/container";
import { profile } from "@/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p className="text-accent">
          <span aria-hidden="true">● </span>all systems operational
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {profile.socials.map((social) => (
            <li key={social.url}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 hover:text-text"
              >
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/rss.xml" className="inline-block py-1 hover:text-text">
              RSS
            </a>
          </li>
        </ul>
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with Next.js · deployed on Vercel
        </p>
      </Container>
    </footer>
  );
}
