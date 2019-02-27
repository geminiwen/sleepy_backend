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

module.exports = exports = function () {
    let settingsWindow = new BrowserWindow({
        width: 600,
        height: 400,
        show: false
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
