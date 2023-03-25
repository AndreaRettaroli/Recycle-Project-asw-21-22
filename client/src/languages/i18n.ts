import i18next from "i18next";
import englishTranslation from "./en/translations.json";
import italianTranslation from "./it/translations.json";
import { initReactI18next } from "react-i18next";



export const defaultNS = englishTranslation;
export const resources = {
  en: {
    translation: englishTranslation,
  },
  it: {
    translation: italianTranslation
  }
} as const;

i18next.use(initReactI18next).init({
  lng: "it",
  resources,
});

export default i18next