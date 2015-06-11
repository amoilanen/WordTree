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
        sourceMap: true
      },
      dist: {
        files: {
          'compiled/word.js': 'src/word.js',
          'compiled/lang.js': 'src/lang.js',
          'compiled/lang.en.js': 'src/lang.en.js',
          'compiled/lang.fi.js': 'src/lang.fi.js',
          'compiled/lang.nl.js': 'src/lang.nl.js',
          'compiled/lang.ru.js': 'src/lang.ru.js'
        }
      }
    }
  });

  grunt.registerTask('test', ['compile', 'karma:unit']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('compile', ['babel']);
  grunt.registerTask('default', ['jshint', 'test']);
};