// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // E-sends translation files from your public folder
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    supportedLngs: ['en', 'hi', 'ta'], // Add all supported languages here
    fallbackLng: 'en',
    debug: true, // Set to true to see logs in the console
    
    backend: {
      // Path to your translation files in the public folder
      loadPath: '/locales/{{lng}}/translation.json', 
    },

    react: {
      // Use Suspense to handle the async loading of translations
      useSuspense: true,
    },
  });

export default i18n;