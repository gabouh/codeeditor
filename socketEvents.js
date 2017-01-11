exports = module.exports = function (io) {
  io.on('connection', function (socket) {
    //socket.join('codeLobby');
    socket.on('coder mounted', function (user) {
      // TODO: Does the server need to know the user?
      console.log('Coder Connected');
      socket.emit('receive socket', socket.id)
    })
    // socket.on('leave channel', function(channel) {
    //   socket.leave(channel)
    // })
    // socket.on('join channel', function(channel) {
    //   socket.join(channel.name)
    // })
    socket.on('folder add', function (folder) {
      socket.broadcast.emit('folder add bc', folder);
    });

    socket.on('folder edit', function (folder) {
      socket.broadcast.emit('folder edit bc', folder);
    });

    socket.on('folder delete', function (folder) {
      socket.broadcast.emit('folder delete bc', folder);
    });

    socket.on('file add', function (data) {
      console.log('file added..........');
      console.log(data);
      socket.broadcast.emit('file add bc', data)
    });
    socket.on('file edit', function (data) {
      console.log('file name edited..........');
      socket.broadcast.emit('file edit bc', data)
    });

    socket.on('code edit', function (data) {
      console.log('code edited..........');
      socket.broadcast.emit('code edit bc', data)
    });

    socket.on('file delete', function (data) {
      console.log('file deleted..........');
      socket.broadcast.emit('file delete bc', data)
    });




    // socket.on('typing', function (data) {
    //   socket.broadcast.to(data.channel).emit('typing bc', data.user);
    // });
    // socket.on('stop typing', function (data) {
    //   socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
    // });
    // socket.on('new private channel', function(socketID, channel) {
    //   socket.broadcast.to(socketID).emit('receive private channel', channel);
    // })
  });
}