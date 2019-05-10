var MySportsFeeds = require("mysportsfeeds-node");
 
var msf = new MySportsFeeds("1.2", true, null);
msf.authenticate("a6e9e6be-dfdb-4fca-bae5-afcf75", "Mummeli6");
 
var today = new Date();
 
exports.getData = function() {
        return msf.getData('mlb', '2019-regular', 'scoreboard', 'json', {
            fordate:20190428,
            force:true
        });
        document.getElementById('message').innerHTML = lengthOfName;
};


