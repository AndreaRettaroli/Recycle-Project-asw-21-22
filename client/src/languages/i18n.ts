import i18next from "i18next";
import englishTranslation from "./en/translations.json";
import italianTranslation from "./it/translations.json";
import { initReactI18next } from "react-i18next";
import { Languages } from "../types/Languages";



export const defaultNS = englishTranslation;
export const resources = {
  en: {
    translation: englishTranslation,
  },
  it: {
    translation: italianTranslation
  }
} as const;

const getLanguage = () => {
  return window.navigator.language.slice(0, 2)
}


export const changeLanguage = (lng: Languages) => {
  i18next.changeLanguage(lng);
}

i18next.use(initReactI18next).init({
  lng: getLanguage(),
  resources,
});

export default i18next