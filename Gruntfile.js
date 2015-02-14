'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    sass: {
      dist: {
	options: {
	  includePaths: require('node-bourbon').includePaths,
	  outputStyle: 'compressed'
	},
	files: {
	  'dist/app.min.css': './src/*.scss'
	}
      }
    },

    browserify: {
      options: {
	watch: true,
	transform: [
	  '6to5ify',
	  'debowerify',
	  'reactify'
	]
      },
      dist: {
	files: {
	  'dist/app.js': 'src/app.js'
	}
      }
    },

    watch: {
      all: {
	files: 'src/*',
	tasks: ['build']
      }
    }

  });

  grunt.registerTask('build', [
    'sass',
    'browserify',
  ]);

  grunt.registerTask('default', [
    'build',
    'watch'
  ]);

};