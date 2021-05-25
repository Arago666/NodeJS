//подключаем colors
const colors = require("colors/safe");

//функция поиска простых чисел
function findSimpleNumbers(startNumber, endNumber) {
    let simpleNumbers = []; //массив простых чисел
    let countSimpleNumbers = 0; //количество простых чисел
    let isSimple = false; // переменная для проверки числа на прототу

    for(let i=startNumber; i<=endNumber; i++){
        //так как 1 не является простым числом, проверки будут происходить начиная с 2
        if(i==1){
            continue;
        }
        //Если проверка ниже на простое чилсо не пройдет - то число будет простым.
        isSimple=true;
        //проверяем простое ли число. Если число делится хотя бы на одно число - то не простое.
        for(let j=2; j<i; j++){
            if(i%j==0){
                isSimple=false;
            }
        }
        //добавляем в массив чисел просто число
        if(isSimple==true){
            simpleNumbers[countSimpleNumbers]=i;
            countSimpleNumbers++;
        }
    }
    return simpleNumbers;
}

//Распечатать цветной массив
function printColorArray(numbersArray) {

    for(let i=0; i<numbersArray.length; i++){
        switch (i%3) {
            case 0: console.log(colors.green(numbersArray[i])); break;
            case 1: console.log(colors.yellow(numbersArray[i])); break;
            case 2: console.log(colors.red(numbersArray[i])); break;
        }
    }
}

//запуск программы
function run(startNumber,endNumber) {
    if(!Number.isInteger(startNumber) || !Number.isInteger(endNumber) ){
        console.log(colors.red("Ошибка: Одно из введенных Вами значений не является целым числом!"));
        return;
    }

    let simpleNumbers = findSimpleNumbers(startNumber,endNumber);

    if(simpleNumbers.length==0){
        console.log(colors.red(`Простых чисел между ${startNumber} и ${endNumber} нет.`));
        return;
    }

    console.log(`"Простые числа между ${startNumber} и  ${endNumber}:`);
    printColorArray(simpleNumbers);
}


//считываем данные из введенных при запуске программы
let startNumber = Number(process.argv[2]);
let endNumber = Number(process.argv[3]);

//запуск программы
run(startNumber,endNumber);


