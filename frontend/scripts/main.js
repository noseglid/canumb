requirejs.config({
  "baseUrl" : "/scripts",
  "paths" : {
    "text"           : "libs/text",
    "underscore"     : "libs/underscore-min",
    "backbone"       : "libs/backbone",
    "jquery"         : "libs/jquery.min",
    "growl"          : "libs/jquery.growl",
    "google-analytics" : "//www.google-analytics.com/analytics",
    "vex"            : "libs/vex.min",
    "vexDialog"      : "libs/vex.dialog.min"
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
    },
    "google-analytics" : {
      "exports" : "ga"
    },
    "vex" : {
      "deps" : [ "jquery" ]
    },
    "vexDialog" : {
      "deps" : [ "vex", "jquery" ]
    }
  }
});

require([
  "jquery",
  "backbone",
  "router",
  "google-analytics",

  "views/convert",
  "models/convert",
  "views/decode",
  "models/decode",
  "views/encode",
  "models/encode",
  "views/version",
  "models/version"
], function(
  $,
  Backbone,
  Router,
  ga,

  ConvertView,
  ConvertModel,
  DecodeView,
  DecodeModel,
  EncodeView,
  EncodeModel,
  VersionView,
  VersionModel
) {
  ga('create', 'UA-47615700-1', 'auto');
  ga('send', 'pageview');

  var BackboneOriginalSync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    var url = typeof model.url === 'function' ? model.url() : model.url;
    ga('send', 'pageview', { page : url });
    BackboneOriginalSync(method, model, options);
  };

  var router = new Router();
  Backbone.history.start();

  $(function() {
    $('#apidoc').click(function() {
      window.location.hash = 'apidoc';
    });

    new ConvertView({
      model : new ConvertModel(),
      el    : $('#tab-content-convert'),
    });

    new DecodeView({
      model : new DecodeModel(),
      el    : $('#tab-content-decode')
    });

    new EncodeView({
      model : new EncodeModel(),
      el    : $('#tab-content-encode')
    });

    new VersionView({
      model : new VersionModel(),
      el    : $('#version')
    });

  });

});
