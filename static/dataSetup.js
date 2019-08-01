var myModule = require('./API_v1_0.js');

var teamStats = "";
var scoreboardInformation ="";
var today = new Date();
var i = 0;
var gameArray = [];
var fordate = today.getFullYear() + 
('0' + parseInt(today.getMonth() + 1)).slice(-2) + 
('0' + today.getDate()).slice(-2)


teamStats = "seasonal_team_stats-mlb-2019-regular-" + fordate + ".json"
scoreboardInformation = "scoreboard-mlb-2019-regular-" + fordate + ".json"
var teamStatsObject = require('../results/'+ teamStats);
//var teamsPlaying = require('../results/'+ scoreboardInformation);
exports.getTodaysJsonData = async function() {
  var temp = Object.values(teamStatsObject);
  var ArrayOfTeamStats = temp[1];

//var games = require('../results/'+ daysGameFilename);
//var teamsPlaying = require('../results/'+ scoreboardInformation);
    //console.log(games);
   // console.log(teamsPlaying);
   

  }


exports.testing = function() { 

    //console.log("JOUUUUUU "+ daysGameFilename);
    //console.log("JOUUUUUU "+ teamsPlaying);
    //var teamsPlayingJson = JSON.parse(teamsPlaying);
    console.log(ArrayOfTeamStats);
}