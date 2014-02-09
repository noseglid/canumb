define([
  'jquery',
  'underscore',
  'backbone',

  "text!/templates/decenc.tpl",
  "text!/templates/decenc-result.tpl"
], function(
  $,
  _,
  Backbone,

  template,
  resultTemplate
) {

  var fadeTime   = 100;
  var queryDelay = 300;

  return Backbone.View.extend({

    initialize : function() {
      this.timer = 0;

      this.$el.html(_.template(template, {
        'type'        : 'encode',
        'placeholder' : 'Must. Have. Data.'
      }));
      this.listenTo(this.model, 'change:encoded', this.render);
      this.listenTo(this.model, 'change:error', this.error);
      this.listenTo(this.model, 'change:syncFinished', this.syncFinished);
    },

    events : {
      'input textarea'                        : 'updateData',
      'change input[name="encode-algorithm"]' : 'updateAlgorithm'
    },

    render : function() {
      if (!this.model.get('encoded')) {
        this.$('#encode-result').fadeOut(fadeTime);
        return;
      }

      this,$('#encode-result').html(_.template(resultTemplate, {
        'data' : this.model.get('encoded')
      })).fadeIn(fadeTime);
    },

    error : function(e) {
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
    },

    updateData : function() {
      this.$('textarea').removeClass('loading');

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
      if (0 < this.$('textarea').val().length) {
        this.$('textarea').addClass('loading');
      }

      var val = this.$('input[name="encode-algorithm"]:checked').val();
      this.model.set('algorithm', val);
    }

  });
});
