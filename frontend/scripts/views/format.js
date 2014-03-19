define([
  'jquery',
  'underscore',
  'backbone',

  "text!/templates/format.tpl",
  "text!/templates/json.tpl"
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
    },

    render : function() {
      this.$('textarea').css('border-color', 'white');

      if (null === this.model.get('parsed')) {
        this.$('#result-search').fadeOut(fadeTime);
        return;
      }

      this.$('#result-search').html(_.template(jsonTemplate, {
        root : this.model.get('parsed')
      })).fadeIn(fadeTime);
    },

    updateData : function() {
      this.model.set('data', this.$('textarea').val());
    },

    error : function() {
      this.$('textarea').css('border-color', 'red');
      this.$('#result-search').fadeOut(fadeTime);
    }
  });
});
