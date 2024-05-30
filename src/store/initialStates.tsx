import { iUser } from "../types";

 const initialState:iUser = { // пробелы для удобства, экраны по порядку
    weight: '',
    height: '',
    sex: '',
    age: '',
    //
    volume: '',
    catheterType: 'Нелатон',
    catheterSize: '',
    //
    // useAtNight: 'Да',
    //
    name: '',
    surname: '',
    birthday: '',
    additionalInfo: '',
    catheterInfo: '',
}

export default initialState;