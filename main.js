const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');



function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'My Tool App',
        height: 1000,
        width: 1000,
        icon: './assets/img/icon.png',
        nodeIntegration: true,
        contextIsolation: false,
        webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }
    });

    mainWindow.loadFile('./login.html');
}
  

app.whenReady().then(() => {
    createMainWindow();

   
});


app.on('window-all-closed', () => {
    if (process.platform !== 'win32') {
        app.quit();
    }
})
