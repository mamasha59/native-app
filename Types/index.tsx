interface iLanguage{
    id: string;
    title: string;
    chosed:boolean;
}

interface iUser {
    weight: number | null,
    height: number | null,
    sex: string,
    age: number | null,
    catheterSize: string | null,
    catheterType: string | null,
    volume: number | null,
    interval: number | null,
    urineMeasure: number | null,
    useAtNight: string | null,
    // email: string | null,
    // nameSurname: string | null,
    // phoneNumber: string | null,
    nameSurname?: string,
    birthday?: string,
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