const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  fetchRenderAfterMain: () => {
    console.log('click preloader fetch render after main');
    ipcRenderer.send('fetch-render-after-main');
  },
  fetchFromMain: () => {
    console.log('click preloader fetch From Main');
    ipcRenderer.send('fetch-from-main');
  },
  fetchRenderAfterMainReplay: (callback) => ipcRenderer.on('fetch-render-after-main-replay', callback),
});
