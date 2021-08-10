import socketIO from 'socket.io'

const createSocketIO = (httpServer) => {
  const io = socketIO(httpServer, {
    allowEIO3: true,
    cors: {
      origin: true,
      credentials: true,
    },
  })

  io.on('connect', (socket) => {
    let users = []
    for (let [id, socket] of io.of('/').sockets) {
      const { username } = socket.handshake.auth
      const user = {
        id,
        username,
      }
      users.push(user)
    }
  })
}

export default createSocketIO
