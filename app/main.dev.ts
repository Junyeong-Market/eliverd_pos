/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

require('dotenv').config();

const url = require('url');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let mapWindow: BrowserWindow | null = null;
let payWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    center: true,
    minWidth: 1280,
    minHeight: 720,
    icon: path.join(__dirname, '../resources/icons/64x64.png'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './app.html'),
      protocol: 'file',
      slashes: true
    })
  );

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // #region 차일드 윈도우 하나 만들어봤다
  mapWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 800,
    height: 600,
    resizable: false,
    icon: path.join(__dirname, '../resources/icons/64x64.png'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  mapWindow.loadURL(`file://${__dirname}/app.html#/W_SR`);

  mapWindow.setMenuBarVisibility(false);

  mapWindow.webContents.on('did-finish-load', () => {
    if (!mapWindow) {
      throw new Error('"mapWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mapWindow.minimize();
    }
    // 여기 변경점 있음
  });

  mapWindow.on('close', e => {
    e.preventDefault();
    mapWindow?.hide();
  });

  // #endregion

  // #region 카카오페이 윈도우!
  payWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 600,
    height: 600,
    resizable: false,
    icon: path.join(__dirname, '../resources/icons/64x64.png'),
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false
    }
  });

  payWindow.setMenuBarVisibility(false);

  payWindow.webContents.on('did-finish-load', () => {
    if (!payWindow) {
      throw new Error('"payWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      payWindow.minimize();
    }
    // 여기 변경점 있음
  });

  payWindow.on('close', e => {
    e.preventDefault();
    payWindow?.hide();
  });

  payWindow.webContents.on('dom-ready', () => {
    const windowUrl = payWindow?.webContents.getURL();
    const cancelString = '/cancel/';
    const successString = '/approve/';
    if (windowUrl?.indexOf(cancelString) !== -1) {
      paysender?.send('returnCancel', windowUrl);
      payWindow?.hide();
    } else if (windowUrl?.indexOf(successString) !== -1) {
      paysender?.send('returnSuccess', windowUrl);
      payWindow?.hide();
    }
  });

  // #endregion

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('before-quit', e => {
  mainWindow.webContents.executeJavaScript('localStorage.clear();', true);
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

let sender: Electron.WebContents;
let paysender: Electron.WebContents;

ipcMain.on('openGoogleMaps', (event, arg) => {
  mapWindow?.loadURL(`file://${__dirname}/app.html#/W_SR`);
  mapWindow?.show();
  sender = event.sender;
});

ipcMain.on('sendPositionData', (event, arg1, arg2, arg3) => {
  sender.send('setLatLng', arg1, arg2, arg3);
});

ipcMain.on('openKakaoPay', async (event, arg) => {
  await payWindow?.loadURL(arg);
  payWindow?.show();
  paysender = event.sender;
});
