const express = require('express');
const path = require('path');
const http = require("http");

const app = express();
app.use(express.static(__dirname + '/dist/RocketMoney/'));
app.get('/*', (req,res) => {
    res.sendFile(__dirname + '/dist/RocketMoney/index.html');
});


console.log("test port")
console.log(process.env.PORT)
// app.listen(process.env.PORT || 8080);
const server = http.Server(app);


const socketIO = require("socket.io");
const INDEX = '/dist/RocketMoney/index.html';
const PORT = process.env.PORT || 3000;
// const PORT = 3000;


// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(process.env.PORT || 3000, () => console.log(`Listening on ${(process.env.PORT || 3000)}`));

const io = socketIO(server, {
  cors: { 
    // origin: "https://lucasthr-crashgame.herokuapp.com",
    origin: "*",

  }, 
});
var timer;

let ChatList = []
let BetList = []

// const port = process.env.PORT || 8080;

var isPlaying = false;
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit('connected',true)
  socket.emit("chats", ChatList);
  socket.emit("bets", BetList);

  socket.on('disconnect', () => console.log('Client disconnected'));
  //Start Chrono
  start = () => {
    io.emit("canBet", false);
    var crash;
    var max;
    time = 1.00;
    console.log("start");
    isWithdraw = false;
    max = (Math.floor(Math.random() * (1000 - 0) + 0) / 100) * 100;
    timer = setInterval(() => {

      if (time > 0 && time < 2) {
        time = Number(Number(Math.round((time += 0.01) * 100) / 100).toFixed(2)
        );
		divide = (Math.floor(Math.random() * (12 - 10) + 10) / 100) * 10;

        max = max / divide
      }
      if (time < 5 && time >= 2) {
        time = Number(
          Number(Math.round((time += 0.04) * 100) / 100).toFixed(2)
        );
        divide = (Math.floor(Math.random() * (12 - 10) + 10) / 100) * 10;

        max = max / divide;
      }
      if (time < 100 && time >= 5) {
        time = Number(
          Number(Math.round((time += 0.08) * 100) / 100).toFixed(2)
        );
        divide = (Math.floor(Math.random() * (12 - 10) + 10) / 100) * 10;

        max = max / divide;
      }

      crash = (Math.floor(Math.random() * (max - 1) + 1) / 100) * 100;
	//   console.log(max)
      io.emit("timer", time);

      if (crash == 1 || crash == 0) {
        clearTimeout(timer);
        io.emit("canBet", true);
        waitForNext();
        isCrash = true;
        if (!isWithdraw) {
          // addBet(mise, time,true);
        }
      }
    }, 100);
  };
  if (timer == undefined) {
    start();
  }
  waitForNext = () => {
    // console.log(timer);
    setTimeout(() => {
      start();
    }, 10000);
  };

  //GAME
  // socket.emit('startGame')

  //CHAT
  socket.on("sendChat", (msg) => {
    console.log("socket ok 1 ");
    ChatList.push(msg)
    io.emit("chats", ChatList);

  });
  socket.on("sendBet", (bet) => {
    console.log("socket ok 1 ");
    BetList.push(bet)
    console.log(BetList)
    io.emit("bets", BetList);

  });


});

server.listen(PORT, () => {
  console.log(`started on PORT: ${PORT}`);
});
