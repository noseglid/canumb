define([
  'underscore',
  'backbone',
  'jquery',

  'views/apidoc',
  'models/apidoc'

], function(
  _,
  Backbone,
  $,

  ApidocView,
  ApidocModel
) {

  return Backbone.Router.extend({
    initialize : function() {
      this.apidocView = new ApidocView({
        'model' : new ApidocModel(),
        'el'    : 'body'
      });
    },

    routes : {
      'apidoc'  : 'apidoc',
      'convert' : 'tab',
      'encode'  : 'tab',
      'decode'  : 'tab',
      'hash'    : 'tab',
      'format'  : 'tab'
    },

    apidoc : function() {
      this.apidocView.render();
    },

    tab : function() {
      $('#tab-' + Backbone.history.fragment).prop('checked', true);
    },
  });
});
