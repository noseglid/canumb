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
              "bower_components/jQuery/dist/jquery.min.js",
              "bower_components/jQuery/dist/jquery.min.map",
              "bower_components/backbone/backbone-min.js",
              "bower_components/underscore/underscore-min.js"
            ],
            "dest"   : "public/libs/",
            "filter" : "isFile"
          }
        ]
      },
      "main" : {
        "files" : [
          {
            "expand" : true,
            "flatten" : true,
            "src"    : ["frontend/*.html"],
            "dest"   : "public/",
            "filter" : "isFile"
          }
        ]
      }
    },

    'exec' : {
      'sass' : {
        'cmd' : './node_modules/.bin/node-sass ./frontend/style.scss ./public/style.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', [ 'copy', 'exec' ]);

  /* Leave this empty as npm's postinstall runs the 'default' grunt task */
  grunt.registerTask('heroku', []);
};
