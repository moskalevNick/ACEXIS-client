import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './assets/locales/en/translation.json';
import translationRussian from './assets/locales/ru/translation.json';

const resources = {
  en: {
    translation: translationEnglish,
    dir: 'en',
  },
  ru: {
    translation: translationRussian,
    dir: 'ru',
  },
};

const defaultLanguage = localStorage.getItem('i18nextLng') || 'en';

i18next.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
});

export default i18next;
