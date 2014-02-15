define([
  'backbone'
], function(
  Backbone
) {
  return Backbone.Model.extend({

    defaults : {
      'version' : '',
    },

    initialize : function() {
      this.url = '/meta';
      this.fetch();
    },
  });
});
