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

type iMonth = {
    month:string,
    index: number
  }

interface iDay {
    dayNumber: number;
    weekNumber: number;
    month: iMonth;
    year: number;
}
    
export {iLanguage, iUser, iDay, iMonth};