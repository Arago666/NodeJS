#!/usr/bin/env node
const fs = require('fs');
const split2 = require("split2");
const yargs = require("yargs");
const path = require("path");

//Создаем переменную с путем до файла
//при запуске программы вводим "lesson4 -p имяФайла"
const options = yargs
    .usage("Usage: -p <path>")
    .option("p", { alias: "path", describe: "Path to file", type: "string", demandOption: true })
    .argv;

//для того, чтобы оказаться в пути относительно текущей директории
const currentDirectory = process.cwd();

//путь к просматриваемому файлу
const filePath = path.join(currentDirectory, options.path);
console.log(filePath);

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please enter a regular expression: ", function(regularExp) {
    //создаем файл логов
    const firstLog = fs.createWriteStream('requests.log', { flags: 'a', encoding: 'utf8' });
    //записываем в файл логи с введенным выражением
    fs.createReadStream(filePath, 'utf8')
        .pipe(split2())
        .on('data', function (chunk) {
            let firstLogText = chunk.toString().match(regularExp);
            if(firstLogText){
                firstLog.write(chunk);
                firstLog.write("\n");
            }
        });
});