import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';
import zhTWTranslation from './locales/zh-TW/translation.json';
import zhCNTranslation from './locales/zh-CN/translation.json';
import frFRTranslation from './locales/fr/translation.json';
import deDETranslation from './locales/de/translation.json';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
      'zh-TW': { translation: zhTWTranslation },
      'zh-CN': { translation: zhCNTranslation },
      'fr-FR': { translation: frFRTranslation },
      'de-DE': { translation: deDETranslation },
    },
    fallbackLng: 'en', // Default language
    // lng: 'en', // Initial language
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;