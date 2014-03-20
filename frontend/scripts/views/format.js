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
      'click img.expand' : 'toggleExpand',
      'click img.shrink' : 'toggleExpand',
      'change input:checkbox' : 'checkboxStateChanged'
    },

    toggleExpand : function() {
      var el = this.$('input[type="checkbox"]');
      el.prop('checked', !el.prop('checked'));
    },

    checkboxStateChanged : function() {
      var nchecked = this.$('#result-browse input:checkbox:checked').length;
      var total = this.$('#result-browse input:checkbox').length;
      this.$('#result-menu > input:checkbox').prop('checked', nchecked === total);
    },

    render : function() {
      this.$('textarea').css('border-color', 'white');

      if (null === this.model.get('parsed')) {
        this.$('#result').fadeOut(fadeTime);
        return;
      }

      this.$('#result-browse').html(_.template(jsonTemplate, {
        root : this.model.get('parsed')
      }));

      this.$('#result').fadeIn(fadeTime);
    },

    updateData : function() {
      this.model.set('data', this.$('textarea').val());
    },

    error : function() {
      this.$('textarea').css('border-color', 'red');
      this.$('#result').fadeOut(fadeTime);
    }
  });
});
