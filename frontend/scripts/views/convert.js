define([
  'jquery',
  'underscore',
  'growl',
  'backbone',
  'models/convert',
  "text!templates/convert.tpl",
  "text!templates/convert-result.tpl"
], function(
  $,
  _,
  growl,
  Backbone,
  model,
  template,
  resultTemplate
) {

  var fadeTime   = 100;
  var queryDelay = 300;

  return Backbone.View.extend({

    initialize : function() {
      this.numberTimer = 0;

      this.listenTo(this.model, 'change:converted', this.render);
      this.listenTo(this.model, 'change:error',     this.error);
      this.$el.html(_.template(template));
    },

    events : {
      'input #number'        : 'updateNumber',
      'change #base'         : 'updateBase',
      'change #align-binary' : 'render'
    },

    render : function() {
      $('#loader').css('visibility', 'hidden');
      var converted = this.model.get('converted');

      if (!converted) {
        $('#result').fadeOut(fadeTime, function() {
          $('#result').text('');
        });
        return;
      }

      var align = this.$('#align-button input').is(':checked');
      this.$('#result').html(_.template(resultTemplate, {
        bin : converted.bin[align ? 'group8' : 'standard'],
        oct : converted.oct['standard'],
        dec : converted.dec['standard'],
        hex : converted.hex['standard'],
        checked : align ? 'checked="checked"' : ''
      })).fadeIn(fadeTime);
    },

    updateNumber : function() {
      if (this.numberTimer) {
        clearTimeout(this.numberTimer);
      }

      $('#loader').css('visibility', 'visible');

      var self = this;
      this.numberTimer = setTimeout(function() {
        self.model.set('number', self.$('#number').val());
      }, queryDelay);
    },

    updateBase : function() {
      $('#loader').css('visibility', 'visible');
      this.model.set('base', this.$('#base').val());
    },

    error : function() {
      $('#loader').css('visibility', 'hidden');

      var err = this.model.get('error');
      if (!err) {
        return;
      }

      $.growl.error({
        'title'   : err.code,
        'message' : err.message
      });
    }
  });
});
