const sex = ['Женский', 'Мужской', 'Мальчик', 'Девочка'];
const catheters = ['Нелатон', 'Фоллея'];

const whyLeakageHappenedReasons = [
    'В Состоянии покоя', 'Кашель', 'Физическая активность'
  ]

const generateEvenNumbersOfSize = () => { // генерируем только четные числа от 6 до 30 размера катетора
    const evenNumbers = [];
    for (let i = 6; i <= 30; i +=2) {
        evenNumbers.push(i)            
    }
    return evenNumbers;
}

export {
    sex, catheters, generateEvenNumbersOfSize, whyLeakageHappenedReasons
};