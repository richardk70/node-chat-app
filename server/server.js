// routes
// app.listen
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public/');

const port = process.env.PORT || 3000; 

const app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');
    
    // socket.emit from admin 'welcome to the chat app'
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app'));
    // socket.broadcast.emit 'new user joined'
    var hours = new Date().getHours()%12;
    var minutes = new Date().getMinutes();
    var secs = new Date().getSeconds();
    var createdAt = `${isTwoDigits(hours)}:${isTwoDigits(minutes)}:${isTwoDigits(secs)}`;
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    
    socket.on('createMessage', (message) => {
        // var hours = new Date().getHours()%12;
        // var minutes = new Date().getMinutes();
        // var secs = new Date().getSeconds();
        var createdAt = `${isTwoDigits(hours)}:${isTwoDigits(minutes)}:${isTwoDigits(secs)}`;
        console.log(message);
        console.log('created at: ', createdAt);
        io.emit('newMessage', generateMessage(message.from, message.text));
        
        // socket.broadcast sends to every but ones own socket
        // socket.broadcast.emit('newMessage', {
            //     from: message.from,
            //     text: message.text,
            //     createdAt: createdAt
            // });
        });

        socket.on('disconnect', (socket) => {
            console.log('User disconnected.');
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
