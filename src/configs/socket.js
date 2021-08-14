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
    // Get all users connected
    for (let [id, socket] of io.of('/').sockets) {
      const user = {
        socketId: id,
        username: socket.handshake.auth.username,
      }
      users.push(user)
    }
    // User
    const user = {
      socketId: socket.id,
      username: socket.handshake.auth.username,
    }
    // when connected, send user info to user
    socket.emit('USER_INFO', user)
    // when a user connected, send friends list to all users
    io.emit('FRIENDS_LIST', users)
    // Listening 'PRIVATE_MESSAGE' event and send message to receiver
    socket.on('PRIVATE_MESSAGE', ({ from, content, to }) => {
      io.to(to).emit('PRIVATE_MESSAGE', {
        from,
        content,
        to,
      })
    })
  })
}

export default createSocketIO
