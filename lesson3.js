const fs = require('fs');
const split2 = require("split2")

const firstLog = fs.createWriteStream('89.123.1.41_requests.log', { flags: 'a', encoding: 'utf8' });
const secondLog = fs.createWriteStream('34.48.240.111_requests.log', { flags: 'a', encoding: 'utf8' });

fs.createReadStream('./access.log', 'utf8')
    .pipe(split2())
    .on('data', function (chunk) {
        let firstLogText = chunk.toString().match(/89.123.1.41.*/g);
        if(firstLogText){
            firstLog.write(chunk);
            firstLog.write("\n");
        }

        let secondLogText = chunk.toString().match(/34.48.240.111.*/g);
        if(secondLogText){
            secondLog.write(chunk);
            secondLog.write("\n");
        }
    });