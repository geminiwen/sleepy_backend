const { app, Menu, Tray, ipcMain } = require('electron')
const Server = require('./server')
const showSettings = require('./settings')
const fs = require('fs')

let tray = null
let server = null

app.dock.hide()


function startServer(cb) {
  let configPath = app.getPath('userData')

  let configFile = configPath + "/config.json"

  if (fs.existsSync(configFile)) {
    let configContent = fs.readFileSync(configFile);

    try {
      let config = JSON.parse(configContent);
      server = new Server(config.host, config.port);
      cb && cb(null);
    } catch(e) { cb(e); }
  } else {
    cb(new Error("尚未配置"))
  }
}

function updateStateOfMenu(state) {
  if (state) {
    tray.setImage( __dirname + "/assets/tray.png")
  } else {
    tray.setImage( __dirname + "/assets/tray_disable.png")
  }
}

app.on('ready', () => {
  tray = new Tray( __dirname + '/assets/tray_disable.png')

  const contextMenu = Menu.buildFromTemplate([
    { label: '设置', type: 'normal', click: showSettings },
    { type: 'separator' },
    { label: '退出', type: 'normal', click: () => app.quit() }
  ])
  tray.setContextMenu(contextMenu)

  startServer((e) => {
    if (e) { updateStateOfMenu(false) } 
    else { updateStateOfMenu(true) }
  });

  ipcMain.on('save-settings', (event, settings) => {
    let configPath = app.getPath('userData')

    let configFile = configPath + "/config.json" 

    fs.writeFileSync(configFile, settings)

    server && server.stopServer();
    updateStateOfMenu(false)

    startServer((e) => {
      if (e) { updateStateOfMenu(false)} 
      else { updateStateOfMenu(true) }
    });
  })
  
})

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


