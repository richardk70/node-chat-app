var socket = io(); // opens up a connection
socket.on('connect', function() {
    console.log('Connected to server from browser.');

    socket.emit('createMessage', {
        from: 'messenger@disey.com',
        text: 'this is what you missed at lunch time',
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server from browser.');
});

var from = document.getElementById('from');
var text = document.getElementById('text');
var date = document.getElementById('date');

// new message listener
socket.on('newMessage', function(messageData) {
    messageData.createdAt = new Date();
    var hours = messageData.createdAt.getHours()%12;
    var minutes = messageData.createdAt.getMinutes();
    var secs = messageData.createdAt.getSeconds();
    var createdAt = `${hours}:${minutes}:${secs}`;

    from.textContent = messageData.from;
    text.textContent = messageData.text;
    date.textContent = `${hours}:${minutes}:${secs}`;
});
