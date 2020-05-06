var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//ここでただ一つのボードが作られる（全員共通）
var board = require('./model.js');
console.log(board);
var playerList = [];
var id = 0;
var turn = 0;
var numberOfPlayer = 0;
var goaledPlayer = 0;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    console.log('a user connected');

    //プレイヤー参加
    socket.on('player name', (playerName) => {
        id++;
        numberOfPlayer++;
        var player = {playerId: id, player_name: playerName, socketId: socket.id, move: 0, point: 0};
        playerList.push(player);
        io.emit('player info', playerList);
        if (id == 1) {
            io.emit('you are starter', "");
        }
        ;
        console.log(player);
    });

    // ゲームスタート
    socket.on('game start', () => {
        playerList.forEach(function (value) {
            value.point = 0;
            value.move = 0;
        });
        turn = 0;
        goaledPlayer = 0;
        //ゲームスタートを表示させる
        io.emit('display event', "game start" + '<br>' + playerList[0].player_name + 'の番です。');
        io.to(playerList[0].socketId).emit('your turn', "あなたの番です");
    });

    socket.on('roll dice', (dice) => {
        if (playerList[turn].move !== 23) { //ゴールしていない場合
            playerList[turn].move += dice; //サイコロの目をmoveに足す
            if (playerList[turn].move > 22) { //サイコロを足して22より大きくなった場合
                goaledPlayer++;
                playerList[turn].move = 23;
                io.emit('display event', playerList[turn].player_name + 'がゴールしました。');
            } else {
                playerList[turn].point += board[playerList[turn].move].balance;
                // マスによって分岐
                switch (board[playerList[turn].move].move) {
                    case 0:
                        io.emit('end turn', board[playerList[turn].move].title + "<br>" + "青春ポイント" + board[playerList[turn].move].balance);
                        break;
                    case "start":
                        io.emit('end turn', board[playerList[turn].move].title);
                        playerList[turn].move = 0;
                        break;
                    case "goal":
                        goaledPlayer++;
                        io.emit('end turn', board[playerList[turn].move].title + "<br>" + "青春ポイント" + board[playerList[turn].move].balance + "<br>ゴールしました。");
                        playerList[turn].move = 23;
                        break;
                    default:
                        io.emit('end turn', board[playerList[turn].move].title + "<br>" + "青春ポイント" + board[playerList[turn].move].balance + "<br>" + "移動" + board[playerList[turn].move].move);
                }
            }

        }
        if (goaledPlayer === numberOfPlayer) {
            var max = 0;
            for (var i = 1; i !== goaledPlayer; i++) {
                if (playerList[i - 1].point > playerList[i].point) {
                    max = i - 1;
                } else {
                    max = i;
                }
                console.log("今の最大値" + max);
            }
            io.emit('game over', "ゲームオーバー！<br>最高の青春を送ったのは" + playerList[max].player_name + "です！");
        }
        io.emit('player info', playerList);
        console.log("turn: " + turn + "numberofplayer: " + numberOfPlayer);
        turn++
        // ターン巻き戻し
        if (turn == numberOfPlayer) {
            turn = 0;
        }
        ;
        //次の人がゴールしてたらスキップ TODO

        io.to(playerList[turn].socketId).emit('your turn', "あなたの番です");
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});