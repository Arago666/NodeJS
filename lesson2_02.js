const events = require('events');

// создаем экземпляр Event Emitter-а
const ee = new events.EventEmitter();

const STATUSES = {
    ACTIVE: 'active',
    FINISHED: 'finished'
};


class Timer {
    constructor(date) {
        this.date = date;
        this.status = this.setStatus(date);

    }

    //установить статус в зависимости от даты
    setStatus(date) {
        const curretDate = new Date();

        if (curretDate < date) {
            return STATUSES['ACTIVE'];
        }
        return STATUSES['FINISHED'];
    }
    //Завершить работу таймера
    changeStatusToFinished() {
        this.status = STATUSES['FINISHED'];
    }

    //проверка, идет ли таймер
    isStatusActive(){
        return this.status == STATUSES['ACTIVE'];
    }

    //Получить оставшееся время в секундах
    getRemainingTime() {
        const curretDate = new Date();
        return this.date-curretDate;
    }
}

//Преобразовать строку формата час-день-месяц-год в дату
function stringToDate(stringDate)
{
    //формат даты час-день-месяц-год
    const arrayDate = stringDate.split("-");
    const correctDate = new Date(
        // arrayDate[3], //stringDate[3] - год
        // arrayDate[2]-1, //stringDate[2] - месяц
        // arrayDate[1], //stringDate[1] - день
        // arrayDate[0] //stringDate[0] - час

        arrayDate[4], //stringDate[3] - год
        arrayDate[3]-1, //stringDate[2] - месяц
        arrayDate[2], //stringDate[1] - день
        arrayDate[1], //stringDate[0] - час
        arrayDate[0] //stringDate[0] - минута
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

//Вывести на экран
function printEndOfTime(timer) {
    setInterval( () => {
            console.clear();
            console.log("Таймеры:");

            for(let i = 0; i<timer.length; i++){
                if( timer[i].isStatusActive() ){
                    console.log(`Таймер ${i+1}: осталось: `,parseInt(timer[i].getRemainingTime()/1000), ' сек.');
                    continue;
                }
                console.log(`Таймер ${i+1} завершил свою работу!`);
            }
        },1000
    );
}

function run(){
    //обрабатываем событие start_timer
    ee.on(`start_timer`, printEndOfTime);

    //обрабатываем событие завершения работы таймера - меняем статус
    ee.on("stop_timer", (params)=>{
        params.changeStatusToFinished();
    });

    //Получаем введенные даты
    const enteredDates = getEnteredDates();

    const timer = [];
    for(let i = 0; i<enteredDates.length; i++){
        //создаем объекты таймеров
        timer[i] = new Timer(enteredDates[i]);

        //если таймер не завершен - устанавливаем событие на звершения таймера, когда выйдет время
        if( timer[i].isStatusActive() ){
            setTimeout( () => {
                ee.emit(`stop_timer`, timer[i]);
            }, timer[i].getRemainingTime());
        }
    }

    //запускаем таймер с датами
    ee.emit(`start_timer`, timer);
}

run();