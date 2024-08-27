import { Option, iLanguage } from "../types";
import i18next from "i18next";

const sex = ['Женский', 'Мужской', 'Мальчик', 'Девочка'];

const generateEvenNumbersOfSize = (): Option[] => { // генерируем только четные числа от 6 до 30 размера катетора
    const evenNumbers: Option[] = [];
    for (let i = 6; i <= 30; i += 2) {
      evenNumbers.push({ title: i.toString(), value: i.toString() });
    }
    return evenNumbers;
};

export const dateFormat = 'yyyy-MM-dd HH:mm:ss';

const filters = [
  {
    id: 'all',
    title: i18next.t("journalScreen.filters.all"),
    keyWord: 'timeStamp'
  },
  {
    id: 'catheterization',
    title: i18next.t("journalScreen.filters.catheterizations"),
    keyWord: i18next.t("nelaton")
  },
  {
    id: 'urine_output',
    title: i18next.t("journalScreen.filters.urine_output"),
    keyWord: 'amountOfReleasedUrine'
  },
  {
    id: 'fluid_intake',
    title: i18next.t("journalScreen.filters.fluid_intake"),
    keyWord: 'amountOfDrankFluids'
  },
  {
    id: 'urine_leakage',
    title: i18next.t("journalScreen.filters.urine_leakage"),
    keyWord: 'leakageReason'
  },
]

const languages: iLanguage[] = [
  {
    id: 'rus',
    title: 'Русский',
    selected: false,
    icon: 'https://catamphetamine.gitlab.io/country-flag-icons/3x2/RU.svg'
  },
  {
    id: 'eng',
    title: 'English',
    selected: false,
    icon: 'https://catamphetamine.gitlab.io/country-flag-icons/3x2/US.svg'
  },
  {
    id: 'deu',
    title: 'Deutsch',
    selected: false,
    icon: 'https://catamphetamine.gitlab.io/country-flag-icons/3x2/DE.svg'
  },
  {
    id: 'Français',
    title: 'Français',
    selected: false,
    icon: 'https://catamphetamine.gitlab.io/country-flag-icons/3x2/FR.svg'
  },
  {
    id: 'Italiano',
    title: 'Italiano',
    selected: false,
    icon: 'https://catamphetamine.gitlab.io/country-flag-icons/3x2/IT.svg'
  },
];

export {
    sex, generateEvenNumbersOfSize, filters, languages
};