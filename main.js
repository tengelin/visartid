import { app, BrowserWindow, screen } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const createWindow = () => {
  const display = screen.getPrimaryDisplay();
  const { width } = display.workAreaSize;

  const win = new BrowserWindow({
    width: 350,
    height: 350,
    alwaysOnTop: true,
    x: width - 350,
    y: 0,
    icon: join(__dirname, 'icons', 'icon.png'),
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
