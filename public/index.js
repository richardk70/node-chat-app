var socket = io(); // opens up a connection

socket.on('connect', function() {
    console.log('Connected to server from browser.');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server from browser.');
});

var incoming = document.getElementById('incoming-list');
// new message listener
socket.on('newMessage', function(messageData) {
    messageData.createdAt = new Date();
    var hours = messageData.createdAt.getHours()%12;
    var minutes = messageData.createdAt.getMinutes();
    var secs = messageData.createdAt.getSeconds();
    var createdAt = `${isTwoDigits(hours)}:${isTwoDigits(minutes)}:${isTwoDigits(secs)}`;

    var br = document.createElement('br');
    var dv = document.createElement('div');
    dv.className = 'timestamp';

    var li = document.createElement('li');
    var textNodeMsg = document.createTextNode(messageData.from + ': ' + messageData.text);
    var textNodeDate = document.createTextNode(createdAt);
    
    li.appendChild(textNodeMsg);
    li.appendChild(br);
    dv.appendChild(textNodeDate);
    li.appendChild(dv);
    
    incoming.appendChild(li);
});

socket.on('newLocationMessage', function(messageData) {
    var li = document.createElement('li');
    li.innerHTML = `<a href=${messageData.url} target="_blank">my current location</a>`;
    incoming.appendChild(li);
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