import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/** "BP" monogram in mono on dark, used for the favicon and apple-touch icon. */
export async function renderMonogram(size: number, radius: number) {
  const font = await fs.readFile(
    path.join(process.cwd(), "src/assets/fonts/jetbrains-mono-latin-700-normal.woff"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius,
        backgroundColor: "#0a0b0d",
        color: "#3ddc84",
        fontFamily: "JetBrains Mono",
        fontWeight: 700,
        fontSize: size * 0.5,
        letterSpacing: -size * 0.02,
      }}
    >
      BP
    </div>,
    {
      width: size,
      height: size,
      fonts: [
        {
          name: "JetBrains Mono",
          data: font.buffer.slice(
            font.byteOffset,
            font.byteOffset + font.byteLength,
          ) as ArrayBuffer,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
