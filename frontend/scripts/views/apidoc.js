define([
  'jquery',
  'backbone',
  'vex',
  'growl',

  "text!/templates/apidoc.tpl",
  "text!/templates/apidoc-details.tpl"
], function(
  $,
  Backbone,
  vex,
  growl,

  template,
  templateDetails
) {
  vex.defaultOptions.className = 'vex-theme-flat-attack';

  var transitionTime = 100;

  return Backbone.View.extend({

    initialize : function() {
    },

    events : {
      'click .api-title' : 'getDetails'
    },

    render : function() {
      if (undefined === this.model.get('apis')) {
        /* API doc not ready yet, render again when it's fetched. */
        this.listenToOnce(this.model, 'change', this.render);
        return;
      }

      /* View is now loaded, make sure we set all events */
      this.delegateEvents();

      var contents = _.template(template, {
        'apis' : this.model.get('apis'),
        'version' : this.model.get('version')
      })

      var self = this;
      vex.open({
        'content'          : contents,
        'contentClassName' : 'apidoc',
        'afterClose'       : function() {
          self.model.unset(self.model.get('id'));
          window.location.hash = '';
        },
      });
    },

    getDetails : function(ev) {
      var newid = $(ev.currentTarget).text();
      if (this.model.get('id') === newid && this.model.get(newid)) {
        /* Clicked the same api-title again, and it's open */
        this.model.unset(newid);
        this.showDetails(null);
        return;
      }

      /* Remove the actual data for id */
      this.model.unset(this.model.get('id'));

      /* Set the new id */
      this.model.set('id', newid);

      /* Fetch the model describing this API */
      this.model.fetch({
        'success' : _.bind(this.showDetails, this, newid),
        'error'   : function() {
          $.growl.error({
            'title'   : 'Error',
            'message' : 'Failed to retrieve documentation.'
          });
        }
      });
    },

    showDetails : function(api) {
      this.$('.details').slideUp(transitionTime);

      if (!api) {
        return;
      }

      this.$('#details-' + api).html(_.template(templateDetails, this.model.get(api)));
      this.$('#details-' + api).slideDown(transitionTime);
    }
  });
});
