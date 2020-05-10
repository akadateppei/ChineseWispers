const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
players = [];
listeners = [];
streamer = "";
nextStreamer = "";
others = [];

// index.htmlを表示
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('login', (id) => {
        players.push(id);
        console.log(players);
    });

    socket.on('game start', () => {
        listeners = [];
        streamer = "";
        nextStreamer = "";
        others = [];
        if (players.length > 1){
            startGame();
        };
    });

    function startGame() {
        console.log("はい");
        console.log(players.length);
        for (let i = 0; i !== players.length-1; i++) {
            listeners.push(players[i]);
            streamer = players[i];
            nextStreamer = players[i + 1];
            others = players.slice(i + 2, players.length + 1);
            var gameState = {listeners: listeners, streamer: streamer, nextStreamer: nextStreamer, others: others};
            console.log(gameState);
            io.emit('game started', gameState);
            console.log('gameState emitした。');
            console.log('1秒まつ');
            wait(40);
            // wait(31);
        };
    };

    socket.on('disconnect', ()=>{
       console.log('user disconnected') ;
    });
});

function getStreamer(players) { // 先頭をplayerとして取り出し、それ以外をlisnersとして配列に入れる。playersの先頭をけつに突っ込む
    var streamer = players.shift();
    var listeners = [];
    players.forEach(player => {
        listeners.push(player);
    });
    players.push(streamer);
    return listeners;
};

const wait = (sec) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, sec*1000);
        //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    });
};


// port3000でlisten
http.listen(3000, () => {
    console.log('listening on *:3000');
});