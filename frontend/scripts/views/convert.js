define([
  'jquery',
  'underscore',
  'growl',
  'backbone',

  'text!/templates/convert.tpl',
  'text!/templates/convert-result.tpl'
], function(
  $,
  _,
  growl,
  Backbone,
  template,
  resultTemplate
) {

  var fadeTime   = 100;
  var queryDelay = 300;

  return Backbone.View.extend({

    initialize : function() {
      this.numberTimer = 0;
      this.align = false;

      this.listenTo(this.model, 'change:converted', this.render);
      this.listenTo(this.model, 'change:error',     this.error);
      this.listenTo(this.model, 'syncFinished',     this.syncFinished);
      this.$el.html(_.template(template));
    },

    events : {
      'input #number'             : 'updateNumber',
      'change input[name="base"]' : 'updateBase',
      'change #align-binary'      : function() {
        this.align = !this.align;
        this.render();
      }
    },

    render : function() {
      var converted = this.model.get('converted');

      if (!converted) {
        $('#convert-result').fadeOut(fadeTime, function() {
          $('#convert-result').text('');
        });
        return;
      }

      this.$('#convert-result').html(_.template(resultTemplate, {
        bin : converted.bin[this.align ? 'group8' : 'standard'],
        oct : converted.oct.standard,
        dec : converted.dec.standard,
        hex : converted.hex.standard,
        checked : this.align ? 'checked="checked"' : ''
      })).fadeIn(fadeTime);
    },

    getNumber : function() {
      return this.$('#number').val().replace(/\s/g, '');

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
      this.$('#number').removeClass('loading');
    },

    updateNumber : function() {
      this.$('#number').removeClass('loading');

      if (this.numberTimer) {
        clearTimeout(this.numberTimer);
      }

      if (this.model.get('number') === this.getNumber()) {
        /* Same number as before, but not synced. Everything is up to par */
        return;
      }

      this.$('#number').addClass('loading');

      var self = this;
      this.numberTimer = setTimeout(function() {
        self.model.set('number', self.getNumber());
      }, queryDelay);
    },

    updateBase : function() {
      if (0 < this.getNumber().length) {
        /* Only show loader if we will actually load something */
        this.$('#number').addClass('loading');
      }

      this.model.set('base', this.$('input[name="base"]:checked').val());
    },

  });
});
