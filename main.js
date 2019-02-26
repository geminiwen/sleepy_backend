const { app, Menu, Tray } = require('electron')
const Server = require('./server')

let tray = null

app.dock.hide()

app.on('ready', () => {
  tray = new Tray( __dirname + '/assets/tray.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: '运行中', type: 'normal'} ,
    { type: 'separator' },
    { label: '退出', type: 'normal', click: () => (app.quit()) }
  ])
  tray.setContextMenu(contextMenu)

  let server = new Server();
})
