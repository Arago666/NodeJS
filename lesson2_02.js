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
    const programmDate = [];
    //Начинаем считывать с третьего аргумента process.argv. Третий аргумент - первая дата. Четвертый - вторая дата и т.д.
    let i = 2;
    while(process.argv[i]){
        programmDate.push(stringToDate(process.argv[i]));
        i++;
    }
    return programmDate;
}

//Вывести на экран
function printEndOfTime(remainigDate) {
    let curretDate = new Date();
    console.clear();
    console.log("Время до апокалипсиса.");

    for(let i = 0; i<remainigDate.length; i++){
        if(curretDate<remainigDate[i]){
            console.log(`Прогноз ${i+1}: осталось: `,parseInt((remainigDate[i]-curretDate)/1000), ' сек.');
            continue;
        }
        console.log("Конец света свершился!");
    }
}

function run(){
    const EnteredDates = getEnteredDates();

    //отправляем события с датами каждую секунду
    setInterval( () => {
            ee.emit(`remaining_time`, EnteredDates);
        },1000
    );

    //обрабатываем событие remaining_time
    ee.on(`remaining_time`, printEndOfTime);
}

run();