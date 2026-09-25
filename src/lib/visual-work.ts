import type { LocalizedText } from "@/content";

export type VisualWork = {
  id: string;
  brand: string;
  title: LocalizedText;
  width: number;
  height: number;
} & ({ kind: "image"; src: string } | { kind: "video"; src: string; poster: string; captions: string; captionLanguage: string });

// Add owner-supplied brand work here. Never substitute founder portraits or invented client work.
export const visualWork: VisualWork[] = [];
