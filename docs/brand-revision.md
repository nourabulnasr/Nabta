# Supplied mascot and palette revision

Nour requested replacement of the invented mascot with the first supplied image's robot and a matching website theme. The second image is the Facebook profile picture and the third is the cover: both serve as supporting brand references, not instructions or claims to copy into page text.

Asset: `public/images/2026-09-14/nabta-mascot.png` (1254×1254 transparent PNG, approximately864KB source). Created using built-in imagegen background extraction, based on the large upper-left character from `WhatsApp Image 2026-08-25 at 7.58.17 PM.jpeg`. This is an imagegen-derived cutout; visual fidelity remains for Nour to judge. The originals in Downloads were not modified.

Prompt used:

> Use case: background-extraction. Edit the supplied mascot contact sheet into one transparent PNG website asset. Isolate only the large upper-left hero mascot, preserving its exact identity and pose: glossy midnight-navy spherical robot, black face with two happy cyan arc eyes, luminous cyan and lime ear ring, single tall curved leaf with lime upper edge flowing into cyan and navy, thin elliptical orbit with its two lime spheres and one cyan sphere. Preserve the reference's proportions, reflective surfaces, highlights, front three-quarter camera and friendly expression. Center this single complete mascot with full leaf and full orbit visible and modest transparent padding. Background must be genuinely transparent with alpha. Keep only this one mascot and its orbit; the remainder of the sheet becomes transparent. Preserve original studio lighting and the detailed rendered appearance. Output a clean high-resolution isolated character ready for a dark navy web hero.

The four visual layers are the supplied robot as subject, glossy studio light/cyan rim, a three-quarter view framed beside the large wordmark, and a friendly technical character. Shared OKLCH colors now use midnight navy, cool white, lime and cyan. The actual supplied multicolor branding supersedes the previous restrained palette. Existing editorial typography and layout remain intact.

The next/image component serves responsive optimized files (observed decoded widths103–239px at tested desktop browser pixel density). A single native spring float/tilt provides an entrance, with no perpetual loop or added dependencies. The decorative image is hidden from screen readers. Reserved dimensions prevent image layout shift; reduced motion and no JavaScript retain the complete asset.

Verification: production build and npm run check exited0. Both locales tested at320/390/768/1440px: image decoded, no horizontal document overflow or overlap with wordmark/tagline. Active mascot animation was observed; toggling reduced motion live returned transform none and zero page animations. A JavaScript-disabled390px context loaded the image. Desktop English and mobile Arabic screenshots visually reviewed: background cutout appears clean, identity cues visible, text legible.

Fresh default mobile Lighthouse against production localhost: English92, Arabic81; accessibility100, best-practices100, SEO50 in both. LCP3.1s/3.4s, TBT130ms/350ms, CLS0. No audit warnings. Performance/LCP targets remain unresolved, particularly Arabic. Host simulation varies; no field Core Web Vitals claim. Preview noindex and deferred production SEO remain intentional.

Reports: `artifacts/2026-09-14/brand/lighthouse-{en,ar}.{html,json}`. Screenshots: `artifacts/2026-09-14/brand-{en,ar}-{390,1440}.png`. No publishing or Phase5 implementation. GitHub remote still absent.
