module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern: 'compiled/lang.js', included: false},
      {pattern: 'compiled/lang.en.js', included: false},
      {pattern: 'compiled/lang.fi.js', included: false},
      {pattern: 'compiled/lang.nl.js', included: false},
      {pattern: 'compiled/lang.ru.js', included: false},
      {pattern: 'compiled/word.js', included: false},
      {pattern: 'spec/wordtree.spec.js', included: false},
      'spec/main.js'
    ],
    exclude: [
    ],
    reporters: ['progress'],
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
      'karma-requirejs'
    ]
  });
};