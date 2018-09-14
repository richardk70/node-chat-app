var socket = io(); // opens up a connection
socket.on('connect', function() {
    console.log('Connected to server from browser.');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server from browser.');
});

var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    var from = document.getElementById('from');
    var text = document.getElementById('text');
    var inputFrom = from.value;
    var inputText = text.value;
    from.value = "";
    text.value = "";

    socket.emit('createMessage', {
        from: inputFrom,
        text: inputText
    }, function(data) {
        console.log(data);
    });
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


function isTwoDigits(num) {
    if (num < 10)
        return '0' + num.toString();
    else
        return num;
}