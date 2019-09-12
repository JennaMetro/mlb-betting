var myModule = require('./API_v1_0.js');
const fs = require('fs');
var teamStatsString = "";
var scoreboardInformation = "";
var today = new Date();
var gameStatsJson = {};
var teams = [];

var fordate = today.getFullYear() +
  ('0' + parseInt(today.getMonth() + 1)).slice(-2) +
  ('0' + today.getDate()).slice(-2)
exports.getTodaysJsonData = async function () {

  teamStatsString = "seasonal_team_stats-mlb-2019-regular-" + fordate + ".json"
  scoreboardInformation = "scoreboard-mlb-2019-regular-" + fordate + ".json"
  var teamStatsObject = require('../results/' + teamStatsString);
  var teamsPlaying = require('../results/' + scoreboardInformation);

  var temp = Object.values(teamStatsObject);
  var arrayOfTeamStats = temp[1];
  var teamsPlayingTemp = Object.values(teamsPlaying);
  var tempteams = Object.values(arrayOfTeamStats)
  var arrayOfTeamsPlaying = teamsPlayingTemp[0].gameScore;

  // create data for all the teams
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

    for (var i = 0; i <= teams.length - 1; i++) {
      if (teams[i].ID == game.game.homeTeam.ID) {
        var homeTeam = teams[i];
      }
      if (teams[i].ID == game.game.awayTeam.ID) {
        var awayTeam = teams[i];
      }
    }

    //Create json for todays team
    var tempMatch = {

      battingAvg: homeTeam.battingAvg,
      batterOnBasePct: homeTeam.batterOnBasePct,
      batterSluggingPct: homeTeam.batterSluggingPct,
      earnedRunAvg: homeTeam.earnedRunAvg,
      pitchingAvg: homeTeam.pitchingAvg,
      strikeoutsPer9Innings: homeTeam.strikeoutsPer9Innings,
      hitsAllowedPer9Innings: homeTeam.hitsAllowedPer9Innings,
      AbattingAvg: awayTeam.battingAvg,
      AbatterOnBasePct: awayTeam.batterOnBasePct,
      AbatterSluggingPct: awayTeam.batterSluggingPct,
      AearnedRunAvg: awayTeam.earnedRunAvg,
      ApitchingAvg: awayTeam.pitchingAvg,
      AstrikeoutsPer9Innings: awayTeam.strikeoutsPer9Innings,
      AhitsAllowedPer9Innings: awayTeam.hitsAllowedPer9Innings
    };
    gameStatsJson.push(tempMatch)

  })

  fs.writeFileSync('daysGameData.json', JSON.stringify(gameStatsJson))
}