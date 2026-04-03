# CLAUDE.md

Strictly follow the rules in ./AGENTS.md

## Project overview

TimerUp is a visual countdown timer with a clock-face UI, built as a pure web app that also ships as a Chrome/Edge extension. No frameworks — vanilla JS, HTML, and CSS only.

## Tech stack

- Vanilla JS / HTML / CSS — no transpilation, no bundler
- Chrome Extension Manifest V3 (for always-on-top behavior)
- Document Picture-in-Picture API (Chrome 116+) for OS-level always-on-top
- Node 22+ (see `.nvmrc`)

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Serve web app locally on port 3000 |
| `npm test` | Run tests + lint (ESLint + Stylelint) |
| `npm run lint` | Lint only (ESLint + Stylelint) |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run pack:extension` | Build extension into `dist/extension/` |
| `npm run clean` | Remove `dist/` |

Always run `npm test` after making changes.

## Project structure

```
index.html               — Timer web app (clock-face markup + CSP header)
scripts/start.js          — Timer logic (IIFE): countdown via setTimeout loop, conic-gradient, PiP
scripts/pack-extension.js — Build script: assembles dist/extension/
styles/main.css           — All styles; CSS custom properties for clock sizing
tests/                    — Vitest tests (CSS contrast ratio validation)
audio/                    — Alarm sound (timetimer.mp3)
icons/                    — App icons (.png, .icns, .ico, extension sizes)
extension/                — Chrome/Edge extension source files
  manifest.json           — Manifest V3
  background.js           — Service worker: window management + re-focus
  popup.html              — Extension popup UI
  popup.js                — Popup logic (IIFE)
  popup.css               — Popup styling
```

## Code style

- ES6+ in IIFEs (no modules, no `import`/`export`) for browser scripts
- camelCase for JS identifiers, kebab-case for CSS classes
- CSS custom properties for theming/sizing
- 2-space indentation everywhere
- ESLint for JS, Stylelint for CSS (both run via `npm test`)

## Architecture notes

- Timer logic lives in `scripts/start.js` wrapped in an IIFE
- Timer uses `setTimeout` loop at 100ms intervals; progress shown via `conic-gradient` on overlay elements
- CSP is set via `<meta>` tag in `index.html` — `default-src 'self'; script-src 'self'`
- Always-on-top via extension: service worker re-focuses timer window when focus moves away
- Always-on-top via PiP: Document Picture-in-Picture API moves timer into OS-level always-on-top window
- Extension build: `npm run pack:extension` copies files into `dist/extension/` (index.html → timer.html)

## Extension loading

1. Run `npm run pack:extension`
2. Open `chrome://extensions` → enable Developer Mode
3. Click "Load unpacked" → select `dist/extension/`

## Git rules

- Never mention Claude, AI, or any AI tool in commit messages or PR descriptions
- Never include `Co-Authored-By` lines referencing AI in commits
