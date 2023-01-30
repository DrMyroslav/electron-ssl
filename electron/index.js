const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const { httpFetch, setRequestOptions } = require('./fetch');

app.commandLine.appendSwitch('ignore-connections-limit');

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    });
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preloader.js'),
    },
  });
  win.loadURL(startUrl);
  win.webContents.openDevTools();
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  ipcMain.on('fetch-render-after-main', async event => {
    console.log('fetch main 1 => ');
    const res = await setRequestOptions();
    console.log('fetch main 2 => ', res);
    win.webContents.send('fetch-render-after-main-replay');
    console.log('response render after main => ');
  });

  ipcMain.on('fetch-from-main', async event => {
    console.log('fetch main 1 => ');
    const res = await httpFetch();
    console.log('response from main => ');
  });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  console.log('certificate-error => ');
  if (url === 'https://github.com') {
    // Verification logic.
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});

app.on('select-client-certificate', async (event, webContents, url, list, callback) => {
  event.preventDefault();
  console.log('select-client certificate =>', list.length);
  // console.log(await dialog.showCertificateTrustDialog({ properties: ['openFile', 'multiSelections'] }))
  callback(list[0]);
});
