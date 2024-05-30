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

const monthsEng = [
    { value: 'January', index: 0},
    { value: 'February', index: 1},
    { value: 'March', index: 2},
    { value: 'April', index: 3},
    { value: 'May', index: 4},
    { value: 'June', index: 5},
    { value: 'July', index: 6},
    { value: 'August', index: 7},
    { value: 'September', index: 8},
    { value: 'October', index: 9},
    { value: 'November', index: 10},
    { value: 'December', index: 11},
];

 const daysOfWeek = [
    { value: 'Воскресенье', short: 'ВС'},
    { value: 'Понедельник', short: 'ПН'},
    { value: 'Вторник', short: 'ВТ'},
    { value: 'Среда', short: 'СР'},
    { value: 'Четверг', short: 'ЧТ'},
    { value: 'Пятница', short: 'ПТ'},
    { value: 'Суббота', short: 'СБ'},
];

const daysOfWeekEng = [
    { value: 'Sunday', short: 'Sun' },
    { value: 'Monday', short: 'Mon' },
    { value: 'Tuesday', short: 'Tue' },
    { value: 'Wednesday', short: 'Wed' },
    { value: 'Thursday', short: 'Thu' },
    { value: 'Friday', short: 'Fri' },
    { value: 'Saturday', short: 'Sat' },
];

export {
    day, 
    getCurrentMonth,
    months,
    daysOfWeek,
    daysOfWeekEng,
    monthsEng
};