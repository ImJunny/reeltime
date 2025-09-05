import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'
import { ref } from 'vue'

export const useSocketStore = defineStore('socket', () => {
  // Socket instance
  const socket = ref<Socket | null>(null)

  const roomId = ref<string | null>(null)
  const timestamp = ref<number>(0)
  const isPlaying = ref<boolean>(false)

  // Connect to the server
  function connect() {
    if (!socket.value) {
      socket.value = io('http://127.0.0.1:3000')
      socket.value.on('connect', () => {
        console.log('Socket connected:', socket.value?.id)
      })
      socket.value.on('room joined', (room: string) => {
        console.log(`Joined room: ${room}`)
        roomId.value = room
      })
      socket.value.on('disconnect', () => {
        console.log('Socket disconnected')
      })

      socket.value.on('timestamp change', (ts: number) => {
        timestamp.value = ts
      })
      socket.value.on('pause', () => {
        isPlaying.value = false
      })
      socket.value.on('play', () => {
        isPlaying.value = true
      })
    }
  }

  function joinRoom(room: string) {
    if (!socket.value) connect()
    socket.value?.emit('join room', room)
  }
  function disconnect() {
    socket.value?.disconnect()
    socket.value = null
  }

  function sendTimestamp(timestamp: number) {
    if (!socket.value) return
    socket.value.emit('timestamp change', { room: roomId.value, timestamp })
  }
  function pause() {
    if (!socket.value) return
    isPlaying.value = false
    socket.value.emit('pause', { room: roomId.value })
  }
  function play() {
    if (!socket.value) return
    isPlaying.value = true
    socket.value.emit('play', { room: roomId.value })
  }

  return {
    socket,
    roomId,
    timestamp,
    isPlaying,
    connect,
    joinRoom,
    disconnect,
    sendTimestamp,
    pause,
    play,
  }
})
