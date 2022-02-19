const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const { NearScanner } = require('@toio/scanner')
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


io.on('connection', (socket) => {
  console.log('connected')
  init(io)
})

let num = 1
let cubes = new Array(num)
async function init(io) {
  try {
    cubes = await new NearScanner(num).start()
    for (let i = 0; i < num; i++) {
      cubes[i].connect()
    }
    setInterval(() => {
      io.sockets.emit('pos', { cubes: cubes })
    }, 1000)
  } catch (err) {
    console.log(err)
  }
}
