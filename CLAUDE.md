# CLAUDE.md

Strictly follow the rules in ./AGENTS.md

## Project overview

TimerUp is an Electron desktop app that displays a visual countdown timer with a clock-face UI. No frameworks — vanilla JS, HTML, and CSS only.

## Tech stack

- Electron 41 (renderer has no Node integration)
- electron-builder 26 for packaging
- Node 22+ (see `.nvmrc`)
- Vanilla JS / HTML / CSS — no transpilation, no bundler

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Launch the app in dev mode |
| `npm run dist` | Build for current platform |
| `npm run dist:mac` | Build macOS `.dmg` |
| `npm run dist:win` | Build Windows `.nsis` installer |
| `npm run dist:all` | Build for macOS + Windows |
| `npm test` | Run tests + lint (ESLint + Stylelint) |
| `npm run lint` | Lint only (ESLint + Stylelint) |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run clean` | Remove `dist/` |

All `dist:*` commands run `clean` first automatically. Always run `npm test` after making changes.

## Project structure

```
main.js            — Electron main process: creates always-on-top BrowserWindow (350x350)
index.html         — Single-page renderer with clock-face markup and CSP header
scripts/start.js   — Timer logic (IIFE): countdown via setTimeout loop at 100ms, conic-gradient CSS
styles/main.css    — All styles; CSS custom properties for clock sizing
tests/             — Vitest tests (CSS contrast ratio validation)
audio/             — Alarm sound (timetimer.mp3)
icons/             — App icons (.png, .icns, .ico)
```

## Code style

- ES6+ in IIFEs (no modules, no `import`/`export`)
- camelCase for JS identifiers, kebab-case for CSS classes
- CSS custom properties for theming/sizing
- 2-space indentation everywhere
- ESLint for JS, Stylelint for CSS (both run via `npm test`)

## Architecture notes

- Main process (`main.js`) creates a single always-on-top BrowserWindow positioned at top-right
- Renderer logic lives entirely in `scripts/start.js` wrapped in an IIFE
- Timer uses `setTimeout` loop at 100ms intervals; progress shown via `conic-gradient` on overlay elements
- CSP is set via `<meta>` tag in `index.html` — `default-src 'self'; script-src 'self'`

## Build

- electron-builder config is in `package.json` under `"build"`
- Output goes to `dist/` (gitignored)
- `publish` is set to `null` — no auto-publishing

## Git rules

- Never mention Claude, AI, or any AI tool in commit messages or PR descriptions
- Never include `Co-Authored-By` lines referencing AI in commits
