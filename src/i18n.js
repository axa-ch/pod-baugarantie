import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import deTxt from './assets/i18n/de.json';
import enTxt from './assets/i18n/en.json';
// import frTxt from './assets/i18n/fr.json';
// import itTxt from './assets/i18n/it.json';

// define language constants
export const LANG_DE = 'de';
export const LANG_FR = 'fr';
export const LANG_IT = 'it';
export const LANG_EN = 'en';

export const LANGUAGES = [LANG_DE, LANG_FR, LANG_IT, LANG_EN]

export const initTranslations = (lang) => {
  const lng = lang;

  i18n.use(initReactI18next).init({
    resources: {
      [LANG_DE]: {
        translation: deTxt,
      },
      [LANG_EN]: {
        translation: enTxt,
      },
      // [LANG_FR]: {
      //   translation: frTxt,
      // },
      // [LANG_IT]: {
      //   translation: itTxt,
      // },
    },
    lng,
    fallbackLng: LANG_DE,
    // react i18next special options (optional)
    react: {
      wait: true,
    },
  });

  return i18n;
};

export default i18n;
