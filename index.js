
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

    mainWindow.loadFile(path.join(__dirname, 'login.html'));
}

//      Hazel Releases
/*
app.on('ready', () => {
    createMainWindow();

    /*autoUpdater.setFeedURL({
        provider: 'github',
        owner: '20nikhil02',
        repo: 'Electron-Calci',
        private: false 
    });*

    
    setInterval(() => {
        autoUpdater.checkForUpdates();
    }, 60000);

    
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

    
    autoUpdater.on('error', (message) => {
        console.error('There was a problem updating the application');
        console.error(message);
    });
});*/



//          GitHub Release
app.on('ready', () => {
    createMainWindow();

    autoUpdater.setFeedURL({
        provider: 'github',
        owner: '20nikhil02',
        repo: 'Electron-Calci',
        private: true 
    });

    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-available",()=>{
    dialog.showMessageBox("update-available");
})

autoUpdater.on("checking-for-update",()=>{
    dialog.showMessageBox("update-available");
})

autoUpdater.on("download-progress",()=>{
    dialog.showMessageBox("update-available");
})

autoUpdater.on("update-downloaded",()=>{
    dialog.showMessageBox("update-downloaded");
})
