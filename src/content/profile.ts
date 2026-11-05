import { certifications } from "./certifications";
import { products } from "./projects";
import type { Profile, Stat } from "./types";

export const profile: Profile = {
  name: "Brayan Perera",
  fullName: "Raigamage Diluka Brayan Prasanth Perera",
  title: "Systems Architect · SRE · Founder, Aakasa Digital",
  location: "Kalutara, Sri Lanka",
  locationNote: "works remotely with global clients",
  // TODO(brayan): confirm public contact email (brayan@aakasa.dev?)
  email: null,
  url: "https://brayanperera.cyou",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/brayan-perera/" },
    {
      label: "Toptal",
      url: "https://www.toptal.com/developers/resume/raigamage-diluka-brayan-prasanth-perera",
    },
    // TODO(brayan): add GitHub URL
    // TODO(brayan): add X/Twitter URL
  ],
  shortBio:
    "Systems architect and site reliability engineer with 13+ years building highly available platforms for telecom, healthcare and banking — from OpenStack private clouds and NFV platforms to AWS EKS. Today I also build and run my own SaaS products under Aakasa Digital.",
  valueProp: "I design resilient cloud platforms — and ship products on them.",
  narrative: [
    "I started in telecom as an implementation engineer at hSenid Mobile Solutions, deploying mobile recharge and messaging platforms for operators in multiple countries. That meant 1.5 years onsite in Brunei, then 3.5 years onsite with a leading Singapore mobile operator, working on SMSC, USSDC, SMPP, Sigtran and HLR provisioning.",
    "From 2016 I moved into design work: site-to-site failover clusters, OpenStack private clouds, and eventually principal architect for an ETSI NFV VNF Manager. Later roles took me to AWS, including moving a clinic management system serving 30+ medical clinics in Singapore to Fargate, and writing the Terraform behind EKS environments.",
    "Now I also run Aakasa Digital, a digital product studio where I handle product design, infrastructure and development end-to-end, using Claude Code for AI-assisted delivery.",
  ],
  currently:
    "Building and running SaaS products under Aakasa Digital, from product design through infrastructure and development.",
  availability: {
    open: true,
    label: "Open to architecture, SRE and DevOps engagements",
  },
};

/** Hero stats. Products shipped stays out until confirmed. */
export const stats: Stat[] = [
  { value: 13, suffix: "+", label: "years experience" },
  { value: certifications.length, label: "certifications" },
  { value: 30, suffix: "+", label: "clinics migrated to AWS Fargate" },
  // TODO(brayan): add "products shipped" once the number is confirmed
];

export const sectors = ["telecom", "healthcare", "banking"];

export const heroProducts = products.map(({ name, status }) => ({ name, status }));
