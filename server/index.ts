import { serve } from '@hono/node-server'
import app from './app'
import { Server } from 'socket.io'

const HOSTNAME = '127.0.0.1'
const PORT = 3000

const server = serve({
  port: 3000,
  fetch: app.fetch,
  hostname: HOSTNAME,
})

const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.on('join room', (room) => {
    socket.join(room)
    socket.emit('room joined', room)

    const clientsInRoom = Array.from(io.sockets.adapter.rooms.get(room) || [])
    io.to(room).emit('room clients', clientsInRoom)
  })
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        const roomSockets = new Set(io.sockets.adapter.rooms.get(room) || [])
        roomSockets.delete(socket.id)

        console.log('disconnecting')
        io.to(room).emit('room clients', Array.from(roomSockets))

        if (roomSockets.size === 0) {
          console.log(`Room ${room} is now empty`)
        }
      }
    })
  })

  socket.on('timestamp change', ({ room, timestamp }) => {
    socket.to(room).emit('timestamp change', timestamp)
  })
  socket.on('pause', ({ room }) => {
    socket.to(room).emit('pause')
  })
  socket.on('play', ({ room }) => {
    socket.to(room).emit('play')
  })
})

console.log(`Server running at http://${HOSTNAME}:${PORT}/`)
