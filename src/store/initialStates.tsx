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
    interval: '0',
    useAtNight: '',
    urineMeasure: '0',
    //
    nameSurname: '',
    birthday: '',
}

export default initialState;