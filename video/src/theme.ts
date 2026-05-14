import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
loadFont("normal", { weights: ["400", "600", "800"], subsets: ["latin"] });
export const INTER = fontFamily;
export const C = {
  bg: "#0a0a0a",
  white: "#ffffff",
  accent: "#6366f1",
  accentDim: "#6366f140",
  accentBright: "#818cf8",
  success: "#22c55e",
  muted: "#9ca3af",
  card: "#141414",
  cardBorder: "#2a2a2a",
} as const;
export const SAFE = { top: 150, bottom: 170, side: 60 } as const;
