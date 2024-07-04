interface iLanguage{
    id: string,
    title: string,
    chosed:boolean,
    icon?: string,
}

interface iUser {
    weight: string | null,
    height: string | null,
    sex: string,
    age: string | null,
    catheterSize: string | null,
    catheterType: string | null,
    volume: string | null,
    name?: string | null,
    surname?: string | null,
    birthday?: string | null,
    additionalInfo?: string,
    catheterInfo?: string,
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
    index?: number,
}

interface iDairyRecord {
    id: string,
    whenWasCanulisation: string,
    catheterType?: string,
    amountOfDrankFluids?: number,
    amountOfReleasedUrine?: number | null,
    leakageReason?: string,
    timeStamp: string,
}

type SelectedDairyRecord = Pick<iDairyRecord, 'catheterType' | 'amountOfDrankFluids' | 'amountOfReleasedUrine' | 'leakageReason'>;

interface iChart { // день в графике
    timestamp: string,
    value: number,
}

interface iStatisticsPerDay{
    cannulation?: number;
        leakage?: number;
        amountOfDrankFluids?: number;
        amountOfReleasedUrine?: number;
}

interface iJournal {
    initialCathetherAmount: {
        nelaton: number ;
    },
    urineDiary: iDairyRecord[],
    urineChart: iChart[],
    drankWaterChart: iChart[],
    filtredRecordByDate: iDairyRecord[],
    statisticsPerDay: iStatisticsPerDay,
    modalCustomizePdfDocument: boolean,
    checkBoxAddSurveyInPdf: boolean,
}

interface Option {
    title: string,
    value: boolean | string
}
    
export {iLanguage, iUser, iDay, iMonth, iDairyRecord, SelectedDairyRecord, iChart, iJournal, Option, iStatisticsPerDay};