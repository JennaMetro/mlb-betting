var myModule = require('./API_v1_0.js');

var teamStatsString = "";
var scoreboardInformation ="";
var today = new Date();
var gameStatsJson = [];
var teams = [];
var tempAway = {}
var tempHome = {}

var fordate = today.getFullYear() + 
('0' + parseInt(today.getMonth() + 1)).slice(-2) + 
('0' + today.getDate()).slice(-2)
exports.getTodaysJsonData = async function() {

teamStatsString = "seasonal_team_stats-mlb-2019-regular-" + fordate + ".json"
scoreboardInformation = "scoreboard-mlb-2019-regular-" + fordate + ".json"
var teamStatsObject = require('../results/'+ teamStatsString);
var teamsPlaying = require('../results/'+ scoreboardInformation);

  var temp = Object.values(teamStatsObject);
  var arrayOfTeamStats = temp[1];
  var teamsPlayingTemp = Object.values(teamsPlaying);
  var tempteams  = Object.values(arrayOfTeamStats)
  var arrayOfTeamsPlaying = teamsPlayingTemp[0].gameScore;

arrayOfTeamStats.forEach(team => {
var teamStats = {};
teamStats["ID"] = team.team.id;
teamStats["battingAvg"] = team.stats.batting.battingAvg;
teamStats["batterOnBasePct"] = team.stats.batting.batterOnBasePct;
teamStats["batterSluggingPct"] = team.stats.batting.batterSluggingPct;
teamStats["earnedRunAvg"] = team.stats.pitching.earnedRunAvg;
teamStats["pitchingAvg"] = team.stats.pitching.pitchingAvg;
teamStats["strikeoutsPer9Innings"] = team.stats.pitching.strikeoutsPer9Innings;
teamStats["hitsAllowedPer9Innings"] = team.stats.pitching.hitsAllowedPer9Innings;
teams.push(teamStats);
  })

arrayOfTeamsPlaying.forEach(game => {
 
  for(var i=0; i<=teams.length-1; i++){
if (teams[i].ID == game.game.homeTeam.ID){
  homeTeam = teams[i];
}
    if (teams[i].ID == game.game.awayTeam.ID){
      awayTeam = teams[i];
}
  
}
//build testing.json
gameStatsJson.push("{ battingAvg: "+ homeTeam.battingAvg + ", batterOnBasePct: " + homeTeam.batterOnBasePct + ", batterSluggingPct: " + homeTeam.batterSluggingPct + ", earnedRunAvg: " + homeTeam.earnedRunAvg + ", pitchingAvg: " + homeTeam.pitchingAvg + ", strikeoutsPer9Innings: " + homeTeam.strikeoutsPer9Innings + ", hitsAllowedPer9Innings: " + homeTeam.hitsAllowedPer9Innings + "AbattingAvg: "+ awayTeam.battingAvg + ", AbatterOnBasePct: " + awayTeam.batterOnBasePct + ", AbatterSluggingPct: " + awayTeam.batterSluggingPct + ", AearnedRunAvg: " + awayTeam.earnedRunAvg + ", ApitchingAvg: " + awayTeam.pitchingAvg + ", AstrikeoutsPer9Innings: " + awayTeam.strikeoutsPer9Innings + ", AhitsAllowedPer9Innings: " + awayTeam.hitsAllowedPer9Innings + "}");
  //const getFruit = teams.find(team => team.ID === game.game.homeTeam.ID);
 // let resultObject = search(game.game.homeTeam.ID, teams);
 
  })
  console.log(gameStatsJson)
  // gameStatsJson
    //for(var i=0; i<=arrayOfTeamsPlaying.length-1; i++){
      //console.log(game.game.homeTeam.ID = arrayOfTeamStats[i].team.id)
  //  if(game.game.homeTeam.ID = arrayOfTeamStats[i].team.id)
    //  console.log(arrayOfTeamStats[i].team.id)
      //console.log(game.game.homeTeam.ID)
}
   // }

/*     homeTeams.push(game.game.homeTeam.ID)
    awayTeams.push(game.game.awayTeam.ID) */
    
  
/* 
    for(var i=0; i<homeTeams.length;i++){
      for(var i=0; i<arrayOfTeamStats[0].length;i++){
        console.log(arrayOfTeamStats[0]) */
        //if (team.team.id = homeTeams[i]){
         // console.log("tulis")
        
      
      //console.log(homeTeams[i] + " " + arrayOfTeamStats )
        
 


  
 // var homeTeam = arrayOfTeamStats.filter(team.id = game.game.homeTeam.ID)
 // gameStatsJson.push("battingAvg: ");


/* 

      }})

  //todaysGameIds.push(game.game.homeTeam.ID + " " + game.game.awayTeam.ID)
  arrayOfTeamStats.forEach(team => {

    if(team.team.id = game.game.homeTeam.ID){
   // console.log(team.team.id)


  "battingAvg": 
  "batterOnBasePct": 
  "batterSluggingPct":
  "earnedRunAvg":
  "pitchingAvg": 
"strikeoutsPer9Innings"
    "hitsAllowedPer9Innings"
 */
  //console.log(game.game.awayTeam.ID)
  //console.log(game.game.homeTeam.ID)

//var games = require('../results/'+ daysGameFilename);
//var teamsPlaying = require('../results/'+ scoreboardInformation);
    //console.log(games);
   // console.log(teamsPlaying);};