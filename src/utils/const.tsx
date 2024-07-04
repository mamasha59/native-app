import { Option } from "../types";

const sex = ['Женский', 'Мужской', 'Мальчик', 'Девочка'];

const whyLeakageHappenedReasons:Option[] = [
    {title: 'В Состоянии покоя', value: 'calm'}, {title: 'Кашель', value: 'caught'}, {title: 'Физическая активность', value: 'physical activity'}
  ];

const generateEvenNumbersOfSize = (): Option[] => { // генерируем только четные числа от 6 до 30 размера катетора
    const evenNumbers: Option[] = [];
    for (let i = 6; i <= 30; i += 2) {
      evenNumbers.push({ title: i.toString(), value: i.toString() });
    }
    return evenNumbers;
};

export const dateFormat = 'yyyy-MM-dd HH:mm:ss';

const filters = [
    {
        id: 'Vse',
        title: 'all',
        keyWord: 'timeStamp'
      },
      {
        id: 'catheterization ',
        title: 'catheterizations',
        keyWord: 'Нелатон'
      },
      {
        id: 'fluid discharged',
        title: 'fluid discharged',
        keyWord: 'amountOfReleasedUrine'
      },
      {
        id: 'drinking fluids',
        title: 'drinking fluids',
        keyWord: 'amountOfDrankFluids'
      },
      {
        id: 'leakage',
        title: 'leakage',
        keyWord: 'leakageReason'
      },
]

export {
    sex, generateEvenNumbersOfSize, whyLeakageHappenedReasons, filters
};