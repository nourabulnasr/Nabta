import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Fraunces, Manrope, Noto_Sans_Arabic } from "next/font/google";
import { content, isLocale, locales } from "@/content";
import { MotionProvider } from "@/components/motion-provider";
import "../globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const arabic = Noto_Sans_Arabic({ weight: "400", subsets: ["arabic"], variable: "--font-arabic", display: "swap" });

export const viewport: Viewport = { themeColor: "#050e1e", colorScheme: "dark" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  // The page rejects unsupported locales; keep a valid document for its 404 boundary.
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${display.variable} ${body.variable} ${arabic.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main-content">{content.accessibility.skipToContent[locale]}</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

