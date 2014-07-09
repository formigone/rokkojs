module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    closureDepsWriter: {
  options: {
    closureLibraryPath: '/usr/local/google-closure/closure-library',
    depswriter: '/usr/local/google-closure/closure-library/closure/bin/build/depswriter.py',
    root: ['src'],
  },
  def: {
    dest: 'src/deps.js'
  }
},
    closureCompiler: {
      options: {
        compilerFile: '/usr/local/google-closure/compiler.jar'
      },
      adv: {
        src: 'in.js',
        dest: 'out.js',
        options: {
          compilerOpts: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
          }
        }
      },
      white: {
        src: 'in.js',
        dest: 'out.js',
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

