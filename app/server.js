const express = require('express');
const app = express();

var http = require('http').createServer(app);
// var io = require('socket.io')(http);


// const Peer = require('skyway-js');
// const peer = new Peer({key: '672ecab7-6a69-4ae8-814f-f3a50e089d6c'});

// index.htmlを表示
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// port3000でlisten
http.listen(3000, () => {
    console.log('listening on *:3000');
});