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

const port = process.env.PORT || 3000;
// const port = 3000;

io.on("connection", (socket) => {
	start = () => {
		var crash;
		var max;
		time = 1;
		var timer;
		console.log("start");
		isWithdraw = false;
		max = (Math.floor(Math.random() * (500 - 0) + 0) / 100) * 100;
		timer = setInterval(() => {
		  if (time > 0 && time < 2) {
			time = Number(
			  Number(Math.round((time += 0.01) * 100) / 100).toFixed(2)
			);
		  }
		  if (time < 5 && time >= 2) {
			time = Number(
			  Number(Math.round((time += 0.04) * 100) / 100).toFixed(2)
			);
			divide = (Math.floor(Math.random() * (2 - 1) + 1) / 100) * 100;
	
			max = max / divide;
		  }
		  if (time < 100 && time >= 5) {
			time = Number(
			  Number(Math.round((time += 0.08) * 100) / 100).toFixed(2)
			);
			max = max / 2;
		  }
		  console.log(time);
		  crash = (Math.floor(Math.random() * (max - 1) + 1) / 100) * 100;
		  console.log(crash);
		  io.emit("timer", time);
	
		  if (crash == 1 || time==0) {
			clearTimeout(timer);
			isCrash = true;
			if (!isWithdraw) {
			  // addBet(mise, time,true);
			}
		  }
		}, 100);
	  };
	
	  stop = () => {
		clearTimeout(timer);
	  };
  console.log("user connected");
  socket.emit("welcome");

  //GAME
  // socket.emit('startGame')
  start()

 

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
