import { app, BrowserWindow } from 'electron'
import * as path from 'path'

const isDevelopment = process.env.NODE_ENV === 'development'
const port = process.env.PORT || 3000

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | undefined;

function createMainWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // Only disable security in development
            webSecurity: !isDevelopment,
            allowRunningInsecureContent: isDevelopment
        }
    })

    if (isDevelopment) {
        window.webContents.openDevTools()
    }

    if (isDevelopment) {
        window.loadURL(`http://localhost:${port}`)
        window.webContents.on('did-fail-load', () => {
            setTimeout(() => {
                window.loadURL(`http://localhost:${port}`)
            }, 1000)
        })
    }
    else {
        window.loadFile(path.resolve(__dirname, './renderer/index.html'))
    }

    window.on('closed', () => {
        mainWindow = undefined;
    })

    window.webContents.on('devtools-opened', () => {
        window.focus()
        setImmediate(() => {
            window.focus()
        })
    })

    return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (!mainWindow) {
        mainWindow = createMainWindow()
    }
})

// Handle cleanup on quit
app.on('before-quit', () => {
    if (mainWindow) {
        mainWindow.removeAllListeners('close')
        mainWindow.close()
    }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow()
})