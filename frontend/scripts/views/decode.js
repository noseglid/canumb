define([
  'jquery',
  'underscore',
  'backbone',

  "text!/templates/decode.tpl",
  "text!/templates/decode-result.tpl"
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

      this.$el.html(_.template(template));
      this.listenTo(this.model, 'change:decoded', this.render);
      this.listenTo(this.model, 'change:error', this.error);
    },

    events : {
      'input textarea'                        : 'updateData',
      'change input[name="decode-algorithm"]' : 'updateAlgorithm'
    },

    render : function() {
      this.$('textarea').removeClass('loading');

      if (!this.model.get('decoded')) {
        this.$('#decode-result').fadeOut(fadeTime);
        return;
      }

      this,$('#decode-result').html(_.template(resultTemplate, {
        'decoded' : this.model.get('decoded').utf8
      })).fadeIn(fadeTime);
    },

    error : function(e) {
      this.$('textarea').removeClass('loading');

      var err = this.model.get('error');
      if (!err) {
        return;
      }

      $.growl.error({
        'title'   : err.code,
        'message' : err.message
      });
    },

    updateData : function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      var self = this;

      this.$('textarea').addClass('loading');
      this.timer = setTimeout(function() {
        self.model.set('data', this.$('textarea').val());
      }, queryDelay);
    },

    updateAlgorithm : function() {
      if (0 < this.$('textarea').val().length) {
        this.$('textarea').addClass('loading');
      }

      var val = this.$('input[name="decode-algorithm"]:checked').val();
      this.model.set('algorithm', val);
    }

  });
});
