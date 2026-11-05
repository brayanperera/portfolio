import { profile } from "@/content";
import { defaultOgAlt, ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = defaultOgAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "systems architect · sre · founder",
    title: profile.name,
    subtitle: profile.valueProp,
  });
}
