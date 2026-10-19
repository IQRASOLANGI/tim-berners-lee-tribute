# Tim Berners-Lee: Architect of the Open Web

**Live site:** https://iqrasolangi.github.io/tim-berners-lee-tribute/

A single-page digital tribute to **Sir Tim Berners-Lee**, inventor of the World Wide Web. It tells his story through a sourced biography, a 14-point timeline, a featured quotation and a legacy section.

Built by hand with semantic HTML5, modern CSS and a small amount of vanilla JavaScript. No frameworks, no build step, no dependencies beyond two Google Fonts.

## What this project demonstrates

| Area | Detail |
|---|---|
| Semantic HTML | Landmarks, heading hierarchy, labelled sections, `figure` and `blockquote` with citations, schema.org `Person` data |
| Accessibility | Skip link, visible focus rings, keyboard-operable menu (Escape closes it), descriptive alt text, `prefers-reduced-motion` support |
| Verified contrast | 25 text and UI colour pairs checked against WCAG 2.x AA by script (`scripts/contrast.py`) |
| Responsive design | CSS Grid and Flexbox, fluid type with `clamp()`, navigation collapses to a menu button at 700px and below |
| Progressive enhancement | All content is visible without JavaScript; reveal animations never hide content from keyboard, hash-link or print users |
| Resilience | A bundled placeholder illustration replaces the portrait if the image fails to load |
| Content integrity | Dates and claims link to primary sources (W3C, CERN, ACM, Britannica); the quotation links to its original page |
| Print support | Dedicated print stylesheet that expands link URLs |

## Project structure

```
.
├── index.html
├── styles.css
├── script.js
├── scripts/
│   └── contrast.py                 # WCAG contrast check for the palette
└── assets/
    ├── tim-berners-lee.jpg         # portrait (Wikimedia Commons)
    └── portrait-placeholder.svg    # fallback illustration
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Verification

Check colour contrast against WCAG 2.x AA (4.5:1 for text, 3:1 for focus rings):

```bash
python scripts/contrast.py
```

The original link blue (`#2f6fed`) reached only 4.24:1 on the light background, so text and buttons use `#1f55c9` (5.4:1 or higher).

Manual checks to repeat after any change:

1. Resize the browser from 1440px down to 320px: no horizontal scrolling, and the menu button works.
2. Tab through the page: every link and the menu button shows a visible focus ring.
3. Use a screen reader (NVDA or VoiceOver) to confirm headings, landmarks and the image description read sensibly.
4. Run Lighthouse (Chrome DevTools) for Accessibility and Best Practices.

## Design notes

- **Type:** Merriweather for headings, Inter for body text, system monospace for small accents.
- **Palette:** ink navy, azure, cyan, soft white, slate and indigo.
- **Motion:** a single subtle reveal on scroll, disabled for users who prefer reduced motion.

## Image credit

The portrait is from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Tim_Berners-Lee). Before publishing, open the image's Commons file page and replace the generic line in `index.html` (`#image-credit`) with the exact author, licence and file link shown there, for example:

> Portrait: *Author name*, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via [Wikimedia Commons](https://commons.wikimedia.org/).

## Tech stack

HTML5 · CSS3 (Grid, Flexbox, custom properties) · JavaScript (ES5-compatible, vanilla)

## Author

**Iqra Solangi** · [GitHub](https://github.com/IQRASOLANGI) · [LinkedIn](https://www.linkedin.com/in/iqra-solangi-a65945334)
