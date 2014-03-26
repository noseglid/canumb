define([
  'jquery',
  'underscore',
  'backbone',

  'text!/templates/format.tpl',
  'text!/templates/json.tpl'
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
      'click img.expand' : 'toggleExpand',
      'click img.shrink' : 'toggleExpand',
      'change input:checkbox' : 'checkboxStateChanged'
    },

    toggleExpand : function() {
      var el = this.$('input[type="checkbox"]');
      el.prop('checked', !el.prop('checked'));
    },

    checkboxStateChanged : function() {
      var nchecked = this.$('#browse-area input:checkbox:checked').length;
      var total = this.$('#browse-area input:checkbox').length;
      this.$('#all-expand-collapse').prop('checked', nchecked === total);
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
      this.checkboxStateChanged();

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
