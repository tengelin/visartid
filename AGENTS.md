# AGENTS.md

## Overview

TimerUp — an Electron desktop app that displays a visual countdown timer.

## Tech stack

Electron 41, vanilla JS/HTML/CSS, electron-builder 26, Node 22+

## Commands

- `npm start` — run the app
- `npm run dist` — build for current platform (cleans first)
- `npm run dist:mac` — build macOS .dmg
- `npm run dist:win` — build Windows installer
- `npm run dist:all` — build macOS + Windows
- `npm run clean` — remove dist/
- `npm test` — run test suite (WCAG contrast checks) + lint (ESLint + Stylelint)
- `npm run lint` — run ESLint + Stylelint only
- `npm run lint:fix` — auto-fix lint issues

## Project structure

```
main.js            — Electron main process
index.html         — Single-page renderer with CSP meta tag
scripts/start.js   — Timer logic (IIFE, setTimeout loop, conic-gradient)
styles/main.css    — All styles, CSS custom properties
tests/             — Vitest test suite (contrast ratio validation)
audio/             — Alarm sound
icons/             — App icons (.png, .icns, .ico)
package.json       — Dependencies + electron-builder config under "build"
```

## Code conventions

- ES6+ in IIFEs — no modules, no transpilation, no bundler
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
- Always clean dist before builds (the npm scripts do this automatically)
- electron-builder config lives in `package.json` under `"build"`
- `publish` is `null` — no auto-publishing configured

## Git rules

- Never mention Claude, AI, or any AI tool in commit messages or PR descriptions
- Never include `Co-Authored-By` lines referencing AI in commits
