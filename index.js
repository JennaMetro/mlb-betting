var express = require('express');
var app = express();
var http = require('http').Server(app);
var data = require('./static/test');
var io = require('socket.io')(http);

var latestData;

data.getData().then((result) => {
    latestData = result;
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname));



http.listen(4400 || process.env.PORT, function () {
    console.log('HTTP server started on port 4000');
});
io.on('connection', function (socket) {
    socket.emit('data', latestData);
});

// refresh once a day
setInterval(function () {
    data.getData().then((result) => {
        latestData = result;
        io.emit('data', result);
        console.log('Last updated: ' + new Date());
    });
}, 86400000);