requirejs.config({
  baseUrl: '/base',
  paths: {
    'grammar': '/base/compiled/src/grammar',
    'lang': '/base/compiled/src/lang',
    'util': '/base/compiled/src/util',
    'lang.en': '/base/compiled/src/lang.en',
    'lang.fi': '/base/compiled/src/lang.fi',
    'lang.nl': '/base/compiled/src/lang.nl',
    'lang.ru': '/base/compiled/src/lang.ru',
    'test.util': '/base/compiled/spec/util'
  },
  deps: [
    '/base/compiled/spec/wordtree.spec.js',
    '/base/compiled/spec/ru.actions.spec.js',
    '/base/compiled/spec/en.actions.spec.js',
    '/base/compiled/spec/fi.actions.spec.js',
    '/base/compiled/spec/util.spec.js'
  ],
  callback: window.__karma__.start
});