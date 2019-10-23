const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const iris = require('./boston.json');
const fs = require('fs');
//const irisTesting = require('./test.json');
const irisTesting = require('../daysGameData.json');
var results = "";
var today = new Date();
var homeWinningPercentage = [];
var i = 0;
var fordate = '20190619'

// Mapping the trainingdata
const trainingData = tf.tensor2d(iris.map(match => [
    match.battingAvg, match.batterOnBasePct, match.batterSluggingPct, match.earnedRunAvg, match.pitchingAvg, match.strikeoutsPer9Innings, match.hitsAllowedPer9Innings, match.AbattingAvg, match.AbatterOnBasePct, match.AbatterSluggingPct, match.AearnedRunAvg, match.ApitchingAvg, match.AstrikeoutsPer9Innings, match.AhitsAllowedPer9Innings
]), [ 394, 14])

// Mapping the testing data
const testingData = tf.tensor2d(irisTesting.map(match => [
    match.battingAvg, match.batterOnBasePct, match.batterSluggingPct, match.earnedRunAvg, match.pitchingAvg, match.strikeoutsPer9Innings, match.hitsAllowedPer9Innings, match.AbattingAvg, match.AbatterOnBasePct, match.AbatterSluggingPct, match.AearnedRunAvg, match.ApitchingAvg, match.AstrikeoutsPer9Innings, match.AhitsAllowedPer9Innings
]), [irisTesting.length, 14])

// creating model
const outputData = tf.tensor2d(iris.map(match => [
    match.Hwin === 'W' ? 1 : 0,
    match.Hwin === 'L' ? 1 : 0,

]), [394, 2])

// Creating Model
const model = tf.sequential();


model.add(tf.layers.dense(
    {
        inputShape: 14,
        activation: 'sigmoid',
        units: 100
    }
));
model.add(tf.layers.dense({units: 175, activation: 'relu'}));
model.add(tf.layers.dense({units: 100, activation: 'relu'}));
//model.add(tf.layers.dense({units: 50, activation: 'relu'}));
model.add(tf.layers.dense(
    {
        inputShape: 10,
        units: 2,
        activation: 'softmax'
    }
));

model.summary();

// compiling model
model.compile({
    loss: "categoricalCrossentropy",
    optimizer: tf.train.adam()
})

async function train_data() {
    console.log('......Loss History.......');
    for (let i = 0; i < 40; i++) {
        let res = await model.fit(trainingData, outputData, { epochs: 40});
        console.log(`Iteration ${i}: ${res.history.loss[0]}`);
    }
}

exports.createModel = async function () {
    await train_data();

    console.log('....Model Prediction .....')
    await model.save('file:///Users/Jenna/Desktop/koulu/3/4/mlb-betting/static/testmodel');

    const TempPercentageData = model.predict(testingData);
    PercentageData = TempPercentageData.dataSync(); // get the class of highest probability

    for (i = 0; i < PercentageData.length; i += 2) {
        homeWinningPercentage.push(PercentageData[i])
    }

    var scoreboardInformation = "scoreboard-mlb-2019-regular-" + fordate + ".json"
    var teamsPlaying = require('../results/' + scoreboardInformation);

    for (i = 0; i < teamsPlaying.scoreboard.gameScore.length; i++) {
        teamsPlaying.scoreboard.gameScore[i].game["winningPercentage"] = Math.round(homeWinningPercentage[i] * 100)
    }
    var json = JSON.stringify(teamsPlaying);
    fs.writeFileSync('myjsonfile.json', json, 'utf8');
    var teamsPlaying2 = require('../myjsonfile.json');

    return (teamsPlaying2)
}

exports.results;
exports.returnResults = function () {
    return results;
}
exports.addPercentagesToJson = async function () {
}