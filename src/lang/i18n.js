import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import eng from './eng.json';
import deu from './deu.json';
import rus from './rus.json';

const resources = {
    eng: eng,
    deu: deu,
    rus: rus,
}

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: 'eng',
    });

export default {i18n};