const day = new Date();
const getCurrentMonth = day.getMonth(); // сегоднящний месяц

 const months = [
    { value: 'Январь', index: 0},
    { value: 'Февраль', index: 1},
    { value: 'Март', index: 2},
    { value: 'Апрель', index: 3},
    { value: 'Май', index: 4},
    { value: 'Июнь', index: 5},
    { value: 'Июль', index: 6},
    { value: 'Август', index: 7},
    { value: 'Сентябрь', index: 8},
    { value: 'Октябрь', index: 9},
    { value: 'Ноябрь', index: 10},
    { value: 'Декабрь', index: 11},
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