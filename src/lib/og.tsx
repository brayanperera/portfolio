import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const ACCENT = "#3ddc84";

async function loadFont(file: string) {
  const buffer = await fs.readFile(path.join(process.cwd(), "src/assets/fonts", file));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

/** Dark terminal card shared by every Open Graph image. */
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const [regular, bold] = await Promise.all([
    loadFont("jetbrains-mono-latin-400-normal.woff"),
    loadFont("jetbrains-mono-latin-700-normal.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#0a0b0d",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 2px, transparent 2px)",
        backgroundSize: "36px 36px",
        color: "#e8eaed",
        fontFamily: "JetBrains Mono",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
        brayan@perera:<span style={{ color: ACCENT }}>~$</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 28, color: ACCENT }}>{`// ${eyebrow}`}</div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: title.length > 40 ? 56 : 72,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {title.replaceAll("→", "to")}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#9ba3af" }}>
          {subtitle.replaceAll("→", "to")}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}

export const defaultOgAlt = `${profile.name}, ${profile.title}`;
