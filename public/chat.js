var socket = io(); // opens up a connection

function scrollToBottom() {
    var messagePane = document.getElementById('incoming');
    var incomingList = document.getElementById('incoming-list');
    // var boxLeft = document.getElementsByClassName('left')[0];
    // boxLeft.style.height = 100 + 'vh';

    
}



socket.on('connect', function() {
    console.log('Connected to server from browser.');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server from browser.');
});

var incoming = document.getElementById('incoming-list');
// new message listener
socket.on('newMessage', function(messageData) {
    var formattedTime = dayjs(messageData.createdAt).format('h:mma');
    var messageTemplate = document.getElementById('message-template').innerHTML;
    var html = Mustache.render(messageTemplate, {
        text: messageData.text,
        from: messageData.from,
        createdAt: formattedTime
    });
    incoming.innerHTML += html;
    scrollToBottom();
});

socket.on('newLocationMessage', function(messageData) {
    var formattedTime = dayjs(messageData.createdAt).format('h:mma');
    var locationTemplate = document.getElementById('location-template').innerHTML;
    var html = Mustache.render(locationTemplate, {
        url: messageData.url,
        from: messageData.from,
        createdAt: formattedTime
    });
    incoming.innerHTML += html;
    scrollToBottom();
});

var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    var text = document.getElementById('text');
    var inputText = text.value;
    text.value = "";

    socket.emit('createMessage', {
        from: 'user',
        text: inputText
    }, function(data) {
        console.log(data);
    });
});

var sendLocationBtn = document.getElementsByTagName('button')[0];
sendLocationBtn.addEventListener('click', () => {
    sendLocationBtn.disabled = true;
    sendLocationBtn.value = 'Sending location...';
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    
    navigator.geolocation.getCurrentPosition( function(position) {
        sendLocationBtn.disabled = false;
        sendLocationBtn.value = 'Send location';
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        sendLocationBtn.disabled = false;
        sendLocationBtn.value = 'Send location';
        console.log('Unable to fetch location.');
    });
});

function isTwoDigits(num) {
    if (num < 10)
        return '0' + num.toString();
    else
        return num;
}