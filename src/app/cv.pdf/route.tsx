import { renderToBuffer } from "@react-pdf/renderer";
import { CvDocument } from "@/components/cv/cv-document";

// Rendered once at build time and served as a static file.
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderToBuffer(<CvDocument />);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Brayan-Perera-CV.pdf"',
    },
  });
}
