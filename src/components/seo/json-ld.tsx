import { profile } from "@/content";
import type { Post } from "@/lib/posts";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so content can never close the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const person = {
  "@type": "Person",
  "@id": `${profile.url}/#person`,
  name: profile.name,
  alternateName: profile.fullName,
  jobTitle: profile.title,
  url: profile.url,
  address: { "@type": "PostalAddress", addressLocality: "Kalutara", addressCountry: "LK" },
  sameAs: profile.socials.map((social) => social.url),
};

export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          person,
          {
            "@type": "WebSite",
            "@id": `${profile.url}/#website`,
            url: profile.url,
            name: profile.name,
            author: { "@id": person["@id"] },
          },
        ],
      }}
    />
  );
}

export function PostJsonLd({ post }: { post: Post }) {
  const url = `${profile.url}/blog/${post.slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        keywords: post.tags.join(", "),
        author: { "@type": "Person", name: profile.name, url: profile.url },
      }}
    />
  );
}
