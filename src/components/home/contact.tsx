import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { profile } from "@/content";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";

export function Contact() {
  return (
    <Section
      id="contact"
      index="08"
      eyebrow="contact"
      title="Get in touch"
      intro={profile.availability.open ? `${profile.availability.label}.` : undefined}
    >
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <Card className="relative">
          <ContactForm />
        </Card>
        <div className="space-y-6">
          {profile.email ? (
            <div>
              <h3 className="mb-2 font-mono text-xs text-muted">email</h3>
              <CopyEmail email={profile.email} />
            </div>
          ) : null}
          <div>
            <h3 className="mb-2 font-mono text-xs text-muted">elsewhere</h3>
            <ul className="space-y-1">
              {profile.socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center gap-1.5 font-mono text-sm hover:text-accent"
                  >
                    {social.label}
                    <ExternalLink aria-hidden="true" className="size-3.5 text-muted" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="font-mono text-xs leading-relaxed text-muted">
            {profile.location} · {profile.locationNote}
          </p>
        </div>
      </div>
    </Section>
  );
}
