interface iLanguage {
    id: string,
    title: string,
    selected:boolean,
    icon: string,
}

interface iUnits {
    title: string,
    id: string,
}

interface iUrineColor {
    title: string,
    color: string
}

interface iTimePicker {
    selectedIndexHour: number,
    selectedIndexMinutes: number,
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
    amountOfDrankFluids: {
        value: string,
        drinkName?: string
    },
    amountOfReleasedUrine: string,
    urineColor?: {
        color: string,
        title: string
    },
    leakageReason?: {
        reason: string,
        value: string,
    },
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
    urineDiary: iDairyRecord[],
    urineChart: iChart[],
    drankWaterChart: iChart[],
    modalCustomizePdfDocument: boolean,
    checkBoxAddSurveyInPdf: boolean,
    urineColor?: iUrineColor,
}

interface Option {
    title: string,
    value: boolean | string
}

interface iSurveyInputs {
    difficulties?: string,
    additional?: string
}
    
export {
    iUnits,
    iLanguage,
    iUser,
    iDay,
    iMonth,
    iDairyRecord,
    SelectedDairyRecord,
    iChart, 
    iJournal,
    Option,
    iStatisticsPerDay,
    iTimePicker,
    iSurveyInputs,
    iUrineColor
};