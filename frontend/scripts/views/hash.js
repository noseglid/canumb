define([
  'jquery',
  'underscore',
  'growl',
  'backbone',

  'text!/templates/hash.tpl',
  'text!/templates/hash-result.tpl'
], function(
  $,
  _,
  growl,
  Backbone,

  template,
  resultTemplate
) {

  var queryDelay = 300;

  return Backbone.View.extend({

    initialize : function() {
      this.timer = 0;

      var self = this;
      $.get('/doc/hash', function(data) {
        self.$el.html(_.template(template, {
          'algorithms' : _.find(data.rest, function(r) {
            return (r.name === 'algorithm');
          }).valid,
          'html5upload' : (window.FormData !== 'undefined'),
          'checked' : self.model.get('algorithm')
        }));
      }, 'json');

      this.listenTo(this.model, 'change:hashed',  this.render);
      this.listenTo(this.model, 'change:error',   this.error);
      this.listenTo(this.model, 'syncFinished',   this.syncFinished);
      this.listenTo(this.model, 'uploadProgress', this.uploadProgress);

      /* Save once to get the hash of the empty string */
      this.model.save();
    },

    events : {
      'input textarea'                 : 'updateDataFromTextArea',
      'change input[name="algorithm"]' : 'updateAlgorithm',
      'click #upload-file'             : 'selectFile',
      'change input[type="file"]'      : 'uploadFile'
    },

    render : function() {
      this.$('textarea').html(this.model.get('data'));

      if (null === this.model.get('hashed')) {
        this.$('#result').hide();
        return;
      }

      this.$('#result').html(_.template(resultTemplate, {
        'data' : this.model.get('hashed').hex,
        'src' : $('#source-textarea').prop('checked') ? 'input' : 'upload'
      })).show();
    },

    error : function() {
      var err = this.model.get('error');
      if (!err) {
        return;
      }

      $.growl.error({
        'title'   : err.code,
        'message' : err.message
      });
    },

    syncFinished : function() {
      this.$('textarea').removeClass('loading');
      this.$('#upload-ajax-loader').hide();
      this.$('#upload-nice-text').text('');
      if (this.model.get('data') instanceof FormData) this.resetTextArea();
      else this.resetFile();
    },

    updateDataFromTextArea : function() {
      this.$('textarea').removeClass('loading');
      this.$('#source-textarea').prop('checked', true);

      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (this.model.get('data') === this.$('textarea').val()) {
        /* Somehow we ended up with the same data. Do nothing. */
        return;
      }

      this.$('textarea').addClass('loading');

      var self = this;
      this.timer = setTimeout(function() {
        self.model.set('data', self.$('textarea').val());
      }, queryDelay);
    },

    updateAlgorithm : function() {
      if (this.model.get('data') instanceof FormData) this.$('#upload-ajax-loader').show();
      else this.$('textarea').addClass('loading');

      var val = this.$('input[name="algorithm"]:checked').val();
      this.model.set('algorithm', val);
    },

    selectFile : function() {
      this.$('input[type="file"]').click();
    },

    uploadFile : function() {
      this.$('#source-upload').prop('checked', true);
      this.$('#upload-ajax-loader').show();
      var formData = new FormData(this.$('#upload-form')[0]);
      this.model.set('data', false, { 'silent' : true });
      this.model.set('data', formData);
    },

    uploadProgress : function(e) {
      var fraction = isNaN(e.loaded / e.total) ? 0 : e.loaded / e.total;
      this.$('#upload-progress-text').text(Math.round(100 * fraction) + ' %');
      this.$('#upload-progress-bar').css('width', Math.round(100 * fraction) + '%');

      this.$('#upload-nice-text').text(fraction < 1.0 ? 'uploading' : 'hashing');
    },

    resetFile : function() {
      this.$('input[type="file"]').val('');
      this.$('#upload-progress-text').text('0 %');
      this.$('#upload-progress-bar').css('width', '0px');
    },

    resetTextArea : function() {
      this.$('textarea').val('');
    }
  });
});
