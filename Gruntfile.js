module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['example/app.js', 'example/models.js', 'src/mongoose-softdelete.js']
    },
    express: {
      dev: {
        options: {
          script: 'example/app.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['jshint', 'express:dev']);
};