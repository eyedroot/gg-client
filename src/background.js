import { app, protocol, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import express from 'express';
import { decode } from '@msgpack/msgpack';

const isDevelopment = process.env.NODE_ENV !== 'production';
const server = express();

server.use(express.json({ limit: Infinity }));
server.use(express.urlencoded({ limit: Infinity, extended: true }));

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      devTools: true,
    },
    frame: false,
    thickFrame: false,
  });

  ipcMain.handle('handleAlwaysOnTop', (event, value) => {
    win.setAlwaysOnTop(!value); // invert the value because the value is the previous state
  });

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('is-native-dark-mode', nativeTheme.shouldUseDarkColors);

    nativeTheme.on('updated', () => {
      win.webContents.send('is-native-dark-mode', nativeTheme.shouldUseDarkColors);
    });
  });

  server.use(
    express.raw({
      type: 'application/x-msgpack',
      limit: '512mb',
    }),
  );

  server.post('/api/receiver', (req, res) => {
    try {
      const data = decode(req.body);

      if (isDevelopment) {
        console.log('Decoded Data', data);
      }

      // send to renderer
      win.webContents.send('gg', data);

      res.status(200).send('gg');
    } catch (error) {
      console.error('Decoding Failed', error);
      res.status(500).send('Decoding Failed');
    }
  });

  server.get('/api/ping', (req, res) => {
    res.status(200).send('pong');
  });

  server.listen(21868, '0.0.0.0', () => {
    console.log('server started at http://0.0.0.0:21868');
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  await createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
