module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern: 'compiled/src/lang.js', included: false},
      {pattern: 'compiled/src/lang.en.js', included: false},
      {pattern: 'compiled/src/lang.fi.js', included: false},
      {pattern: 'compiled/src/lang.nl.js', included: false},
      {pattern: 'compiled/src/lang.ru.js', included: false},
      {pattern: 'compiled/src/grammar.js', included: false},
      {pattern: 'compiled/src/util.js', included: false},
      {pattern: 'compiled/spec/util.js', included: false},
      {pattern: 'compiled/spec/wordtree.spec.js', included: false},
      {pattern: 'compiled/spec/ru.actions.spec.js', included: false},
      {pattern: 'compiled/spec/en.actions.spec.js', included: false},
      {pattern: 'compiled/spec/fi.actions.spec.js', included: false},
      {pattern: 'compiled/spec/util.spec.js', included: false},
      'compiled/spec/main.js'
    ],
    exclude: [
    ],
    reporters: ['spec'],
    colors: true,
    logLevel: config.LOG_INFO,
    //browsers: ['Firefox'],
    browsers: ['PhantomJS'],
    captureTimeout: 20000,
    //singleRun: false,
    singleRun: true,
    reportSlowerThan: 500,
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-requirejs',
      'karma-spec-reporter'
    ]
  });
};