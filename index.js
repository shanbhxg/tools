const { app, BrowserWindow } = require('electron');
const autoUpdater = require('electron-updater').autoUpdater;

const url = require('url');
const path = require('path');

let win;

function sendStatusToWindow(text) {
    log.info(text);
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
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
  })
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
  })
  autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
  });

app.whenReady().then(() => {
    createMainWindow();

});

app.on('ready', function() {
  createMainWindow();
  autoUpdater.checkForUpdatesAndNotify();
});
