requirejs.config({
  baseUrl: '/base',
  paths: {
    'word': '/base/compiled/src/word',
    'lang': '/base/compiled/src/lang',
    'lang.en': '/base/compiled/src/lang.en',
    'lang.fi': '/base/compiled/src/lang.fi',
    'lang.nl': '/base/compiled/src/lang.nl',
    'lang.ru': '/base/compiled/src/lang.ru'
  },
  deps: [
    '/base/compiled/spec/wordtree.spec.js'
  ],
  callback: window.__karma__.start
});