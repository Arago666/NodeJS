const fs = require('fs');

const readStream = new fs.ReadStream('./access.log', 'utf8');

const {Transform} = require('stream');


const transformStream = new Transform({
    transform(chunk, encoding, callback) {

        const firstLog = chunk.toString().match(/89.123.1.41.*[\n\r]/g);
        if(firstLog){
            fs.writeFile('./89.123.1.41_requests.log', firstLog, {flag: 'a'}, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }


        const secondLog = chunk.toString().match(/34.48.240.111.*[\n\r]/g);
        if(secondLog){
            fs.writeFile('./34.48.240.111_requests.log', secondLog, {flag: 'a'}, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }


        callback();
    }
});

readStream.pipe(transformStream);
