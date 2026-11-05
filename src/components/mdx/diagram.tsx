/**
 * Simple layered architecture diagrams as inline SVG, used from project MDX as
 * <Diagram name="vnf-manager" />. Accent nodes are the parts Brayan built himself.
 */
type DiagramNode = { label: string; built?: boolean };
type Layer = { name: string; nodes: DiagramNode[] };
type DiagramSpec = { title: string; layers: Layer[] };

const diagrams: Record<string, DiagramSpec> = {
  "vnf-manager": {
    title: "VNF Manager components, from package tooling down to OpenStack",
    layers: [
      { name: "tooling", nodes: [{ label: "TOSCA VNF Package Creator", built: true }] },
      {
        name: "vnfm · 8 microservices",
        nodes: [
          { label: "VNF Package Parser", built: true },
          { label: "VIM Adapter", built: true },
          { label: "6 other microservices" },
        ],
      },
      {
        name: "automation",
        nodes: [{ label: "Terraform" }, { label: "Ansible framework", built: true }],
      },
      { name: "vim", nodes: [{ label: "OpenStack" }] },
    ],
  },
  "element-management-system": {
    title: "Element Management System microservices on Python Flask",
    layers: [
      {
        name: "ems · 12 microservices",
        nodes: [
          { label: "Lifecycle manager", built: true },
          { label: "Service manager", built: true },
        ],
      },
      {
        name: "",
        nodes: [
          { label: "Patch framework", built: true },
          { label: "VNF indicator manager", built: true },
        ],
      },
      {
        name: "",
        nodes: [{ label: "Local SSL CA issuer", built: true }, { label: "7 other microservices" }],
      },
      { name: "platform", nodes: [{ label: "Python Flask" }] },
    ],
  },
  "clinic-management-fargate": {
    title: "Deployment path from GitHub Actions to ECS services on Fargate",
    layers: [
      { name: "ci/cd", nodes: [{ label: "GitHub Actions", built: true }] },
      { name: "environments", nodes: [{ label: "Staging" }, { label: "Production" }] },
      {
        name: "terraform",
        nodes: [
          { label: "ELB", built: true },
          { label: "Target groups", built: true },
        ],
      },
      {
        name: "",
        nodes: [
          { label: "ECS services", built: true },
          { label: "ECS task definitions", built: true },
        ],
      },
      { name: "compute", nodes: [{ label: "AWS Fargate" }] },
    ],
  },
  "compliance-management-system": {
    title: "CIS and PCI-DSS rules applied across many hosts",
    layers: [
      { name: "rules", nodes: [{ label: "CIS" }, { label: "PCI-DSS" }] },
      {
        name: "system",
        nodes: [{ label: "Create · manage · apply", built: true }],
      },
      { name: "targets", nodes: [{ label: "Many hosts" }] },
    ],
  },
};

const WIDTH = 440;
const NODE_HEIGHT = 34;
const LABEL_HEIGHT = 18;
const LAYER_GAP = 22;
const NODE_GAP = 8;

function layoutRows(layers: Layer[]) {
  let y = 0;
  const rows = layers.map((layer) => {
    const top = y;
    const nodeTop = top + (layer.name ? LABEL_HEIGHT : 0);
    y = nodeTop + NODE_HEIGHT + LAYER_GAP;
    return { layer, top, nodeTop };
  });
  return { rows, height: y - LAYER_GAP + 2 };
}

export function Diagram({ name }: { name: string }) {
  const spec = diagrams[name];
  if (!spec) return null;

  const { rows, height } = layoutRows(spec.layers);

  return (
    <figure className="my-8">
      <svg
        role="img"
        aria-label={spec.title}
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="w-full max-w-xl font-mono"
      >
        {rows.map(({ layer, top, nodeTop }, rowIndex) => {
          const count = layer.nodes.length;
          const nodeWidth = (WIDTH - 2 - NODE_GAP * (count - 1)) / count;
          const next = rows[rowIndex + 1];
          return (
            <g key={`${layer.name}-${rowIndex}`}>
              {layer.name ? (
                <text x="1" y={top + 11} fontSize="10.5" fill="var(--text-muted)">
                  {layer.name}
                </text>
              ) : null}
              {layer.nodes.map((node, index) => {
                const x = 1 + index * (nodeWidth + NODE_GAP);
                return (
                  <g key={node.label}>
                    <rect
                      x={x}
                      y={nodeTop + 1}
                      width={nodeWidth}
                      height={NODE_HEIGHT - 2}
                      rx="4"
                      fill={node.built ? "var(--accent-muted)" : "var(--surface-2)"}
                      stroke={node.built ? "var(--accent)" : "var(--border-strong)"}
                    />
                    <text
                      x={x + nodeWidth / 2}
                      y={nodeTop + NODE_HEIGHT / 2 + 4}
                      textAnchor="middle"
                      fontSize={count >= 3 ? "9" : "11.5"}
                      fill={node.built ? "var(--accent)" : "var(--text)"}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
              {next ? (
                <path
                  d={`M ${WIDTH / 2} ${nodeTop + NODE_HEIGHT + 3} V ${next.top - 3} m -4 -4 l 4 4 l 4 -4`}
                  fill="none"
                  stroke="var(--text-muted)"
                  strokeWidth="1"
                />
              ) : null}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 font-mono text-xs text-muted">
        Simplified view. <span className="text-accent">Green</span> marks the parts I built.
      </figcaption>
    </figure>
  );
}
