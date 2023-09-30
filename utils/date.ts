const day = new Date();
const getCurrentMonth = day.getMonth(); // сегоднящний месяц

 const months = [
    { value: 'Январь'},
    { value: 'Февраль'},
    { value: 'Март'},
    { value: 'Апрель'},
    { value: 'Май'},
    { value: 'Июнь'},
    { value: 'Июль'},
    { value: 'Август'},
    { value: 'Сентябрь'},
    { value: 'Октябрь'},
    { value: 'Ноябрь'},
    { value: 'Декабрь'},
];

 const daysOfWeek = [
    { value: 'Воскресенье', short: 'ВС'},
    { value: 'Понедельник', short: 'ПН'},
    { value: 'Вторник', short: 'ВТ'},
    { value: 'Среда', short: 'СР'},
    { value: 'Четверг', short: 'ЧТ'},
    { value: 'Пятница', short: 'ПТ'},
    { value: 'Суббота', short: 'СБ'},
]

export {
    day, 
    getCurrentMonth,
    months,
    daysOfWeek
};