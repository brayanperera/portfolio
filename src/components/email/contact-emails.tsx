import type { CSSProperties, ReactNode } from "react";
import type { ContactInput } from "@/lib/contact-schema";

const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
const text: CSSProperties = {
  color: "#1f2328",
  fontSize: 15,
  lineHeight: "24px",
  margin: "0 0 16px",
};
const label: CSSProperties = { color: "#59636e", fontSize: 13, padding: "4px 16px 4px 0" };
const value: CSSProperties = { color: "#1f2328", fontSize: 14, padding: "4px 0" };

/** Table layout and inline styles, because that is what email clients render reliably. */
function Shell({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#f6f8fa", fontFamily, margin: 0, padding: "24px 0" }}>
        <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>{preview}</div>
        <table
          role="presentation"
          align="center"
          width="100%"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #d1d9e0",
            borderRadius: 8,
            margin: "0 auto",
            maxWidth: 560,
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: 24 }}>{children}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

export function ContactNotificationEmail({ input }: { input: ContactInput }) {
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "Not given"],
    ["Engagement", input.engagement],
  ];

  return (
    <Shell preview={`${input.engagement} enquiry from ${input.name}`}>
      <h1 style={{ color: "#1f2328", fontSize: 18, margin: "0 0 16px" }}>
        New enquiry from brayanperera.cyou
      </h1>
      <table role="presentation" style={{ marginBottom: 16 }}>
        <tbody>
          {rows.map(([rowLabel, rowValue]) => (
            <tr key={rowLabel}>
              <td style={label}>{rowLabel}</td>
              <td style={value}>{rowValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ ...text, whiteSpace: "pre-wrap", margin: 0 }}>{input.message}</p>
    </Shell>
  );
}

export function ContactAcknowledgementEmail({ name, from }: { name: string; from: string }) {
  return (
    <Shell preview="Thanks for getting in touch.">
      <p style={text}>Hi {name},</p>
      <p style={text}>Thanks for getting in touch. Your message arrived and I will reply soon.</p>
      <p style={{ ...text, margin: 0 }}>{from}</p>
    </Shell>
  );
}
