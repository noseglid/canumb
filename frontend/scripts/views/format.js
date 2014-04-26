define([
  'jquery',
  'underscore',
  'backbone',

  'text!templates/format.tpl',
  'text!templates/json.tpl'
], function(
  $,
  _,
  Backbone,

  template,
  jsonTemplate
) {

  var fadeTime = 100;

  return Backbone.View.extend({

    initialize : function() {
      this.$el.html(_.template(template));
      this.listenTo(this.model, 'change:parsed', this.render);
      this.listenTo(this.model, 'change:error', this.error);
    },

    events : {
      'input textarea' : 'updateData',
      'click img.expand' : function() {
        this.setExpand(true);
      },
      'click img.shrink' : function() {
        this.setExpand(false);
      }
    },

    setExpand : function(state) {
      this.$('input[type="checkbox"]').prop('checked', state);
    },

    render : function() {
      this.$('textarea').removeClass('error');

      if (null === this.model.get('parsed')) {
        this.$('#result').fadeOut(fadeTime);
        return;
      }

      var jsonobj = this.model.get('parsed');
      this.$('#browse-area').html(_.template(jsonTemplate, { root : jsonobj }));
      this.$('#formatted-area').html(JSON.stringify(jsonobj, null, 4));
      this.$('#minified-area').html(JSON.stringify(jsonobj));
      this.setExpand(false);

      this.$('#result').fadeIn(fadeTime);
    },

    updateData : function() {
      this.model.set('data', this.$('textarea').val());
    },

    error : function() {
      this.$('textarea').addClass('error');
      this.$('#result').fadeOut(fadeTime);
    }
  });
});
