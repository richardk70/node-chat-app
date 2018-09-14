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

    socket.on('createMessage', (message) => {
        var hours = new Date().getHours()%12;
        var minutes = new Date().getMinutes();
        var secs = new Date().getSeconds();
        var createdAt = `${isTwoDigits(hours)}:${isTwoDigits(minutes)}:${isTwoDigits(secs)}`;
        console.log(message);
        console.log('created at: ', createdAt);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: createdAt
        })
    });

});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

function isTwoDigits(num) {
    if (num < 10)
        return '0' + num.toString();
    else
        return num;
}
