define([
  'backbone'
], function(
  Backbone
) {
  return Backbone.Model.extend({

    defaults : {
      'data'         : '',
      'algorithm'    : 'sha1',
      'hashed'       : null,
      'error'        : null
    },

    initialize : function() {
      this.listenTo(this, 'change:data change:algorithm', this.hash);
      this.listenTo(this, 'sync', this.update);
      this.listenTo(this, 'error', this.error);
    },

    url : function() {
      return '/hash/' + this.get('algorithm');
    },

    hash : function() {
      if (0 < this.get('data').length) {
        this.save();
        return;
      }

      /* No data currently set */
      this.update(this, null, {});
    },

    update : function(model, response, options) {
      this.set('hashed', response);
      this.set('error', null);

      this.trigger('syncFinished');
    },

    error : function(model, xhr, options) {
      this.set('error', JSON.parse(xhr.responseText));
      this.set('hashed', null);

      this.trigger('syncFinished');
    }

  });
});
