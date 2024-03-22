const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const url = require('url');
const path = require('path');

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
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

    mainWindow.loadFile('./login.html');
}

function checkForUpdates() {
    autoUpdater.checkForUpdatesAndNotify();
}

app.on('ready', () => {
    createMainWindow();
    checkForUpdates();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'win32') {
        app.quit();
    }
});

autoUpdater.on('update-available', () => {
    console.log('Update available');
});

autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded');
    autoUpdater.quitAndInstall();
});
