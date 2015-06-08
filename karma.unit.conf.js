module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern: 'src/wordtree.js', included: false},
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