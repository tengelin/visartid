# AGENTS.md

## Overview

TimerUp — a visual countdown timer built as a web app + Chrome/Edge extension.

## Tech stack

Vanilla JS/HTML/CSS, Chrome Extension Manifest V3, Document PiP API, Node 22+

## Commands

- `npm start` — serve web app locally (port 3000)
- `npm test` — run test suite (WCAG contrast checks) + lint (ESLint + Stylelint)
- `npm run lint` — run ESLint + Stylelint only
- `npm run lint:fix` — auto-fix lint issues
- `npm run pack:extension` — build extension into dist/extension/
- `npm run clean` — remove dist/

## Project structure

```
index.html                — Timer web app with CSP meta tag
scripts/start.js          — Timer logic (IIFE, setTimeout loop, conic-gradient, PiP)
scripts/pack-extension.js — Build script for extension packaging
styles/main.css           — All styles, CSS custom properties
tests/                    — Vitest test suite (contrast ratio validation)
audio/                    — Alarm sound
icons/                    — App icons (.png, .icns, .ico, extension sizes)
extension/                — Chrome/Edge extension source
  manifest.json           — Manifest V3 config
  background.js           — Service worker (window mgmt + re-focus)
  popup.html/js/css       — Extension popup UI
```

## Code conventions

- ES6+ in IIFEs — no modules, no transpilation, no bundler (browser scripts)
- camelCase JS, kebab-case CSS classes
- 2-space indentation everywhere
- CSS custom properties for clock sizing
- CSP enforced via `<meta>` in index.html: `default-src 'self'; script-src 'self'`

## Design principles

- Contrast and accessibility are critical — all interactive elements must have clear visual distinction and meet WCAG AA contrast ratios
- Buttons with different actions must have distinct colors so purpose is immediately obvious
- UI language is Swedish

## Important notes

- Always run `npm test` after making changes — all tests must pass before committing
- Also verify UI changes visually by running the app (`npm start`)
- ESLint (JS) and Stylelint (CSS) run as posttest — `npm test` catches both test failures and lint errors
- Extension is built via `npm run pack:extension` — output goes to `dist/extension/`
- To load the extension: `chrome://extensions` → Developer Mode → Load unpacked → `dist/extension/`

## Git rules

- Never mention Claude, AI, or any AI tool in commit messages or PR descriptions
- Never include `Co-Authored-By` lines referencing AI in commits
