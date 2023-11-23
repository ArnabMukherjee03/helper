const socketIO = require('socket.io');

let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: 'https://helper-topaz.vercel.app', // Replace with your frontend's actual origin
            methods: ['GET', 'POST','PUT'],
        },
     });


    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}

function getIo() {
    if (!io) {
        throw new Error('Socket.IO not initialized');
    }
    return io;
}

module.exports = { initializeSocket, getIo };
