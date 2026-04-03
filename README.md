# Timer-Up

A visual countdown timer with a clock-face UI.

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

Click the pin button in the timer UI to open the timer in an OS-level always-on-top window. Requires Chrome 116+ or Edge 116+ (Document Picture-in-Picture API).

## Development

```bash
npm test         # run tests + lint
npm run lint     # lint only
npm run lint:fix # auto-fix lint issues
```

## License

© 2026 Henrik Tengelin. Licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

Users may use this app but may not reuse, modify, or commercialize the code.
