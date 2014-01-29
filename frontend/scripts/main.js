requirejs.config({
  "baseUrl" : "/",
  "paths" : {
    "text"       : "scripts/libs/text",
    "underscore" : "scripts/libs/underscore-min",
    "jquery"     : "scripts/libs/jquery.min",
    "canumb"     : "scripts/canumb"
  },

  "shim" : {
    "underscore" : {
      "exports" : "_"
    }
  }
});

require([
  "jquery",
  "underscore",
  "text!templates/result.tpl"], function($, _, resultTpl) {
  $(function() {

    $('input[type="button"]').click(function() {
      var url = '/convert/' + $(this).attr('id') + '/' + $('#number').val();
      $.get(url, function(data, textStatus, jqXHR) {
        $('#result').html(_.template(resultTpl, data));
      });
    });
  });
});
