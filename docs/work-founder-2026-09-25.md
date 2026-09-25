# Work collections and founder portraits

Nour selected a Work dropdown with three destinations: AI & Software, Websites, AI Visuals. Implemented in English and Arabic. Seven existing engineering/tool projects remain in the horizontal project collection; four existing client websites now have their own section with actual homepage captures and external links. Additional undeployed websites await names and destinations from Nour.

Founder portraits: all six original attachments saved locally under reference-inputs-local/founder-2026-09-25. Hash comparison confirmed images 5 and 6 duplicate images 4 and 3. Four optimized WebP delivery assets are included; black-and-white portrait is first, followed by smiling elevator portrait, laptop portrait, orange mirror portrait. Carousel has manual previous/next buttons, swipe, restrained spring transitions, reduced-motion behavior and a static first-photo no-JavaScript fallback. No autoplay.

AI Visuals has a dedicated destination and a coming-soon message. src/lib/visual-work.ts accepts real image and video entries; video playback uses controls, no autoplay and preload none. Actual brand assets, names, titles and captions have not been supplied. Do not substitute founder photos or invented work. Video hosting compatibility must be checked when actual media are available.

Visual direction: founder portrait is the focal element, deep navy contrast, large portrait beside biography on desktop and above it on mobile; intimate and personal. Websites alternate large homepage previews and descriptions. Existing Nabta typefaces and palette retained.

Verification: lint and TypeScript succeeded; Cloudflare production build succeeded after stopping the extra development server and limiting build threads. EN/AR at 390/1440 tested category navigation, portrait controls, correct project separation and no horizontal overflow. Security and mascot-intro regression suites succeeded against local Workers. Visual review found and corrected the RTL counter order. Final visual approval belongs to Nour. The unavailable custom Impeccable skill was not run; do not claim its audit suite ran.

Nour subsequently approved the design and requested publication. Deployed to https://nabta.nourabulnasr.workers.dev/en and /ar as version ade415a9-ad65-47b0-98d1-2c1be11b11f4. Initial deployment build exhausted laptop memory before upload; retry with RAYON_NUM_THREADS=1 and NODE_OPTIONS=--max-old-space-size=512 succeeded. No user browser processes were stopped. Live EN/AR mobile/desktop dropdown/carousel/category checks and publication SEO checks succeeded.

Next-work discovery: the public Cal.com page is reachable, but displays Cal Video and weekday 09:00–17:00 slots in Africa/Cairo. These differ from the agreed Google Meet, daily 17:00–00:00. Account settings redirect to login. Owner was asked to sign in so these settings, 24-hour notice, intake questions and calendar conflicts can be corrected/verified. Do not claim booking settings are complete.

Live security suite also succeeded. Production mobile Lighthouse: EN performance69/accessibility100/best-practices100/SEO91; AR66/100/100/92. LCP5.9s/6.2s, CLS0, TBT100ms/90ms. Reports artifacts/2026-09-25/cloudflare-live. Not at performance target: investigate HTML compression, initial JS delivery and hero image priority. These are simulated measurements, not field data.
