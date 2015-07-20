module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'src/*.js',
        'spec/*.spec.js'
      ],
      options: {
        multistr: true,
        node: true,
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        esnext: true
      }
    },
    karma: {
      unit: {
        configFile: 'karma.unit.conf.js'
      }
    },
    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'compiled/src/grammar.js': 'src/grammar.js',
          'compiled/src/lang.js': 'src/lang.js',
          'compiled/src/lang.en.js': 'src/lang.en.js',
          'compiled/src/lang.fi.js': 'src/lang.fi.js',
          'compiled/src/lang.nl.js': 'src/lang.nl.js',
          'compiled/src/lang.ru.js': 'src/lang.ru.js',
          'compiled/src/util.js': 'src/util.js',
          'compiled/spec/main.js': 'spec/main.js',
          'compiled/spec/wordtree.spec.js': 'spec/wordtree.spec.js',
          'compiled/spec/ru.actions.spec.js': 'spec/ru.actions.spec.js',
          'compiled/spec/en.actions.spec.js': 'spec/en.actions.spec.js',
          'compiled/spec/util.spec.js': 'spec/util.spec.js',
          'compiled/spec/util.js': 'spec/util.js'
        }
      }
    }
  });

  grunt.registerTask('test', ['compile', 'karma:unit']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('compile', ['babel']);
  grunt.registerTask('default', ['jshint', 'test']);
};