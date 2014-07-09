module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    closureDepsWriter: {
  options: {
    closureLibraryPath: '/usr/local/google-closure/closure-library',
    depswriter: '/usr/local/google-closure/closure-library/closure/bin/build/depswriter.py',
    root: ['app/js/app'],
  },
  def: {
    dest: 'app/js/app/deps.js'
  }
},
    closureCompiler: {
      options: {
        compilerFile: '/usr/local/google-closure/compiler.jar'
      },
      src: 'app/js/app/main.js',
      dest: 'dist/js/app.js',
      adv: {
        src: 'app/js/app/main.js',
        dest: 'dist/js/app.js',
        options: {
          compilerOpts: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
          }
        }
      },
      white: {
        src: 'app/js/app/main.js',
        dest: 'dist/js/app.js',
         options: {
          compilerOpts: {
            compilation_level: 'WHITESPACE_ONLY'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-closure-tools');

  grunt.registerTask('default', ['closureCompiler:white']);
  grunt.registerTask('comp', ['closureCompiler:adv']);
  grunt.registerTask('deps', ['closureDepsWriter']);
};

