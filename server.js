const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const { NearestScanner } = require('@toio/scanner')
const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/simulator', (req, res) => {
  res.sendFile(path.join(__dirname + '/simulator.html'))
})

server.listen(3000, () => {
  console.log('listening 3000')
})

let cube = null
io.on('connection', (socket) => {
  console.log('connected')
  setInterval(() => {
    if (cube) {
      io.sockets.emit('pos', { cubes: [cube] })
    }
  }, 1000)

})


console.log('toio init')
init(io)

let num = 1
async function init(io) {
  console.log('scan')
  cube = await new NearestScanner().start()
  console.log('scan done')
  cube.connect()
  console.log('connect done')
}
