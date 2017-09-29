const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('disconnect', () => {
        console.log('User disConnected');
    });

    socket.on('createMessage', (message) => {
        console.log('Create Message', message);
    });


    socket.emit('newMessage', {
        from: 'mike',
        text: 'Hey',
        createdAt : 123
    });
});


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});