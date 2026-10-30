# Meryeme Mesbahi — portfolio

A complete Next.js App Router portfolio with TypeScript, GSAP, and a progressive, interactive Three.js field. Content, project imagery, portrait, résumé, social links, video demos, and the contact delivery endpoint were recovered from the [original portfolio](https://meryememesbahi-portfolio.vercel.app/).

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. `npm run typecheck` checks types. `npm run build` produces a portable static site in `out/`, ready for Vercel, Pages, or any static host. To preview that production output: `python3 -m http.server 3000 --directory out`.

## Design research

Reviewed October 29, 2026:

- [Lusion](https://lusion.co/): spatial visual storytelling, tactile materials, and purposeful motion. The kinetic chrome field is an original interpretation; no Lusion code or assets are used.
- [Tarik Karahodžić — personal site](https://www.tarikkarahodzic.dev/projects/personal-site): typographic hierarchy, generous space, restrained project presentation, and performance-minded Next.js structure.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): native scrolling with section reveals and restrained image parallax.
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/): responsive animation lifecycle and reduced-motion handling.
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports): prerendered, portable HTML with optional client enhancements.

The design uses near-black, off-white, grayscale imagery, self-hosted Manrope and IBM Plex Mono, oversized type, a cinematic dark opening, a scroll-driven project gallery on capable desktops, and distinct light/dark sections. Project images reveal their original colors on pointer hover.

## Motion and device behavior

- Readable server-rendered content; no splash screen or loading gate.
- A custom vertex shader deforms a reflective core. 336 chrome capsules orbit on intersecting paths, with spring-based pointer repulsion and a click-triggered energy ripple. A single instanced draw call renders the capsules.
- On capable screens at least 800px wide and 560px tall, a GSAP-pinned sequence opens the core into a tunnel, moves the camera through it, introduces a second typographic chapter, and reveals the work through an expanding circular wipe.
- The desktop project gallery pins and moves horizontally with native vertical scrolling. Keyboard focus brings offscreen project controls into view. Smaller screens and reduced-motion mode use a conventional stacked/grid layout.
- Magnetic calls to action, project-card tilt, a contextual pointer, masked menu reveals, animated project dialogs, portrait depth, and scroll-driven type complete the motion system.
- Project dialogs render in a portal directly under `document.body`, outside the pinned gallery. Only expandable `details` toggle events refresh ScrollTrigger. This prevents refreshes from removing a native dialog from the browser’s modal layer while leaving scrolling locked. Pointer clicks do not trigger the gallery’s keyboard focus alignment.
- The Three.js renderer is dynamically imported only on screens at least 700px wide with sufficient reported memory/cores, no data-saver preference, and no reduced-motion preference. Unknown hardware falls back to conservative defaults.
- Pixel ratio capped at 1.6. Rendering capped at 45fps, lowered to 24fps and pixel ratio 1 after sustained slow frames. Rendering and ambient animation pause when offscreen or the document is hidden.
- Small screens, reduced motion, data saver, unsupported WebGL, and the manual motion switch receive a locally rendered still of the same field. The still is about 60 KB; it does not load the 3D scene. System reduced-motion preferences are always respected.
- WebGL resources, observers, event handlers, and GSAP animations are disposed during cleanup. Text remains readable if JavaScript is unavailable.
- Fluid layouts include phone, tablet, desktop, and large-screen breakpoints. Touch and keyboard interactions use native controls, visible focus, accessible navigation, native dialogs, and expandable details.

## Content maintenance

- `lib/projects.ts`: project copy, screenshots, original video URLs, and social links.
- `app/page.tsx`: biography, experience, skills, and page structure.
- `public/resume.pdf`: the existing downloadable résumé.
- `components/ContactForm.tsx`: preserves the original Formspree endpoint. It includes client validation, a honeypot, timeout handling, success/failure feedback, and LinkedIn as a fallback. No test message was sent during development.
- Video demos are preserved locally in `public/demos/` and stream only on user request. Images, fonts, the résumé, and the sculpture poster are local too; retiring the original deployment will not break them.
- Update `app/layout.tsx` metadata origin when moving to a public custom domain or a new Vercel URL.

## Publishing

The Sites manifest uses the static `out/` directory. The preview is owner-private by default. The source also runs as a standard Next.js project on Vercel; no Sites runtime dependency is needed by the application.
