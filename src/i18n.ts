import i18next from "i18next";

import { initReactI18next } from "react-i18next";

import translationRU from "./locales/ru/translation.json";
import translationUZ from "./locales/uz/translation.json";
import translationKR from "./locales/kr/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  ru: { translation: translationRU },
  uz: { translation: translationUZ },
  qr: { translation: translationKR },
  en: { translation: translationEN },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
