const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
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

app.on('ready', () => {
    createMainWindow();
    autoUpdater.setFeedURL({
        provider: 'github',
        owner: 'shanbhxg',
        repo: 'tools'
    });
    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-available",()=>{
    dialog.showMessageBox({
        message: "Update available",
        buttons: ["OK"]
    }).catch((err) => {
        console.error("Error showing message box:", err);
    });
});

autoUpdater.on("checking-for-update",()=>{
    dialog.showMessageBox({
        message: "Checking for update",
        buttons: ["OK"]
    }).catch((err) => {
        console.error("Error showing message box:", err);
    });
});

autoUpdater.on("update-downloaded",()=>{
    dialog.showMessageBox({
        message: "Update downloaded. Restart the application to apply the update.",
        buttons: ["OK"]
    }).catch((err) => {
        console.error("Error showing message box:", err);
    });
});
