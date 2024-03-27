const { app, BrowserWindow, dialog } = require('electron');
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

app.whenReady().then(() => {
    createMainWindow();

    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', () => {
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            message: 'A new version of the application is available. Do you want to update now?',
            buttons: ['Yes', 'No']
        }).then((response) => {
            if (response.response === 0) { // User selected "Yes"
                autoUpdater.downloadUpdate();
            }
        }).catch((error) => {
            console.error('Update available dialog error:', error);
        });
    });

    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            message: 'Update downloaded. It will be installed in 5 seconds. Do you want to restart now?',
            buttons: ['Yes', 'No']
        }).then((response) => {
            if (response.response === 0) { // User selected "Yes"
                setTimeout(() => {
                    autoUpdater.quitAndInstall();
                }, 5000); // 5000 milliseconds delay (5 seconds)
            }
        }).catch((error) => {
            console.error('Update downloaded dialog error:', error);
        });
    });

    autoUpdater.on('error', (error) => {
        console.error('Update error:', error.message);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'win32') {
        app.quit();
    }
});
