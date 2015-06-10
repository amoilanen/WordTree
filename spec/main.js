requirejs.config({
  baseUrl: '/base',
  paths: {
    'word': '/base/src/word',
    'lang': '/base/src/lang',
    'lang.en': '/base/src/lang.en',
    'lang.fi': '/base/src/lang.fi',
    'lang.nl': '/base/src/lang.nl',
    'lang.ru': '/base/src/lang.ru'
  },
  deps: [
    '/base/spec/wordtree.spec.js'
  ],
  callback: window.__karma__.start
});