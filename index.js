const { app, BrowserWindow } = require('electron');
const url = require('url');
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

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

    autoUpdater.checkForUpdates();
    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
        const dialogOpts = {
            type: 'info',
            buttons: ['Restart', 'Later'],
            title: 'Application Update',
            message: process.platform === 'win32' ? releaseNotes : releaseName,
            detail: 'A new version has been downloaded. Restart the application to apply the updates.'
        };

        dialog.showMessageBox(dialogOpts).then((returnValue) => {
            if (returnValue.response === 0) autoUpdater.quitAndInstall();
        });
    });
});


app.on('window-all-closed', () => {
    if (process.platform !== 'win32') {
        app.quit();
    }
})