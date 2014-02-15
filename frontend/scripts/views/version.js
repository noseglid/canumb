define([
  'jquery',
  'backbone',

  "text!/templates/version.tpl"
], function(
  $,
  Backbone,

  template
) {

  return Backbone.View.extend({

    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render : function() {
      this.$el.html(_.template(template, this.model.toJSON()));
    },
  });
});
