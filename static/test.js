var MySportsFeeds = require("mysportsfeeds-node"); 
var msf = new MySportsFeeds("1.2", true);
msf.authenticate(process.env.API_KEY, process.env.PASSWORD);
 
var today = new Date();

exports.getData = function() {
    return msf.getData('mlb', '2019-regular', 'scoreboard', 'json', { 
    fordate: today.getFullYear() + 
        ('0' + parseInt(today.getMonth() + 1)).slice(-2) + 
        ('0' + today.getDate()).slice(-2),
    force: true
    });
};
