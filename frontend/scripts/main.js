requirejs.config({
  'baseUrl' : '/',
  'paths' : {
    'text'              : 'scripts/libs/text',
    'underscore'        : 'scripts/libs/underscore-min',
    'backbone'          : 'scripts/libs/backbone',
    'jquery'            : 'scripts/libs/jquery.min',
    'jquery-ui-widget'  : 'scripts/libs/ui.widget.jquery',
    'growl'             : 'scripts/libs/jquery.growl',
    'google-analytics'  : [ '//www.google-analytics.com/analytics', 'scripts/libs/analytics' ],
    'vex'               : 'scripts/libs/vex.min',
    'vexDialog'         : 'scripts/libs/vex.dialog.min',
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
  'google-analytics',

  'scripts/router',
  'scripts/views/convert',
  'scripts/models/convert',
  'scripts/views/decode',
  'scripts/models/decode',
  'scripts/views/encode',
  'scripts/models/encode',
  'scripts/views/hash',
  'scripts/models/hash',
  'scripts/views/format',
  'scripts/models/format',
  'scripts/views/version',
  'scripts/models/version'
], function(
  $,
  Backbone,
  ga,

  Router,
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
