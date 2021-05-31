const events = require('events');

// создаем экземпляр Event Emitter-а
const ee = new events.EventEmitter();

//Преобразовать строку формата час-день-месяц-год в дату
function stringToDate(stringDate)
{
    //формат даты час-день-месяц-год
    let arrayDate = stringDate.split("-");
    const correctDate = new Date(
        arrayDate[3], //stringDate[3] - год
        arrayDate[2]-1, //stringDate[2] - месяц
        arrayDate[1], //stringDate[1] - день
        arrayDate[0] //stringDate[0] - час
    );
    return correctDate;
}

//Получить введенные даты при запуске программы
function getEnteredDates() {
    return process.argv
    //Обрезаем первые два элемента массива process.argv. Третий аргумент - первая дата. Четвертый - вторая дата и т.д.
        .slice(2)
        //каждый элемент массива преобразуем в дату
        .map((arg) => stringToDate(arg));
}

//Получить оставшееся время в секундах
function getRemainingTimeInSec(remainigDate) {
    let curretDate = new Date();
    return parseInt((remainigDate-curretDate)/1000);
}

//Проверка, осталось ли время до заданной даты
function isRemainingTime(remainigDate) {
    let curretDate = new Date();
    return curretDate < remainigDate;
}

//Вывести на экран
function printEndOfTime(remainigDate) {
    setInterval( () => {
            console.clear();
            console.log("Таймеры:");

            for(let i = 0; i<remainigDate.length; i++){
                if( isRemainingTime(remainigDate[i]) ){
                    console.log(`Таймер ${i+1}: осталось: `,getRemainingTimeInSec(remainigDate[i]), ' сек.');
                    continue;
                }
                console.log(`Таймер ${i+1} завершил свою работу!`);
            }
        },1000
    );
}

function run(){
    //обрабатываем событие remaining_time
    ee.on(`remaining_time`, printEndOfTime);

    const enteredDates = getEnteredDates();

    ee.emit(`remaining_time`, enteredDates);
}

run();