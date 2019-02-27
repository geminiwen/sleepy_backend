const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require("fs")

ipcMain.on('renderer-loaded', (event) => {
    let configPath = app.getPath('userData')

    let configFile = configPath + "/config.json"
  
    if (fs.existsSync(configFile)) {
      let configContent = fs.readFileSync(configFile);
      event.sender.send('load-settings', configContent)
    } 
})

let settingsWindow = null

module.exports = exports = function () {
    if (settingsWindow) return

    settingsWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        // frame: false,
        resizable: false
    })

    let saveSettings = () => {
        settingsWindow.close()
    }
   
    ipcMain.on('save-settings', saveSettings)

    settingsWindow.on('closed', () => {
        settingsWindow = null
        ipcMain.removeListener('save-settings', saveSettings)
    })


    settingsWindow.once('ready-to-show', () => {
        settingsWindow.show()
    })

    settingsWindow.loadFile('pages/settings.html')
}
