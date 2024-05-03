import { iUser } from "../types";

 const initialState:iUser = { // пробелы для удобства, экраны по порядку
    weight: '0',
    height: '0',
    sex: '',
    age: '0',
    //
    volume: '0',
    catheterType: 'Нелатон',
    catheterSize: '',
    //
    useAtNight: 'Выбрать',
    urineMeasure: 'Выбрать',
    //
    nameSurname: '',
    birthday: '',
}

export default initialState;