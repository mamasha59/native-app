interface iLanguage{
    id: string;
    title: string;
    chosed:boolean;
}

interface iUser {
    weight: string | null,
    height: string | null,
    sex: string,
    age: string | null,
    catheterSize: string | null,
    catheterType: string | null,
    volume: string | null,
    interval: string | null,
    urineMeasure: string | null,
    useAtNight: string | null,
    // email: string | null,
    // nameSurname: string | null,
    // phoneNumber: string | null,
    nameSurname?: string | null,
    birthday?: string | null,
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