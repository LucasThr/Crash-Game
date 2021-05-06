const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/rocket-money/dist/'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join('./rocket-money/dist/index.html'));
});


app.listen(process.env.PORT || 8000);