import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Cloud",
    skills: [
      {
        name: "AWS",
        detail:
          "EC2, ECS/Fargate, EKS, RDS, VPC, S3, EFS, ELB/ALB, CloudFormation, CloudWatch, CodeBuild",
      },
      { name: "OCI" },
      { name: "OpenStack" },
      { name: "Azure" },
    ],
  },
  {
    category: "Containers",
    skills: [
      { name: "Kubernetes" },
      { name: "Docker", years: 4 },
      { name: "Helm" },
      { name: "Argo CD" },
      { name: "kOps" },
      { name: "Docker Compose" },
    ],
  },
  {
    category: "IaC",
    skills: [
      { name: "Terraform", years: 2 },
      { name: "Ansible", years: 4 },
      { name: "GitHub Actions" },
      { name: "GitLab CI/CD" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "Bash", years: 13 },
      { name: "Python", years: 4 },
      { name: "SQL" },
      { name: "PHP" },
      { name: "TypeScript" },
    ],
  },
  {
    category: "Data",
    skills: [
      { name: "MySQL", years: 8 },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "Ceph" },
      { name: "GlusterFS" },
    ],
  },
  {
    category: "Observability",
    skills: [{ name: "Prometheus" }, { name: "Grafana" }, { name: "Nagios" }],
  },
  {
    category: "Systems",
    skills: [
      { name: "Linux", years: 13 },
      { name: "Networking" },
      { name: "SAN/RAID" },
      { name: "HA clustering" },
    ],
  },
  {
    category: "Product",
    skills: [
      { name: "Next.js" },
      { name: "Prisma" },
      { name: "Flask" },
      { name: "REST/OpenAPI" },
      { name: "Microservices" },
      { name: "Claude Code" },
    ],
  },
];
