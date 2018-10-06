const ToyRobot = require('./lib/ToyRobot');
const FileReader = require('./lib/FileReader');
const InputParser = require('./lib/InputParser');

const toyRobot = new ToyRobot();
const fileReader = new FileReader();
const inputParser = new InputParser();

const app = {};

app.readParseFile = (fileName, cb) => {
    console.log(fileReader)
    fileReader.readInputFile(fileName, (err, fileData) => {
        if (err) {
            cb(err);
            return
        }

        inputParser.parseArguements(fileData, (err, commandsList) => {
            if (err) {
                cb(err);
                return
            }

            cb(null, commandsList);
        })
    });
};

app.runRobotApp = (fileName, cb) => {
    app.readParseFile(fileName, (err, commandsList) => {
        if (err) {
            cb(err);
            return
        }

        toyRobot = toyRobot.executeCommands(commandsList);
        cb(null);
    });
};

module.exports = app;