const { After, Status } = require("cucumber");
const fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer.from(data, 'base64'));
    stream.end();
}
After(function (testCase) {
    if (testCase.result.status === Status.FAILED) {
        return browser.takeScreenshot().then(function (screenshot) {
            const imageName = testCase.pickle.name.replace(/(?!\.[^.]+$)\.|[^\w.]+/g, '')
            writeScreenShot(screenshot, `${imageName}.png`);
        });
    }
});