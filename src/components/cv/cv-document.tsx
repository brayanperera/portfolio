import path from "node:path";
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import {
  certifications,
  education,
  experience,
  formatPeriod,
  getFeaturedProjects,
  profile,
  skillGroups,
} from "@/content";

const FULL_ROLES = 4;

const fontPath = (file: string) => path.join(process.cwd(), "src/assets/fonts", file);

Font.register({
  family: "Inter",
  fonts: [
    { src: fontPath("inter-latin-400-normal.woff"), fontWeight: 400 },
    { src: fontPath("inter-latin-600-normal.woff"), fontWeight: 600 },
  ],
});

// Whole words only: hyphenated line breaks would split keywords for ATS parsers.
Font.registerHyphenationCallback((word) => [word]);

const ink = "#1f2328";
const muted = "#59636e";
const rule = "#d1d9e0";
const link = "#0b6b3a";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9.5,
    lineHeight: 1.45,
    color: ink,
    paddingVertical: 40,
    paddingHorizontal: 46,
  },
  // Line height is explicit: the inherited multiplier makes this large text overlap the next line.
  name: { fontSize: 20, fontWeight: 600, lineHeight: 1.25, marginBottom: 6 },
  title: { fontSize: 10.5 },
  contact: { color: muted, marginTop: 4 },
  link: { color: link, textDecoration: "none" },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 600,
    marginTop: 14,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.75,
    borderBottomColor: rule,
  },
  entry: { marginBottom: 7 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between" },
  bold: { fontWeight: 600 },
  mutedText: { color: muted },
  bullet: { flexDirection: "row", marginTop: 1.5 },
  bulletMark: { width: 9 },
  bulletText: { flex: 1 },
});

/** The embedded Latin subset has no arrow glyph. */
const plain = (text: string) => text.replaceAll("→", "to");

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View>
      <Text style={styles.sectionTitle} minPresenceAhead={30}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{plain(children)}</Text>
    </View>
  );
}

export function CvDocument() {
  const recent = experience.slice(0, FULL_ROLES);
  const older = experience.slice(FULL_ROLES);

  return (
    <Document
      title={`${profile.name} CV`}
      author={profile.name}
      subject={profile.title}
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          <Text style={styles.contact}>
            {profile.location}
            {profile.email ? ` | ${profile.email}` : ""}
            {" | "}
            <Link src={profile.url} style={styles.link}>
              {profile.url.replace("https://", "")}
            </Link>
            {profile.socials.map((social) => (
              <Text key={social.url}>
                {" | "}
                <Link src={social.url} style={styles.link}>
                  {social.label}
                </Link>
              </Text>
            ))}
          </Text>
        </View>

        <CvSection title="Summary">
          <Text>{profile.shortBio}</Text>
        </CvSection>

        <CvSection title="Experience">
          {recent.map((role) => (
            <View key={role.slug} style={styles.entry}>
              <View style={styles.entryHeader} minPresenceAhead={20}>
                <Text>
                  <Text style={styles.bold}>{role.title}</Text>, {role.company}
                </Text>
                <Text style={styles.mutedText}>{formatPeriod(role.period)}</Text>
              </View>
              {role.summary ? <Text>{role.summary}</Text> : null}
              {role.bullets.map((bullet) => (
                <Bullet key={bullet}>{bullet}</Bullet>
              ))}
              {role.tech.length > 0 ? (
                <Text style={[styles.mutedText, { marginTop: 2 }]}>
                  Tech: {role.tech.join(", ")}
                </Text>
              ) : null}
            </View>
          ))}
          {older.map((role) => (
            <View key={role.slug} style={[styles.entryHeader, { marginBottom: 2 }]}>
              <Text>
                <Text style={styles.bold}>{role.title}</Text>, {role.company}
              </Text>
              <Text style={styles.mutedText}>{formatPeriod(role.period)}</Text>
            </View>
          ))}
        </CvSection>

        <CvSection title="Selected projects">
          {getFeaturedProjects().map((project) => (
            <View key={project.slug} style={[styles.entry, { marginBottom: 5 }]} wrap={false}>
              <Text>
                <Text style={styles.bold}>{plain(project.name)}</Text>, {project.role}
              </Text>
              <Text>{plain(project.approach.join(" "))}</Text>
            </View>
          ))}
        </CvSection>

        <CvSection title="Skills">
          {skillGroups.map((group) => (
            <Text key={group.category} style={{ marginBottom: 1.5 }}>
              <Text style={styles.bold}>{group.category}: </Text>
              {group.skills
                .map((skill) => (skill.years ? `${skill.name} (${skill.years}y)` : skill.name))
                .join(", ")}
            </Text>
          ))}
        </CvSection>

        <CvSection title="Certifications">
          {certifications.map((cert) => (
            <View key={cert.name} style={[styles.entryHeader, { marginBottom: 1.5 }]} wrap={false}>
              <Text>{cert.name}</Text>
              <Text style={styles.mutedText}>{cert.date}</Text>
            </View>
          ))}
        </CvSection>

        <CvSection title="Education">
          {education.map((item) => (
            <View key={item.degree} style={styles.entryHeader} wrap={false}>
              <Text>
                <Text style={styles.bold}>{item.degree}</Text>, {item.institution}
              </Text>
              <Text style={styles.mutedText}>
                {item.start}–{item.end}
              </Text>
            </View>
          ))}
        </CvSection>
      </Page>
    </Document>
  );
}
