import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";
import { content } from "@/content";

export const metadata: Metadata = { title: `${content.notFound.title.en} | Nabta`, robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  return <html lang="en"><body style={{ margin: 0, background: "#050e1e", color: "#edf7fa", fontFamily: "Arial, sans-serif" }}>
    <NotFoundContent />
  </body></html>;
}
