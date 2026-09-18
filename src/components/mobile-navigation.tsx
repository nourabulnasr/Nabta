"use client";

import { useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "./motion/use-media-query";

export function MobileNavigation({ children, label, menu }: { children: ReactNode; label: string; menu: string }) {
  const mobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  return <div className="navigation-shell" data-open={open}
    onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    }}>
    <noscript><style>{`@media(max-width:767px){.site-header{grid-template-columns:1fr auto!important}.navigation-shell{grid-column:1/-1!important;grid-row:2!important}.navigation-shell .menu-toggle{display:none!important}.navigation-shell .main-nav{display:flex!important;position:static!important;flex-direction:row!important;flex-wrap:wrap;padding:0!important}.language-link{grid-column:2;grid-row:1}}`}</style></noscript>
    <button ref={button} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation"
      onClick={() => setOpen(!open)}>{menu}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
    <nav id="main-navigation" className="main-nav" aria-label={label} onClick={(event) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!mobile || !link) return;
      setOpen(false);
      // Move keyboard focus with the anchor instead of leaving it in the closed menu.
      const section = document.getElementById(link.hash.slice(1));
      if (section) {
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
      }
    }}>{children}</nav>
  </div>;
}
