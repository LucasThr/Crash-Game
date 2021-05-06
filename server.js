const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/RocketMoney/'));

app.get('/*', (req,res) => {
    res.sendFile(__dirname + '/dist/RocketMoney/index.html');
});


app.listen(process.env.PORT || 8080);

console.log("test port")
console.log(process.env.PORT)