# Revian website

Static public website served by GitHub Pages at `https://revian.com.br`.

- `/` keeps the original minimal homepage.
- `/lp` redirects to `/lp/` and serves the Portuguese clinic landing page.
- The landing page is not linked from the homepage or a sitemap, and declares
  `noindex, nofollow`. It is unlisted, not password protected.
- Pages publishes the root of `main`; no build step or external runtime is needed.

## Landing page

`lp/index.html`, `lp/styles.css`, and `lp/script.js` contain the page, responsive
styles, mobile navigation, and feature illustrations. FAQs use native HTML
accordions. The content remains readable if JavaScript is unavailable.

All demonstration buttons open Pedro's WhatsApp at `+55 11 99222-3817` with:

> Olá, gostaria saber mais sobre a Revian para minha clínica

LinkedIn is the only social-profile link: `https://www.linkedin.com/company/revian-ai/`.
The page has no videos, embedded players, tracking scripts, or lead collection.
The sample testimonials, people, and clinics are explicitly labeled fictional.
Lead follow-up, AI charting, and voice AI are marked **Em breve**, following the
reference's feature availability labels. Review these labels as the offering evolves.

## Brand and assets

Official Ocean + Sage palette and unmodified SVG logos from Revian Media Kit v2:
Ocean `#17232C`, Turquoise `#5EBAB2`, Sage `#8BC1A1`, Mist `#F0F5F4`, and Dark
Turquoise `#2A6F69`. Liberation Sans is hosted locally; its license is included.

`lp/assets/clinic-hero.jpg` is an original illustrative image created with the
built-in image-generation tool on 2026-11-09 and optimized for web delivery.
It does not depict an actual client, clinician, or testimonial author.

Image prompt: an original editorial portrait of a fictional Brazilian aesthetics
clinic professional in deep ocean blue scrubs, using a tablet in an airy clinic
with mist white, sage, and light oak details; natural daylight, realistic skin
texture, a relaxed smile, vertical 4:5 composition, negative space on the left
for interface overlays, no text, logos, or watermark.

## Local preview

Run `python3 -m http.server 4176 --bind 127.0.0.1` from this directory and open
`http://127.0.0.1:4176/lp/`. No package installation is required.

Check desktop and narrow mobile widths, all seven feature controls, keyboard
navigation, FAQ accordions, mobile menu and Escape, the exact WhatsApp message,
local asset responses, and the unchanged homepage before publishing.
