import type { CareerProject, Product } from "./types";

export const careerProjects: CareerProject[] = [
  {
    kind: "career",
    slug: "vnf-manager",
    name: "VNF Manager",
    tagline: "ETSI NFV MANO VNF Manager platform for a telecom client.",
    role: "Principal architect",
    company: "hSenid Mobile Solutions",
    period: { start: 2018, end: 2021 },
    problem:
      "A telecom client needed an ETSI NFV VNF Manager (VNFM) platform integrated with OpenStack.",
    approach: [
      "Led the architecture: OpenStack integration, microservice API and workflow design.",
      "Built 2 of the 8 microservices: the VNF Package Parser and the VIM Adapter, which uses Terraform on OpenStack.",
      "Built a TOSCA VNF Package Creator tool and the Ansible automation framework.",
    ],
    stack: ["OpenStack", "Terraform", "Ansible", "Python", "TOSCA", "Docker"],
    featured: true,
  },
  {
    kind: "career",
    slug: "element-management-system",
    name: "Element Management System",
    tagline: "ETSI NFV MANO element management, built on Python Flask.",
    role: "Architect, tech lead and principal developer",
    // TODO(brayan): confirm employer and period for the EMS project
    company: null,
    period: null,
    problem: "An ETSI NFV MANO deployment needed an element management platform.",
    approach: [
      "Led the design and development of a Python Flask platform.",
      "Built 5 of the 12 microservices: lifecycle manager, service manager, patch framework, VNF indicator manager and local SSL CA issuer.",
    ],
    stack: ["Python", "Flask", "Microservices"],
    featured: true,
  },
  {
    kind: "career",
    slug: "clinic-management-fargate",
    name: "Clinic Management System → AWS Fargate",
    tagline: "Moving a system serving 30+ medical clinics in Singapore onto AWS Fargate.",
    role: "Systems Architect",
    company: "Healthway Medical",
    period: { start: 2021, end: 2022 },
    problem:
      "A clinic management system serving 30+ medical clinics in Singapore had to move to AWS Fargate.",
    approach: [
      "Defined the platform in Terraform: ELB, target groups, ECS task definitions and services.",
      "Set up GitHub Actions to deploy to staging and production.",
    ],
    stack: ["AWS Fargate", "ECS", "ELB", "Terraform", "GitHub Actions", "Docker"],
    featured: true,
  },
  {
    kind: "career",
    slug: "compliance-management-system",
    name: "Compliance Management System",
    tagline: "Create, manage and apply CIS and PCI-DSS rules across many hosts.",
    role: "Builder",
    // TODO(brayan): confirm role, employer, period and stack for this project
    company: null,
    period: null,
    problem: "CIS and PCI-DSS rules had to be created, managed and applied across many hosts.",
    approach: ["Built a system to create, manage and apply CIS / PCI-DSS rules across many hosts."],
    stack: [],
    featured: true,
    note: "My favourite build.",
  },
  {
    kind: "career",
    slug: "service-management-framework",
    name: "Service Management Script Framework",
    tagline: "Bash/Python auto-recovery for non-clustered Linux.",
    role: "Builder",
    company: "hSenid Mobile Solutions",
    period: null,
    problem: "Services on non-clustered Linux hosts needed automatic recovery.",
    approach: [
      "Built a Bash/Python auto-recovery framework for non-clustered Linux.",
      "Used across many hSenid customer environments.",
    ],
    stack: ["Bash", "Python", "Linux"],
    featured: false,
  },
  {
    kind: "career",
    slug: "patch-management-tool",
    name: "Centralized Patch Management Tool",
    tagline: "Remote install, upgrade and config management.",
    role: "Builder",
    company: "hSenid Mobile Solutions",
    period: null,
    problem: "Remote install, upgrade and configuration management had to run from one place.",
    approach: [
      "Built a Bash/Python/Ansible tool for remote install, upgrade and config management.",
      "Adopted in the hSenid NFV suite.",
    ],
    stack: ["Bash", "Python", "Ansible"],
    featured: false,
  },
];

/**
 * Aakasa Digital products. Names may change during the rebrand; this is the only
 * place they are defined.
 * TODO(brayan): final names, status, URL, stack and screenshot for each product.
 */
export const products: Product[] = [
  {
    kind: "product",
    slug: "billcraft-ai",
    name: "BillCraft AI",
    tagline: "AI-powered invoicing SaaS.",
    status: null, // TODO(brayan): status
    url: null, // TODO(brayan): url
    stack: [], // TODO(brayan): stack
    highlights: [], // TODO(brayan): highlights
    screenshot: null, // TODO(brayan): public/products/billcraft-ai.webp
  },
  {
    kind: "product",
    slug: "supportcraft-ai",
    name: "SupportCraft AI",
    tagline: "Multi-tenant support ticketing with inbound email.",
    status: null, // TODO(brayan): status
    url: null, // TODO(brayan): url
    stack: ["Cloudflare Email Workers"], // TODO(brayan): full stack
    highlights: [
      "Multi-tenant ticketing",
      "Inbound email via Cloudflare Email Workers",
      "Threaded replies and a rich-text editor",
    ],
    screenshot: null, // TODO(brayan): public/products/supportcraft-ai.webp
  },
  {
    kind: "product",
    slug: "meetingcraft",
    name: "MeetingCraft",
    tagline: "Calendly-style scheduling.",
    status: null, // TODO(brayan): status
    url: null, // TODO(brayan): url
    stack: [], // TODO(brayan): stack
    highlights: ["Google Workspace calendar sync", "Subscriptions"],
    screenshot: null, // TODO(brayan): public/products/meetingcraft.webp
  },
  {
    kind: "product",
    slug: "pdfcraft",
    name: "PDFCraft",
    tagline: "PDF tools.",
    status: null, // TODO(brayan): status
    url: null, // TODO(brayan): url
    stack: [], // TODO(brayan): stack
    highlights: [], // TODO(brayan): highlights
    screenshot: null, // TODO(brayan): public/products/pdfcraft.webp
  },
  {
    kind: "product",
    slug: "aakasa-toolbox",
    name: "Aakasa Toolbox",
    tagline: "Suite of browser-based utility tools.",
    status: "running",
    url: "https://tools.aakasa.dev",
    stack: [], // TODO(brayan): stack
    highlights: ["Browser-based", "15-tool MVP"],
    screenshot: null, // TODO(brayan): public/products/aakasa-toolbox.webp
  },
  {
    kind: "product",
    slug: "freellm-api",
    name: "FreeLLM API",
    tagline: "Self-hosted, OpenAI-compatible unified LLM router.",
    status: "running",
    url: "https://llm.aakasa.dev",
    stack: [], // TODO(brayan): stack
    highlights: ["Self-hosted", "OpenAI-compatible", "Unified LLM routing"],
    screenshot: null, // TODO(brayan): public/products/freellm-api.webp
  },
];
