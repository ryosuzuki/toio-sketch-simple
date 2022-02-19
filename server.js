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
// io.on('connection', (socket) => {
//   console.log('connected')
//   setInterval(() => {
//     if (cube) {
//       io.sockets.emit('pos', { cubes: [cube] })
//     }
//   }, 1000)
// })

async function main() {
  const cube = await new NearestScanner().start()
  cube.connect()
  // set listeners to show toio ID information
  cube
    .on('id:position-id', data => console.log('[POS ID]', data))
    .on('id:standard-id', data => console.log('[STD ID]', data))
    .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
    .on('id:standard-id-missed', () => console.log('[STD ID MISSED]'))
}

main()
