# Timer-Up

A visual countdown timer with a clock-face UI. Runs as a web app in any browser, and as a Chrome/Edge extension for always-on-top behavior.

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- Node.js 22+

## Getting Started

```bash
nvm use          # switches to Node 22 via .nvmrc
npm install      # install dependencies
npm start        # serve on http://localhost:3000
```

Open `http://localhost:3000` in your browser to use the timer.

## Always on Top

Two approaches for keeping the timer visible:

### Document Picture-in-Picture (recommended)

Click the pin button in the timer UI to open the timer in an OS-level always-on-top window. Requires Chrome 116+ or Edge 116+.

### Chrome/Edge Extension

The extension re-focuses the timer window whenever another window gains focus.

#### Building the Extension

```bash
npm run pack:extension    # builds to dist/extension/
```

#### Loading the Extension

1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `dist/extension/` directory
4. Click the TimerUp extension icon → **Öppna timer**

## Project Structure

```
├── index.html               # Timer web app
├── scripts/
│   ├── start.js             # Timer logic
│   └── pack-extension.js    # Extension build script
├── styles/
│   └── main.css             # Timer styles
├── audio/
│   └── timetimer.mp3        # Timer completion sound
├── icons/                   # App icons
├── extension/               # Chrome/Edge extension source
│   ├── manifest.json        # Manifest V3
│   ├── background.js        # Service worker
│   ├── popup.html/js/css    # Extension popup
├── tests/                   # WCAG contrast tests
└── dist/                    # Built extension (git-ignored)
```

## Development

```bash
npm test         # run tests + lint
npm run lint     # lint only
npm run lint:fix # auto-fix lint issues
```

## License

© 2026 Henrik Tengelin. Licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

Users may use this app but may not reuse, modify, or commercialize the code.
