interface iLanguage{
    id: string;
    title: string;
    chosed:boolean;
}

interface iUser {
    weight: number | null,
    height: number | null,
    sex: string | null,
    age: number | null,
    catetorSize: number | null,
    catetorType: string | null,
    volume: number | null,
    amount: number | null,
    interval: number | null,
    urineMeasure: number | null,
    useAtNight: string | null,
    // email: string | null,
    // nameSurname: string | null,
    // phoneNumber: string | null,
}
    
export {iLanguage, iUser};