const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');
    
    socket.on('join', (queryString, callback) => {
        if (!isRealString(queryString.name) || !isRealString(queryString.room)) {
            return callback('Name and room name required.');
        }

        socket.join(queryString.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, queryString.name, queryString.room);

        io.to(queryString.room).emit('updateUserList', users.getUserList(queryString.room));
        socket.emit('newMessage', generateMessage('Admin', `Welcome to the Chat app, ${queryString.name}!`));
        socket.broadcast.to(queryString.room).emit('newMessage', generateMessage('Admin', `${queryString.name} has joined.`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text, message.createdAt));
        callback('this is the callback call from the server');
        });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            console.log(`${user.name} has left the room.`);
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
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

        // socket.leave(queryString.room);
        // io.emit - sends to every connected user
        // io.to('room name').emit - send to every user in the room
        // socket.broadcast.emit - sends message to every but current user
        // socket.broadcast.to('room name').emit - sends message to every user in room but the current user
        // socket.emit - emits to specifically 1 user