const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// Init new window

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  })
  win.setMenu(null)

  const localhost = 'http://localhost:3000'
  const indexFile = `file://${path.join(__dirname, '../dist/index.html')}`

  if (isDev) {
    win.loadURL(localhost)
    win.webContents.openDevTools()
  } else {
    win.loadURL(indexFile)
  }

  win.on('ready-to-show', () => {
    win.show()
  })
}

// Create window when app loads

app.whenReady().then(createWindow)

// Handle app events

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
