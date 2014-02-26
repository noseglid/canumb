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
      this.trigger('syncFinished');
      this.set('hashed', null);
      this.set('error', null); // Set to null to trigger a change

      if ('error' === xhr.statusText) {
        /* No response from server */
        this.set('error', {
          'code' : 'ServerUnavailable',
          'message' : 'Unable to contact the server.'
        });
      } else {
        this.set('error', JSON.parse(xhr.responseText));
      }
    }
  });
});
