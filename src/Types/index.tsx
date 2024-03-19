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
    id: string,
    dayNumber: number;
    weekNumber: number;
    month: iMonth;
    year: number;
}

interface iDairyRecord {
    id: string,
    whenWasCanulisation: string,
    catheterType?: string,
    amountOfDrankFluids?: number | null,
    amountOfReleasedUrine?: number | null,
    leakageReason?: string,
    timeStamp?: string,
}

type SelectedDairyRecord = Pick<iDairyRecord, 'catheterType' | 'amountOfDrankFluids' | 'amountOfReleasedUrine' | 'leakageReason'>;

interface iChart { // день в графике
    timestamp: string,
    value: number,
}
    
export {iLanguage, iUser, iDay, iMonth, iDairyRecord, SelectedDairyRecord, iChart};