requirejs.config({
  baseUrl: '/base',
  paths: {
    'word': '/base/compiled/word',
    'lang': '/base/compiled/lang',
    'lang.en': '/base/compiled/lang.en',
    'lang.fi': '/base/compiled/lang.fi',
    'lang.nl': '/base/compiled/lang.nl',
    'lang.ru': '/base/compiled/lang.ru'
  },
  deps: [
    '/base/spec/wordtree.spec.js'
  ],
  callback: window.__karma__.start
});