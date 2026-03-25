# Timer-Up

A visual countdown timer built with Electron. Features a clock-face style timer with audio alerts when time is up.

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- Node.js 22+ (required by `@electron/rebuild`)

## Getting Started

```bash
nvm use          # switches to Node 22 via .nvmrc
npm install      # install dependencies
npm start        # launch the app
```

## Building Installers

```bash
npm run dist       # build installer for current platform
npm run dist:mac   # build macOS installer (.dmg)
npm run dist:win   # build Windows installer (.exe)
npm run dist:all   # build both macOS and Windows installers
```

Distributables are output to the `dist/` directory. The build automatically cleans previous output and removes intermediate artifacts, leaving only the installer files.

## Project Structure

```
├── main.js          # Electron main process
├── index.html       # App UI
├── scripts/
│   └── start.js     # Renderer process logic
├── styles/
│   └── main.css     # App styles
├── audio/
│   └── timetimer.mp3  # Timer completion sound
├── icons/           # App icons (png, ico, icns)
├── package.json     # Dependencies & build config
└── dist/            # Built installers (git-ignored)
```
