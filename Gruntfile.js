module.exports = function(grunt) {

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
        eqnull: true
      }
    },
    karma: {
      unit: {
        configFile: 'karma.unit.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['jshint', 'test']);
};