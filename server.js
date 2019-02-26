const net = require('net')
const event = require('events')
const runtime = require('child_process');

const COMMAND_SLEEP = 42

module.exports = exports = class Server {
    constructor() {
        this.createServer();
    }

    createServer () {
        this.localServer = net.createServer((socket) => {
            socket.on('error', (err) => console.error(err))
            socket.on('data', (data) => {
                let command = data.readInt8(0);
                switch (command) {
                    case COMMAND_SLEEP: {
                        runtime.exec("pmset displaysleepnow");
                        socket.write(Buffer.from('*'))
                        break;
                    }
                }
                socket.end()
            })
        })
        this.localServer.listen(8999)
    }

}