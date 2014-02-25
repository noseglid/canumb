define([
  'jquery',
  'underscore',
  'growl',
  'backbone',

  "text!/templates/hash.tpl",
  "text!/templates/hash-result.tpl"
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
      this.timer = 0;

      var self = this;
      $.get('/doc/hash', function(data) {
        self.$el.html(_.template(template, {
          'algorithms' : _.find(data.rest, function(r) {
            return (r.name === 'algorithm');
          }).valid
        }));
      }, 'json');

      this.listenTo(this.model, 'change:hashed', this.render);
      this.listenTo(this.model, 'change:error',  this.error);
      this.listenTo(this.model, 'syncFinished',  this.syncFinished);
    },

    events : {
      'input textarea'                 : 'updateData',
      'change input[name="algorithm"]' : 'updateAlgorithm'
    },

    render : function() {
      if (!this.model.get('hashed')) {
        this.$('#result').fadeOut(fadeTime);
        return;
      }

      this.$('#result').html(_.template(resultTemplate, {
        'data' : this.model.get('hashed').hex
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
        var data = self.$('textarea').val();
        if (/^\s+|\s+$/.test(data)) {
          $.growl.warning({
            'title'    : 'Whitespaces',
            'message'  : 'You have leading or trailing white spaces in your data.',
            'duration' : 1000,
            'size'     : 'small'
          });
        }

        self.model.set('data', data);
      }, queryDelay);
    },

    updateAlgorithm : function() {
      if (0 < this.$('textarea').val().length) {
        this.$('textarea').addClass('loading');
      }

      var val = this.$('input[name="algorithm"]:checked').val();
      this.model.set('algorithm', val);
    }

  });
});
