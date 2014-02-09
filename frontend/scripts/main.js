requirejs.config({
  "baseUrl" : "/scripts",
  "paths" : {
    "text"           : "libs/text",
    "underscore"     : "libs/underscore-min",
    "backbone"       : "libs/backbone-min",
    "jquery"         : "libs/jquery.min",
    "growl"          : "libs/jquery.growl",
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
  "views/decode",
  "models/decode"
], function(
  $,
  analytics,

  ConvertView,
  ConvertModel,
  DecodeView,
  DecodeModel
) {

  $(function() {

    new ConvertView({
      model : new ConvertModel(),
      el    : $('#tab-content-convert')
    });

    new DecodeView({
      model : new DecodeModel(),
      el : $('#tab-content-decode')
    });

  });

});
