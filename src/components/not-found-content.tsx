import { content } from "@/content";
/* eslint-disable @next/next/no-html-link-for-pages */
export function NotFoundContent() {
  return (
    <main style={{ maxWidth: "48rem", margin: "12vh auto", padding: "2rem" }}>
      <p style={{ color: "#aceb38" }}>Nabta / نبتة</p>
      <h1 style={{ fontSize: "clamp(3rem, 9vw, 6rem)", fontWeight: 400 }}>{content.notFound.title.en}</h1>
      <p>{content.notFound.body.en}</p>
      <p lang="ar" dir="rtl">{content.notFound.body.ar}</p>
      <nav aria-label={content.notFound.navigation} style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
        <a style={{ color: "#aceb38", padding: "1rem 0" }} href="/en">{content.notFound.home.en}</a>
        <a style={{ color: "#aceb38", padding: "1rem 0" }} href="/ar" lang="ar" dir="rtl">{content.notFound.home.ar}</a>
      </nav>
    </main>
  );
}
