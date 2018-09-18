const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
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
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    
    socket.on('createMessage', (message, callback) => {
        // var hours = new Date().getHours();
        // if (hours > 12)
        //     hours = hours - 12;
        // var minutes = new Date().getMinutes();
        // var secs = new Date().getSeconds();
        // var createdAt = `${isTwoDigits(hours)}:${isTwoDigits(minutes)}:${isTwoDigits(secs)}`;
        console.log('createMessage: ', message.text);
        console.log('created at: ', message.createdAt);
        io.emit('newMessage', generateMessage(message.from, message.text, message.createdAt));
        callback('this is the callback call from the server');
        });

        socket.on('createLocationMessage', (coords) => {
            io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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
