define([
  'underscore',
  'backbone',

  'views/apidoc',
  'models/apidoc'

], function(
  _,
  Backbone,
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
      "apidoc" : "apidoc"
    },

    apidoc : function() {
      this.apidocView.render();
    }
  });
});
