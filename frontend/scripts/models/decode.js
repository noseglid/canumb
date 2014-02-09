define([
  'backbone'
], function(
  Backbone
) {
  return Backbone.Model.extend({

    defaults : {
      'syncFinished' : 0,
      'data'         : '',
      'algorithm'    : 'base64',
      'decoded'      : null,
      'error'        : null
    },

    initialize : function() {
      this.listenTo(this, 'change:data change:algorithm', this.decode);
      this.listenTo(this, 'sync', this.update);
      this.listenTo(this, 'error', this.error);
    },

    url : function() {
      return '/decode/' + this.get('algorithm');
    },

    decode : function() {
      if (0 < this.get('data').length) {
        this.save();
        return;
      }

      /* No data currently set */
      this.update(this, null, {});
    },

    update : function(model, response, options) {
      this.set('syncFinished', this.get('syncFinished') + 1);
      this.set('decoded', response);
      this.set('error', null);
    },

    error : function(model, xhr, options) {
      this.set('syncFinished', this.get('syncFinished') + 1);
      this.set('error', JSON.parse(xhr.responseText));
      this.set('decoded', null);
    }

  });
});
