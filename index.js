var express = require('express');
require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
var ejs = require('ejs');
var app = express();
var http = require('http').Server(app);
var data = require('./static/test');
var model = require('./static/model')
var daysGames = require('./static/dataSetup')
var io = require('socket.io')(http);
var latestData;
var newestData;





const getInfo = async () => {
  await data.getData().then((result) => {
        latestData = result;
       // console.log(latestData)
    });
    
  await  data.getStatsForToday().then((result) => {
        todaysStats = result;
    });
    await daysGames.getTodaysJsonData();
    
    
   }
   
   const fuvk = async () => {
    await model.createModel().then((result) => {
       newestData = result;
       
   console.log(newestData);
    });
}

   getInfo();
   fuvk();
   const website = async () => {
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile); 
    await app.get('/', function (req, res) {
        var test = "tjs";
    res.sendFile(__dirname + '/index.html', {test:test.toString()});
});

 app.use('/static', express.static(__dirname + '/static'));
 app.use(express.static(__dirname));

 http.listen( process.env.PORT || 4400, function () {
    console.log('HTTP server started on port 4000');
});
 io.on('connection', function (socket) {
     socket.emit('data', newestData);
});
   }
   website();




// refresh once per hour
setInterval(function () {
    data.getData().then((result) => {
        latestData = result;
        io.emit('data', result);
        console.log('Last updated: ' + new Date());
    });
}, 3600000);

/* 


document.getElementById("predictButton").addEventListener("click", function(){
        
    document.getElementById("output").innerHTML = returnResults();
          });
 */