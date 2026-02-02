(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var lib = factory();
    root.getOnAppStoreBadge = lib.getOnAppStoreBadge;
    root.getOnGooglePlayBadge = lib.getOnGooglePlayBadge;
    root.StoreBadges = lib;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var BASE_URL = 'https://klgleb.github.io/StoreBadges';
  var DEFAULT_LANG = 'en';

  var AVAILABLE_LANGS = {
    apple: [
      'ar','az','bg','ca','cs','da','de','el','en','es','es-mx','et',
      'fi','fil','fr','fr-ca','he','he-il','hi','hr','hu','id','it',
      'ja','ko','lt','lv','ms','mt','nl','no','pl','pt-br','pt-pt',
      'ro','ru','sk','sl','sv','th','tr','uk','vi','zh-cn','zh-tw'
    ],
    google: [
      'af','ar','az','be','bg','bn','bs','ca','cs','da','de','el',
      'en','es','es-la','et','eu','fa','fi','fil','fr','fr-ca','ga',
      'gl','gu','he','hi','hr','hu','hy','id','is','it','ja','ka',
      'kk','km','kn','ko','ky','lo','lt','lv','mk','ml','mn','mr',
      'ms','my','ne','nl','no','pa','pl','pt-br','pt-pt','ro','ru',
      'si-lk','sk','sl','sq','sr','sv','sw','ta','te','th','tr','uk',
      'ur','uz','vi','zh-cn','zh-tw','zu'
    ]
  };

  function detectLang() {
    if (typeof navigator === 'undefined') return DEFAULT_LANG;
    var raw = navigator.language || navigator.userLanguage || DEFAULT_LANG;
    return raw.toLowerCase();
  }

  function detectTheme() {
    if (typeof window === 'undefined' || !window.matchMedia) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function resolveLang(store, lang) {
    var langs = AVAILABLE_LANGS[store];
    if (!langs) return DEFAULT_LANG;

    // Exact match
    if (langs.indexOf(lang) !== -1) return lang;

    // Try base language (e.g. "fr-fr" → "fr")
    var base = lang.split('-')[0];
    if (langs.indexOf(base) !== -1) return base;

    // Try finding any variant with same base
    for (var i = 0; i < langs.length; i++) {
      if (langs[i].split('-')[0] === base) return langs[i];
    }

    return DEFAULT_LANG;
  }

  function getOnAppStoreBadge(opts) {
    opts = opts || {};
    var lang = resolveLang('apple', (opts.lang || detectLang()).toLowerCase());
    var theme = opts.theme || detectTheme();
    return BASE_URL + '/apple_' + lang + '_' + theme + '.svg';
  }

  function getOnGooglePlayBadge(opts) {
    opts = opts || {};
    var lang = resolveLang('google', (opts.lang || detectLang()).toLowerCase());
    var theme = opts.theme || detectTheme();
    return BASE_URL + '/google_' + lang + '_' + theme + '.svg';
  }

  return {
    BASE_URL: BASE_URL,
    AVAILABLE_LANGS: AVAILABLE_LANGS,
    DEFAULT_LANG: DEFAULT_LANG,
    detectLang: detectLang,
    detectTheme: detectTheme,
    resolveLang: resolveLang,
    getOnAppStoreBadge: getOnAppStoreBadge,
    getOnGooglePlayBadge: getOnGooglePlayBadge
  };
});
