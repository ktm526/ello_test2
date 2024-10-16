// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  console.log('Creating BrowserWindow...');
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html')
    .then(() => {
      console.log('index.html loaded successfully.');
    })
    .catch((err) => {
      console.error('Failed to load index.html:', err);
    });
}

app.whenReady().then(() => {
  console.log('App is ready.');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      console.log('Activating app and creating window.');
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  console.log('All windows closed.');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('ready', () => {
  console.log('App ready event triggered.');
});

app.on('will-finish-launching', () => {
  console.log('App will finish launching event triggered.');
});

app.on('before-quit', () => {
  console.log('App is about to quit.');
});

app.on('quit', () => {
  console.log('App quit event triggered.');
});
