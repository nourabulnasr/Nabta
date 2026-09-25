# Work collections and founder portraits

Nour selected a Work dropdown with three destinations: AI & Software, Websites, AI Visuals. Implemented in English and Arabic. Seven existing engineering/tool projects remain in the horizontal project collection; four existing client websites now have their own section with actual homepage captures and external links. Additional undeployed websites await names and destinations from Nour.

Founder portraits: all six original attachments saved locally under reference-inputs-local/founder-2026-09-25. Hash comparison confirmed images 5 and 6 duplicate images 4 and 3. Four optimized WebP delivery assets are included; black-and-white portrait is first, followed by smiling elevator portrait, laptop portrait, orange mirror portrait. Carousel has manual previous/next buttons, swipe, restrained spring transitions, reduced-motion behavior and a static first-photo no-JavaScript fallback. No autoplay.

AI Visuals has a dedicated destination and a coming-soon message. src/lib/visual-work.ts accepts real image and video entries; video playback uses controls, no autoplay and preload none. Actual brand assets, names, titles and captions have not been supplied. Do not substitute founder photos or invented work. Video hosting compatibility must be checked when actual media are available.

Visual direction: founder portrait is the focal element, deep navy contrast, large portrait beside biography on desktop and above it on mobile; intimate and personal. Websites alternate large homepage previews and descriptions. Existing Nabta typefaces and palette retained.

Verification: lint and TypeScript succeeded; Cloudflare production build succeeded after stopping the extra development server and limiting build threads. EN/AR at 390/1440 tested category navigation, portrait controls, correct project separation and no horizontal overflow. Security and mascot-intro regression suites succeeded against local Workers. Visual review found and corrected the RTL counter order. Final visual approval belongs to Nour. The unavailable custom Impeccable skill was not run; do not claim its audit suite ran.

These changes are a local review candidate, not a new production deployment. Existing public Cloudflare version remains unchanged until visual review. Open http://127.0.0.1:3001/en#founder while the local Workers preview is running.
