import { About } from "@/components/home/about";
import { CaseStudies } from "@/components/home/case-studies";
import { Certifications } from "@/components/home/certifications";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Products } from "@/components/home/products";
import { SkillsTable } from "@/components/home/skills-table";
import { PostList } from "@/components/blog/post-list";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { skillGroups } from "@/content";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <CaseStudies />
      <Products />
      <Section id="skills" index="05" eyebrow="skills" title="What I work with">
        <SkillsTable groups={skillGroups} />
      </Section>
      <Certifications />
      <Section id="blog" index="07" eyebrow="latest posts" title="Writing">
        <PostList posts={latestPosts} />
        {latestPosts.length > 0 ? (
          <div className="mt-8">
            <ButtonLink href="/blog" variant="ghost">
              All posts
            </ButtonLink>
          </div>
        ) : null}
      </Section>
      <Contact />
    </main>
  );
}
