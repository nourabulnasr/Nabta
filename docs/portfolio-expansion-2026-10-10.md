# Portfolio expansion — 10 October 2026

## Requested changes
- Added Iron Man 3D and Elgabaly Architects with the supplied public website destinations.
- Added PracticeCoach, PAMScout, ECGLens and PaperLens to AI & Software in English and Arabic. Descriptions were checked against the public README files; PAMScout remains described as experimental research and ECGLens as a non-diagnostic research demo.
- Reordered the nine websites: Vesper Acoustics, Iron Man 3D, Elgabaly Architects, El Amal, Palermo, MAS Heavy Equipment, Royal Falcon Tours, Power of Sea Moss, Elserafy Engineering.
- Preserved El Amal's homepage preview and the single monochrome founder portrait.

## Sources and previews
Canonical public GitHub destinations (all four HTTP 200 and matched to GitHub API names):
- https://github.com/nourabulnasr/Practice-coach
- https://github.com/nourabulnasr/PAMscout
- https://github.com/nourabulnasr/ECGLens
- https://github.com/nourabulnasr/Paperlens
The existing six GitHub destinations also returned HTTP 200. COD remains without a supplied repository URL.

Iron Man 3D opens https://ironman3d.vercel.app/. Elgabaly's root https://www.elgabalyarchitects.com/ redirects to /en; both public destinations responded successfully.

Captured website previews at 1440 × 1000:
- public/images/websites/ironman-3d.jpg: loaded first hero, after its initial loading screen.
- public/images/websites/elgabaly-architects.jpg: the homepage's opening 'We are Elgabaly' brand frame. The architecture sequence did not finish reliably in the capture browser, so this uses the actual opening frame rather than a reconstructed page.
Both have 480, 960 and 1440-pixel WebP versions. Iron Man's responsive files are 10.3–44.3 kB; Elgabaly's are 2.8–11.0 kB.

## Verification and deployment
Published Worker version: fdd3548a-0505-4089-9bbc-0f7454ba953a.
Live: https://nabta.nourabulnasr.workers.dev/en#websites and /ar#websites.

Completed lint/TypeScript, production build, local and live EN/AR checks at 390 and 1440 pixels, nine website previews, eleven software entries, all four new software destinations, final-three website ordering, navigation and the single founder portrait. Normal-motion keyboard End/focus reached PaperLens in both languages. Local and live SEO and deployment/security-header checks completed. Both live 960-pixel previews match local files byte for byte. All ten supplied GitHub repository destinations resolved successfully.

The known-pattern source/history/build scan found no configured secret patterns or public source maps. The existing upstream advisory exception remains documented.

The first build hit the host's memory limit; it completed with NODE_OPTIONS=--max-old-space-size=320 --max-semi-space-size=4 and one build thread. The first upload omitted 49 server-rendering modules and produced HTTP 500. That deployment (3cb9aa8e-7299-4dfa-8531-5edd84f3dd07) was rolled back to the previous verified version. A copy of the checked build outside OneDrive was dry-run verified and uploaded with all 129 modules, then the live checks succeeded. No feature-code workaround, paid service or system setting change was required. Release packaging preflight is now documented in the runbook.

Local evidence: artifacts/2026-10-10/ and artifacts/github-link-check.json. The staged release copy is in the Windows temporary directory under nabta-portfolio-release-2026-10-10; it is a rebuildable deployment copy, not the source of record.

The existing student-platform/account/media dependencies and dated performance baseline are unchanged. This portfolio content update is not a fresh Lighthouse audit or an activation of student services.
