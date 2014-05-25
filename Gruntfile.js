module.exports = function(grunt) {
  grunt.initConfig({
    "copy" : {
      "libs" : {
        "files" : [
          {
            "expand" : true,
            "flatten" : true,
            "src"    : [
              "bower_components/requirejs/require.js",
              "bower_components/requirejs-text/text.js",
              "bower_components/jQuery/dist/jquery.min.js",
              "bower_components/jQuery/dist/jquery.min.map",
              "bower_components/backbone/backbone.js",
              "bower_components/underscore/underscore.js",
              "bower_components/growl/javascripts/jquery.growl.js",
              "bower_components/vex/js/vex.dialog.min.js",
              "bower_components/vex/js/vex.min.js"
            ],
            "dest"   : "public/scripts/libs/",
            "filter" : "isFile"
          },
          {
            "expand" : true,
            "flatten" : true,
            "src"    : [
              "bower_components/growl/stylesheets/jquery.growl.css",
              "bower_components/vex/css/vex-theme-flat-attack.css",
              "bower_components/vex/css/vex.css"
            ],
            "dest"   : "public/stylesheets/",
            "filter" : "isFile"
          }
        ]
      },
      "main" : {
        "files" : [
          {
            "expand"  : true,
            "flatten" : true,
            "src"     : ["frontend/scripts/*.js"],
            "dest"    : "public/scripts/",
            "filter"  : "isFile"
          },
          {
            "expand"  : true,
            "flatten" : true,
            "src"     : ["frontend/scripts/views/*.js"],
            "dest"    : "public/scripts/views/",
            "filter"  : "isFile"
          },
          {
            "expand"  : true,
            "flatten" : true,
            "src"     : ["frontend/scripts/models/*.js"],
            "dest"    : "public/scripts/models/",
            "filter"  : "isFile"
          },
          {
            "expand"  : true,
            "flatten" : true,
            "src"     : ["frontend/*.html"],
            "dest"    : "public/",
            "filter"  : "isFile"
          },
          {
            "expand"  : true,
            "flatten" : true,
            "src"     : ["frontend/images/*.gif", "frontend/images/*.png"],
            "dest"    : "public/images/",
            "filter"  : "isFile"
          },
          {
            "expand"  : true,
            "flatten" : true,
            "src"     : ["frontend/templates/*.tpl"],
            "dest"    : "public/templates/",
            "filter"  : "isFile"
          }
        ]
      }
    },

    'exec' : {
      'sass' : {
        'cmd' : [
          './node_modules/.bin/node-sass',
          '--include-path ./node_modules/node-bourbon/assets/stylesheets/',
          '--include-path ./bower_components/vex/css/',
          '--include-path ./bower_components/growl/stylesheets/',
          '--output-style compressed',
          './frontend/stylesheets/style.scss',
          './public/stylesheets/style.css'
        ].join(' ')
      }
    },

    'curl' : {
      './public/scripts/libs/analytics.js' : 'http://www.google-analytics.com/analytics.js'
    },

    'requirejs' : {
      'compile' : {
        'options' : {
          'baseUrl' : 'public',
          'name' : 'scripts/main',
          'mainConfigFile' : 'public/scripts/main.js',
          'out' : 'public/scripts/main-built.js',
          'preserveLicenseComments' : false,
          'paths' : {
            'google-analytics'  : 'scripts/libs/analytics'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-curl');

  grunt.registerTask('develPage', 'Create a development index page', function() {
    var file = grunt.file.read('public/index.html');
    grunt.file.write(
      'public/index-dev.html',
      file.replace(/data-main="scripts\/main-built"/, 'data-main="scripts/main"')
    );
  });

  grunt.registerTask('default', [ 'copy', 'exec', 'curl', 'requirejs' ]);
  grunt.registerTask('dev', [ 'copy', 'exec', 'develPage' ]);
};
