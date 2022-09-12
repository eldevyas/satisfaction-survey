import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    let Online = 0;

    io.on('connection', socket => {
        Online++;

        socket.emit('online', Online);

        socket.on('change-count', count => {
            socket.emit('update-count', count)
            console.log('updating count: ', count)
        })

        socket.on('disconnect', function () {
            socket.emit('disconnected');
            Online = Online - 1;
      
        });
    })

  }
  res.end()
}

export default SocketHandler