requirejs.config({
  baseUrl: '/base',
  paths: {
    'grammar': '/base/compiled/src/grammar',
    'lang': '/base/compiled/src/lang',
    'lang.en': '/base/compiled/src/lang.en',
    'lang.fi': '/base/compiled/src/lang.fi',
    'lang.nl': '/base/compiled/src/lang.nl',
    'lang.ru': '/base/compiled/src/lang.ru'
  },
  deps: [
    '/base/compiled/spec/wordtree.spec.js',
    '/base/compiled/spec/ru.actions.spec.js',
    '/base/compiled/spec/en.actions.spec.js'
  ],
  callback: window.__karma__.start
});