# CLAUDE.md

Strictly follow the rules in ./AGENTS.md

## Project overview

TimerUp is a visual countdown timer with a clock-face UI, built as a pure web app. No frameworks — vanilla JS, HTML, and CSS only.

## Tech stack

- Vanilla JS / HTML / CSS — no transpilation, no bundler
- Document Picture-in-Picture API (Chrome 116+) for OS-level always-on-top
- Node 22+ (see `.nvmrc`)

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Serve web app locally on port 3000 |
| `npm test` | Run tests + lint (ESLint + Stylelint) |
| `npm run lint` | Lint only (ESLint + Stylelint) |
| `npm run lint:fix` | Auto-fix lint issues |

Always run `npm test` after making changes.

## Project structure

```
index.html               — Timer web app (clock-face markup + CSP header)
scripts/start.js          — Timer logic (IIFE): countdown via setTimeout loop, conic-gradient, PiP
styles/main.css           — All styles; CSS custom properties for clock sizing
tests/                    — Vitest tests (CSS contrast ratio validation)
audio/                    — Alarm sound (timetimer.mp3)
icons/                    — App icons (.png, .icns, .ico)
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
- Always-on-top via Document Picture-in-Picture API moves timer into OS-level always-on-top window

## Git rules

- Never mention Claude, AI, or any AI tool in commit messages or PR descriptions
- Never include `Co-Authored-By` lines referencing AI in commits
