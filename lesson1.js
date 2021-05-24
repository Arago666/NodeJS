//подключаем colors
const colors = require("colors/safe");

//функция поиска простых чисел
function FindSimpleNumbers(startNumber, endNumber) {
    let SimpleNumbers = []; //массив простых чисел
    let CountSimpleNumbers = 0; //количество простых чисел
    let IsSimple = false; // переменная для проверки числа на прототу

    //так как 1 не является простым числом, проверки будут происходить начиная с 2
    if(startNumber==1){
        startNumber=2;
    }

    for(let i=startNumber; i<=endNumber; i++){
        //Если проверка ниже на простое чилсо не пройдет - то число будет простым.
        IsSimple=true;
        //проверяем простое ли число. Если число делится хотя бы на одно число - то не простое.
        for(let j=2; j<i; j++){
            if(i%j==0){
                IsSimple=false;
            }
        }
        //добавляем в массив чисел просто число
        if(IsSimple==true){
            SimpleNumbers[CountSimpleNumbers]=i;
            CountSimpleNumbers++;
        }
    }
    return SimpleNumbers;
}

//проверка, является ли значение целым числом
function NumberIsInteger(a) {
    if(Number.isInteger(a)){
        return true;
    }
    else{
        return false;
    }
}

//Распечатать цветной массив
function PrintColorArray(NumbersArray) {

    for(let i=0; i<NumbersArray.length; i++){
        switch (i%3) {
            case 0: console.log(colors.green(NumbersArray[i])); break;
            case 1: console.log(colors.yellow(NumbersArray[i])); break;
            case 2: console.log(colors.red(NumbersArray[i])); break;
        }
    }
}

//запуск программы
function run(startNumber,endNumber) {

    if(NumberIsInteger(startNumber) && NumberIsInteger(endNumber) ){
        let SimpleNumbers = FindSimpleNumbers(startNumber,endNumber);
        if(SimpleNumbers.length==0){
            console.log(colors.red("Простых чисел между " + startNumber + " и " +  endNumber + " нет."));
        }else{
            console.log("Простые числа между " + startNumber + " и " +  endNumber + ":");
            PrintColorArray(SimpleNumbers);
        }

    }
    else{
        console.log(colors.red("Ошибка: Одно из введенных Вами значения не является целым числом!"));
    }
}


//считываем данные из введенных при запуске программы
let startNumber = Number(process.argv[2]);
let endNumber = Number(process.argv[3]);

//запуск программы
run(startNumber,endNumber);


