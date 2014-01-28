module.exports = function(grunt) {
  grunt.initConfig({
    "sass" : {
      "dist" : {
        "files" : {
          "public/style.css" : "frontend/style.scss"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('release', ['sass']);
};
