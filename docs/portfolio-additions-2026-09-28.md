# Portfolio additions — 28 September 2026

Added MAS Heavy Equipment and El Amal to Websites in English and Arabic, using the two separate URLs supplied by Nour. Both opened successfully in Chrome with successful HTTP responses. Captured real 1440×1000 previews; El Amal is described as a catalogue preview because its page currently carries a client-review notice. Its destination remains the supplied /en/products URL.

The portfolio now has six websites and seven AI/software entries. The founder remains the single black-and-white portrait. Existing GitHub URLs retain their verified canonical spelling.

Performance follow-up: set high fetch priority on the hero leaf image identified as LCP in the previous production audit. This is an initial optimization, not a claim that the performance target is met.

Validation and deployment results will be appended below.

Production version: fdd26270-892d-49bd-a184-cfd55304ada2.
Source lint/typecheck and production build succeeded. Initial upload ran out of local memory; direct Wrangler upload of the completed build succeeded with GOMAXPROCS=1 and Node heap 384MB.
Live EN/AR at 390/1440: six website previews, both exact new links, loaded new images, one founder portrait and navigation verified. Mascot intro, skip, reduced motion and no-JavaScript content checks succeeded.

Fresh live mobile Lighthouse: EN performance64, AR67; both accessibility100, best-practices100, SEO92. EN LCP6.2s/TBT240ms/CLS0; AR LCP6.0s/TBT180ms/CLS0. Reports: artifacts/2026-09-28/cloudflare-live. High-priority hero hint alone did not meet the performance target. Further work remains on HTML compression, image delivery and initial JavaScript; retain nonce/CSP safeguards.
