define([
  'backbone',
  'jquery'
], function(
  Backbone,
  $
) {
  return Backbone.Model.extend({

    defaults : {
      'data'         : '',
      'algorithm'    : 'sha1',
      'hashed'       : null,
      'error'        : null
    },

    initialize : function() {
      this.syncing = false;
      this.resync  = false;
      this.listenTo(this, 'change:data change:algorithm', this.hash);
      this.listenTo(this, 'sync', this.update);
      this.listenTo(this, 'error', this.error);
    },

    url : function() {
      return '/hash/' + this.get('algorithm');
    },

    syncFile : function(formData) {
      var self = this;
      $.ajax({
        'url' : '/hash/' + this.get('algorithm'),
        'type' : 'POST',
        'xhr' : function() {
          var myXhr = $.ajaxSettings.xhr();
          if (myXhr.upload) {
            myXhr.upload.addEventListener('progress', function(e) {
              self.trigger('uploadProgress', e);
            });
          }
          return myXhr;
        },
        'data' : formData,
        'success' : _.bind(this.update, this, this),
        'error' : function(xhr, textStatus, error) {
          self.error(self, xhr);
        },
        contentType: false,
        processData: false
      });
    },

    hash : function() {
      /*
       * May be called with data === false, don't do anything
       * in that case. It is used to force a change in the model
       * which FormData doesn't trigger
       */

       this.resync = false;
       if (this.syncing) {
         this.resync = true;
         return;
       }

      this.syncing = true;
      if (typeof this.get('data') === 'string') {
        this.save();
      } else if (this.get('data') instanceof FormData) {
        this.syncFile(this.get('data'));
      }
    },

    update : function(model, response, options) {
      this.set('hashed', response);
      this.set('error', null);

      this.syncing = false;
      if (true === this.resync) {
        this.hash();
        return;
      }

      this.trigger('syncFinished');
    },

    error : function(model, xhr, options) {
      this.syncing = false;
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
