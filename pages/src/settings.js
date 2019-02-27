const { ipcRenderer } = require('electron')
import form from 'antd'
window.onload = () => {

    ipcRenderer.send('renderer-loaded')

    ipcRenderer.on('load-settings', (event, settings) => {
        const {host, port} = JSON.parse(settings)
        document.getElementById("host").value = host
        document.getElementById("port").value = port
    })

    document.getElementById("submit").onclick = function () {
        const host = document.getElementById("host").value
        const port = document.getElementById("port").value
        if (port <= 0 || port >= 65535) {
            alert("不合法的端口号")
            return;
        }

        ipcRenderer.send('save-settings', JSON.stringify({
            "host": host, "port": parseInt(port)
        }))

    }
}