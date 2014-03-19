define([
  'backbone',
  'jquery'
], function(
  Backbone,
  $
) {
  return Backbone.Model.extend({

    defaults : {
      'data'   : '',
      'parsed' : null,
      'error'  : null
    },

    initialize : function() {
      this.listenTo(this, 'change:data', this.interpret);
    },

    interpret : function() {
      this.set('error', null, { silent: true });
      this.set('parsed', '', { silent: true });

      if (0 >= this.get('data').length) {
        this.set('parsed', null);
        return;
      }

      try {
        this.set('parsed', JSON.parse(this.get('data')));
      } catch (e) {
        console.log(e);
        this.set('error', {
          'title' : 'Invalid JSON',
          'message' : e.message
        });
      }
    }
  });
});
