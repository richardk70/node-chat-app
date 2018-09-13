// routes
// app.listen
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public/');

const port = process.env.PORT || 3000; 

const app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('disconnect', (socket) => {
        console.log('User disconnected.');
    });

    socket.emit('newMessage', {
        from: 'messenger@home.com',
        text: 'this is the text messsage',
        createdAt: new Date()
    });

    socket.on('createMessage', (newMessage) => {
        var hours = new Date().getHours()%12;
        var minutes = new Date().getMinutes();
        var secs = new Date().getSeconds();
        var createdAt = `${hours}:${minutes}:${secs}`;
        console.log(newMessage);
        console.log('created at: ', createdAt);
    });

});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
