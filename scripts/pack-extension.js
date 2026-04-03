import { cpSync, mkdirSync, rmSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist', 'extension');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(resolve(root, 'index.html'), resolve(dist, 'timer.html'));

cpSync(resolve(root, 'styles'), resolve(dist, 'styles'), { recursive: true });
cpSync(resolve(root, 'scripts', 'start.js'), resolve(dist, 'scripts', 'start.js'), { recursive: true });
cpSync(resolve(root, 'audio'), resolve(dist, 'audio'), { recursive: true });
cpSync(resolve(root, 'icons'), resolve(dist, 'icons'), { recursive: true });

const extDir = resolve(root, 'extension');
cpSync(resolve(extDir, 'manifest.json'), resolve(dist, 'manifest.json'));
cpSync(resolve(extDir, 'background.js'), resolve(dist, 'background.js'));
cpSync(resolve(extDir, 'popup.html'), resolve(dist, 'popup.html'));
cpSync(resolve(extDir, 'popup.js'), resolve(dist, 'popup.js'));
cpSync(resolve(extDir, 'popup.css'), resolve(dist, 'popup.css'));

console.log('Extension packed to dist/extension/');
