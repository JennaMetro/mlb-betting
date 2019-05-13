var express = require('express');
var app = express();
var http = require('http').Server(app);
var data = require('./static/test');

// Global variable to store the latest NHL results
var latestData;
// Load the NHL data for when client's first connect
// This will be updated every 10 minutes
data.getData().then((result) => { 
    latestData = result;
});

/*     data.getData().then((result) => { 
    latestData = result;
    for(var i in latestData){
        results.push([i, latestData [i]]);
        } */

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname));



http.listen(4100 || process.env.PORT , function(){
    console.log('HTTP server started on port 4000' );
});
