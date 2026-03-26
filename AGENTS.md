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

## Project structure

```
main.js            — Electron main process
index.html         — Single-page renderer with CSP meta tag
scripts/start.js   — Timer logic (IIFE, setTimeout loop, conic-gradient)
styles/main.css    — All styles, CSS custom properties
audio/             — Alarm sound
icons/             — App icons (.png, .icns, .ico)
package.json       — Dependencies + electron-builder config under "build"
```

## Code conventions

- Vanilla ES5+ in IIFEs — no modules, no transpilation, no bundler
- camelCase JS, kebab-case CSS classes
- 2-space indent in HTML/CSS, 4-space in JS
- CSS custom properties for clock sizing
- CSP enforced via `<meta>` in index.html: `default-src 'self'; script-src 'self'`

## Design principles

- Contrast and accessibility are critical — all interactive elements must have clear visual distinction and meet WCAG AA contrast ratios
- Buttons with different actions must have distinct colors so purpose is immediately obvious
- UI language is Swedish

## Important notes

- No test suite and no linter — verify changes by running the app (`npm start`)
- Always clean dist before builds (the npm scripts do this automatically)
- electron-builder config lives in `package.json` under `"build"`
- `publish` is `null` — no auto-publishing configured

## Git rules

- Never mention Claude, AI, or any AI tool in commit messages or PR descriptions
- Never include `Co-Authored-By` lines referencing AI in commits
