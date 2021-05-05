const express = require("express");
const app = express();

const http = require("http");
const server = http.Server(app);

const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: { 
    origin: "*",
  },
});
console.log("PROBLEME");
var timer;

const port = process.env.PORT || 3000;
// const port = 3000;
var isPlaying = false;
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit('connected',true)
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
		console.log(divide)
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
      console.log(time);

      crash = (Math.floor(Math.random() * (max - 1) + 1) / 100) * 100;
	//   console.log(max)
      console.log(crash);
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
  socket.on("getChat", (msg) => {
    console.log("socket ok 1 ");
    socket.emit("chat", msg);
  });
  socket.on("getChats", (msg) => {
    console.log("socket ok 2");
    io.emit("chats", msg);
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
