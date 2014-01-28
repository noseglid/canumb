module.exports = function(grunt) {
  grunt.initConfig({
    "copy" : {
      "main" : {
        "files" : [
          {
            "expand" : true,
            "cwd"    : "frontend/",
            "src"    : ["*.html"],
            "dest"   : "public/",
            "filter" : "isFile"
          }
        ]
      }
    },

    "sass" : {
      "dist" : {
        "files" : [
          {
            "expand" : true,
            "cwd"    : "frontend/",
            "src"    : ["*.scss"],
            "dest"   : "public/",
            "ext"    : ".css"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('heroku', ['copy', 'sass']);
};
