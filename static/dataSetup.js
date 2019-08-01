var myModule = require('./API_v1_0.js');

// name is a member of myModule due to the export above

var daysGameFilename = "";
var scoreboardInformation ="";
var today = new Date();
var i = 0;
var gameArray = [];
var fordate = today.getFullYear() + 
('0' + parseInt(today.getMonth() + 1)).slice(-2) + 
('0' + today.getDate()).slice(-2)


daysGameFilename = "seasonal_team_stats-mlb-2019-regular-" + fordate + ".json"
scoreboardInformation = "scoreboard-mlb-2019-regular-" + fordate + ".json"
var games = require('../results/'+ daysGameFilename);
var teamsPlaying = require('../results/'+ scoreboardInformation);
exports.getTodaysJsonData = async function() {
//var games = require('../results/'+ daysGameFilename);
//var teamsPlaying = require('../results/'+ scoreboardInformation);
    //console.log(games);
   // console.log(teamsPlaying);
   

  }


exports.testing = function() { 
    //console.log("JOUUUUUU "+ daysGameFilename);
    //console.log("JOUUUUUU "+ teamsPlaying);
    //var teamsPlayingJson = JSON.parse(teamsPlaying);

   for (var scoreboard in teamsPlaying){
    for (var match in scoreboard){
      for (var match2 in match){
     i++;
     gameArray[i]= match2.;

     }  }};

   console.log("fjfsifjosjfoi   " + gameArray[0])
}