const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const axios = require('axios');
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

    // Check for updates
    checkForUpdates();

    // Listen for update downloaded
    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            message: 'Update downloaded. It will be installed on next app restart. Do you want to restart now?',
            buttons: ['Yes', 'No']
        }).then((response) => {
            if (response.response === 0) { // User selected "Yes"
                autoUpdater.quitAndInstall();
            }
        }).catch((error) => {
            console.error('Update downloaded dialog error:', error);
        });
    });

    // Listen for update error
    autoUpdater.on('error', (error) => {
        console.error('Update error:', error.message);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'win32') {
        app.quit();
    }
});

async function checkForUpdates() {
    try {
        const { data: releases } = await axios.get('https://api.github.com/repos/shanbhxg/tools/releases/latest');
        const latestVersion = releases.tag_name.replace('v', '');
        const currentVersion = app.getVersion();

        if (latestVersion !== currentVersion) {
            dialog.showMessageBox(mainWindow, {
                type: 'info',
                message: `A new version (${latestVersion}) of the application is available. Do you want to update now?`,
                buttons: ['Yes', 'No']
            }).then((response) => {
                if (response.response === 0) { // User selected "Yes"
                    autoUpdater.checkForUpdatesAndNotify();
                }
            });
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
}
