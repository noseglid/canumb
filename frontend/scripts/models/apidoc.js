define([
  'backbone'
], function(
  Backbone
) {
  return Backbone.Model.extend({

    defaults : {
    },

    initialize : function() {
      this.fetch();
    },

    url : function() {
      return this.get('id') ? '/doc/' + this.get('id') : '/doc';
    },

    parse : function(response) {
      if (!this.get('id')) {
        return response;
      }

      var ret = {};
      ret[this.get('id')] = response;
      return ret;
    }
  });
});
