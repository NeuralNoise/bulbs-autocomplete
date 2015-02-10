'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var path = require('path');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    constants: {
      // configurable paths
      app: require('./bower.json').appPath || 'src',
      dist: 'dist'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= constants.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['example/example.html'],
        devDependencies: true,
      }
    },



    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      example: {
        options: {
          port: 9001,
          hostname: 'localhost',
          middleware: function (connect) {
            return [
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static('./example'),
              connect().use(
                '/src',
                connect.static('./src')
              ),
              connect().use(
                '/dist',
                connect.static('./dist')
              )
            ];
          }
        }
      }
    },
    injector: {
      localDependencies: {
        files: {
          'example/example.html': [
            'src/**/*.js',
            '!**/*.spec.js'
          ],
        },
        options: {
          addRootSlash: true,
          transform: function (filepath) {
            var e = path.extname(filepath).slice(1);
            if (e === 'css') {
              return '<link rel="stylesheet" href="' + filepath + '">';
            } else if (e === 'js') {
              return '<script src="' + filepath + '"></script>';
            } else if (e === 'html') {
              return '<link rel="import" href="' + filepath + '">';
            }
          }
        }
      },
      dist: {
        files: {
          'example/example.html': [
            'dist/bulbs-autocomplete.js',
            'dist/bulbs-autocomplete-templates.js'
          ],
        },
        options: {
          addRootSlash: true,
          transform: function (filepath) {
            var e = path.extname(filepath).slice(1);
            if (e === 'css') {
              return '<link rel="stylesheet" href="' + filepath + '">';
            } else if (e === 'js') {
              return '<script src="' + filepath + '"></script>';
            } else if (e === 'html') {
              return '<link rel="import" href="' + filepath + '">';
            }
          }
        }
      }
    },

    concat: {
      options: {
        separator: grunt.util.linefeed,
        souceMap: true
      },
      dist: {
        src: [
          'src/**/*.js',
          '!src/**/*.spec.js'
        ],
        dest: 'dist/bulbs-autocomplete.js'
      }
    },

    ngtemplates: {
      BulbsAutocomplete: {
        src: ['src/**/*.html'],
        dest: 'dist/bulbs-autocomplete-templates.js',
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true
        }
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
      },
      ci: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
  });

  grunt.registerTask('lint', [
    'jshint:all'
  ]);

  grunt.registerTask('test', [
    'karma',
  ]);

  grunt.registerTask('build', [
    'concat',
    'ngtemplates:BulbsAutocomplete'
  ]);

  grunt.registerTask('run-dist', [
    'injector:dist',
    'wiredep:app',
    'connect:example:keepalive'
  ]);

  grunt.registerTask('run-example', [
    'injector:localDependencies',
    'wiredep:app',
    'connect:example:keepalive'
  ]);


  grunt.registerTask('default', [
    'newer:jshint',
    'test',
  ]);
};
