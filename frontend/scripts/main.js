requirejs.config({
  "baseUrl" : "/",
  "paths" : {
    "text"           : "scripts/libs/text",
    "underscore"     : "scripts/libs/underscore-min",
    "backbone"       : "scripts/libs/backbone-min",
    "jquery"         : "scripts/libs/jquery.min",
    "growl"          : "scripts/libs/jquery.growl",

    "analytics"      : "scripts/analytics",
    "views/convert"  : "scripts/views/convert",
    "models/convert" : "scripts/models/convert"
  },

  "shim" : {
    "underscore" : {
      "exports" : "_"
    },
    "growl" : {
      "deps" : [ "jquery" ]
    },
    "backbone" : {
      "deps" : [ "jquery", "underscore" ],
      "exports" : "Backbone"
    }
  }
});

require([
  "jquery",
  "analytics",

  "views/convert",
  "models/convert",
], function(
  $,
  analytics,

  ConvertView,
  ConvertModel
) {
  $(function() {
    new ConvertView({
      model : new ConvertModel(),
      el : $('#tab-content-convert'),
    });
  });
});
