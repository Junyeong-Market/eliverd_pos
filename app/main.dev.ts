/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */

// TODO- 아니 시발 진짜로 이거 계산하는 곳을 새로운 browserWindow를 통해서 만들자는 의견이 나와버렸습니다!!
// TODO- loadURL에다가 저거 적으면 되지 않을까라고 생각중입니다.
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
let childWindow: BrowserWindow | null = null;

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
  childWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 800,
    height: 600,
    resizable: false,
    icon: path.join(__dirname, '../resources/icons/64x64.png'),
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            nodeIntegration: true
          }
  });

  childWindow.loadURL(`file://${__dirname}/app.html#/W_SR`);

  childWindow.setMenuBarVisibility(false);

  childWindow.webContents.on('did-finish-load', () => {
    if (!childWindow) {
      throw new Error('"childWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      childWindow.minimize();
    }
    // 여기 변경점 있음
  });

  childWindow.on('close', e => {
    e.preventDefault();
    childWindow?.hide();
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
  if (childWindow === null) createWindow();
});

let sender: Electron.WebContents;

ipcMain.on('openGoogleMaps', (event, arg) => {
  childWindow?.show();
  sender = event.sender;
});

ipcMain.on('sendPositionData', (event, arg1, arg2, arg3) => {
  sender.send('setLatLng', arg1, arg2, arg3);
});
