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
      'encoded'      : null,
      'error'        : null,
    },

    initialize : function() {
      this.listenTo(this, 'change:data change:algorithm', this.decode);
      this.listenTo(this, 'sync', this.update);
      this.listenTo(this, 'error', this.error);
    },

    url : function() {
      return '/encode/' + this.get('algorithm');
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
      var val = response ? response[this.get('algorithm')] : null;
      this.set('encoded', val);
      this.set('error', null);

      this.set('syncFinished', this.get('syncFinished') + 1)
    },

    error : function(model, xhr, options) {
      this.set('error', JSON.parse(xhr.responseText));
      this.set('encoded', null);

      this.set('syncFinished', this.get('syncFinished') + 1)
    }

  });
});
