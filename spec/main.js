requirejs.config({
  baseUrl: '/base',
  paths: {
    'wordtree': '/base/src/wordtree'
  },
  deps: [
    '/base/spec/wordtree.spec.js'
  ],
  callback: window.__karma__.start
});