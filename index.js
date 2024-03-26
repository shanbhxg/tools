const { app, BrowserWindow } = require('electron');
const autoUpdater = require('electron-updater').autoUpdater;

const url = require('url');
const path = require('path');

let win;

function sendStatusToWindow(text) {
    console.log(text);
    win.webContents.send('message', text);
  }

  function createMainWindow() {
    win = new BrowserWindow({
        title: 'My Tool App',
        height: 1000,
        width: 1000,
        nodeIntegration: true,
        contextIsolation: false,
        webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
        }
    });
    win.webContents.openDevTools();
    win.on('closed', () => {
      win = null;
    });
    win.loadURL(`file://${__dirname}/login.html#v${app.getVersion()}`);
    return win;
}
  
autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  })

app.whenReady().then(() => {
    
    autoUpdater.checkForUpdatesAndNotify();
    createMainWindow();
});
