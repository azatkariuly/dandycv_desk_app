const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

function createWindow () {
  const win = new BrowserWindow({
    width: 1389,
    height: 959,
    minHeight: 600,
    minWidth: 1370,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      // devTools: false,
    }
  })

  win.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "../build/index.html")}`
  )

  ipcMain.on('minimizeApp', () => {
    win.minimize()
  })

  ipcMain.on('maximizeApp', () => {
    if (win.isFullScreen()) {
      win.setFullScreen(false)
    } else {
      win.setFullScreen(true)
    }
  })

  ipcMain.on('closeApp', () => {
    // TODO: check
    app.quit()
  })

  ipcMain.handle('open-folder-dialog', async (event, arg) => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    })

    return result.filePaths && result.filePaths.length > 0 ? result.filePaths[0] : null;
  })

  ipcMain.on('retrieveAutomaticPath', async (event) => {
    event.returnValue = app.getPath('desktop');
  })

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})