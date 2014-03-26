requirejs.config({
  'baseUrl' : '/scripts',
  'paths' : {
    'text'              : 'libs/text',
    'underscore'        : 'libs/underscore-min',
    'backbone'          : 'libs/backbone',
    'jquery'            : 'libs/jquery.min',
    'jquery-ui-widget'  : 'libs/ui.widget.jquery',
    'growl'             : 'libs/jquery.growl',
    'google-analytics'  : [ '//www.google-analytics.com/analytics', 'libs/analytics' ],
    'vex'               : 'libs/vex.min',
    'vexDialog'         : 'libs/vex.dialog.min',
  },

  'shim' : {
    'underscore' : {
      'exports' : '_'
    },
    'growl' : {
      'deps' : [ 'jquery' ]
    },
    'backbone' : {
      'deps' : [ 'jquery', 'underscore' ],
      'exports' : 'Backbone'
    },
    'google-analytics' : {
      'exports' : 'ga'
    },
    'vex' : {
      'deps' : [ 'jquery' ]
    },
    'vexDialog' : {
      'deps' : [ 'vex', 'jquery' ]
    }
  }
});

require([
  'jquery',
  'backbone',
  'router',
  'google-analytics',

  'views/convert',
  'models/convert',
  'views/decode',
  'models/decode',
  'views/encode',
  'models/encode',
  'views/hash',
  'models/hash',
  'views/format',
  'models/format',
  'views/version',
  'models/version'
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
  HashView,
  HashModel,
  FormatView,
  FormatModel,
  VersionView,
  VersionModel
) {
  ga('create', 'UA-47615700-1', 'auto');
  ga('send', 'pageview');

  var backboneOriginalSync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    var url = typeof model.url === 'function' ? model.url() : model.url;
    ga('send', 'pageview', { page : url });
    backboneOriginalSync(method, model, options);
  };

  new Router();
  Backbone.history.start();

  $(function() {
    $('input[name="tabs"]').click(function() {
      window.location.hash = $(this).attr('id').split('-')[1];
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

    new HashView({
      model : new HashModel(),
      el    : $('#tab-content-hash')
    });

    new FormatView({
      model : new FormatModel(),
      el    : $('#tab-content-format')
    });

    new VersionView({
      model : new VersionModel(),
      el    : $('#version')
    });

  });

});
