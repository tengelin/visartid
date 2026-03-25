const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

const createWindow = () => {
    const display = screen.getPrimaryDisplay()
    const {width, height} = display.workAreaSize

    const win = new BrowserWindow({
        width: 350,
        height: 350,
        alwaysOnTop: true,
        x: width - 350,
        y: 0,
        icon: path.join(__dirname, 'icons', 'icon.png')
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
