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
              "bower_components/underscore/underscore-min.js",
              "bower_components/underscore/underscore-min.map",
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
          './frontend/stylesheets/style.scss',
          './public/stylesheets/style.css'
        ].join(' ')
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', [ 'copy', 'exec' ]);
};
