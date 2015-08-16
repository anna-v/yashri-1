module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    lintspaces: {
      all: {
        src: [
          '*.html',
          'source/less/**/*.less',
          '*.js',
          'source/js/**/*.js'
        ],
        options: {
          newline: true,
          newlineMaximum: 2,
          trailingspaces: true,
          indentationGuess: false,
          editorconfig: '.editorconfig',
          ignores: [
            'html-comments',
            'js-comments'
          ],
          showTypes: true,
          showCodes: true
        }
      }
    },

    less: {
      style: {
        files: {
          'build/css/style.css': ['source/less/style.less']
        }
      }
    },

    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      style: {
        files: ['source/less/**/*.less'],
        tasks: ['less', 'postcss']
      },
      html: {
        files: ['*.html'],
      },
      js: {
        files: ['source/js/*.js'],
        tasks: ['copy'],
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({ browsers: 'last 2 versions' })
        ]
      },
      dist: { src: 'build/css/style.css' }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'source/img/',
            src: ['**'],
            dest: 'build/img/'
          },

          {
            expand: true,
            cwd: 'source/js/',
            src: ['**'],
            dest: 'build/js/'
          },
        ],
      },
    }

  });

  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('lint', ['lintspaces']);
  grunt.registerTask('build:development', [ 'less', 'postcss', 'copy' ]);
  grunt.registerTask('build', [ 'build:development' ]);
  grunt.registerTask('default', [ 'build:development', 'watch' ]);
  grunt.registerTask('build:production', [ 'less', 'postcss', 'copy' ]);
};
