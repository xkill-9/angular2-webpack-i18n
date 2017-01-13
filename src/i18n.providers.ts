import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

declare var require: any;
// Given that we're gonna be loading the translation file dynamically, we have to setup some context for webpack's require.
const locales = require.context('./locale', false, /^\.\/.*\.xlf$/);

export function getTranslationProviders() {
  // Get the locale id from the global
  const locale = document['locale'];
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];
  // No locale or spanish: no translation providers
  if (!locale || locale === 'es') {
    return Promise.resolve(noProviders);
  }
  // Ex: 'locale/messages.es.xlf`
  const translationFile = `./messages.${locale}.xlf`;
  return getTranslationsWithWebpack(translationFile)
    .then( (translations: string ) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}

function getTranslationsWithWebpack(file: string) {
  let translation;
  try {
    translation = locales(file);
  } catch(e) { console.warn('Translation not found for the preferred language'); }
  return new Promise((resolve, reject) => {
    !!translation ? resolve(translation) : reject();
  });
}
