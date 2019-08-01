var MySportsFeeds = require("mysportsfeeds-node"); 
var msf = new MySportsFeeds("1.2", true);
var msf2 = new MySportsFeeds("2.0", true);
//msf.authenticate(process.env.API_KEY, process.env.PASSWORD);
msf.authenticate("a6e9e6be-dfdb-4fca-bae5-afcf75", "Mummeli6");
msf2.authenticate("3d116428-7e5b-4798-b799-d8706b", "MYSPORTSFEEDS");
var today = new Date();

exports.getData = async function() {
    return msf.getData('mlb', '2019-regular', 'scoreboard', 'json', { 
    fordate: today.getFullYear() + 
        ('0' + parseInt(today.getMonth() + 1)).slice(-2) + 
        ('0' + today.getDate()).slice(-2),
    force: true
    })}
    exports.getStatsForToday = async function() {
        return msf2.getData('mlb', '2019-regular', 'seasonal_team_stats', 'json', { 
        fordate: today.getFullYear() + 
            ('0' + parseInt(today.getMonth() + 1)).slice(-2) + 
            ('0' + today.getDate()).slice(-2),
        force: true
        });
}


