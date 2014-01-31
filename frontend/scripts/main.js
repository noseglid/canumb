requirejs.config({
  "baseUrl" : "/",
  "paths" : {
    "text"       : "scripts/libs/text",
    "underscore" : "scripts/libs/underscore-min",
    "jquery"     : "scripts/libs/jquery.min",
    "growl"      : "scripts/libs/jquery.growl",
    "analytics"  : "scripts/analytics"
  },

  "shim" : {
    "underscore" : {
      "exports" : "_"
    },
    "growl" : {
      "deps" : [ "jquery" ]
    }
  }
});

require([
  "jquery",
  "underscore",
  "growl",
  "analytics",
  "text!templates/result.tpl"], function($, _, growl, analytics, resultTpl) {

  var currentResult;

  function setResult()
  {
    var align = $('#align-button input').is(':checked');
    $('#result').html(_.template(resultTpl, {
      bin : currentResult.bin[align ? 'group8' : 'standard'],
      oct : currentResult.oct['standard'],
      dec : currentResult.dec['standard'],
      hex : currentResult.hex['standard'],
      checked : align ? 'checked="checked"' : ''
    }));
  }

  function convertNumber(type, number)
  {
    $.ajax('/convert/' + type + '/' + number, {
      'error' : function(jqXHR, textStatus, errorThrown) {
        var data = JSON.parse(jqXHR.responseText);
        console.log(data);
        $.growl.error({
          'title' : data.code,
          'message' : data.message
        });
      },
      'success' : function(data, textStatus, jqXHR) {
        currentResult = data;
        setResult();
      },
      'complete' : function(jqXHR, textStatus) {
        $('#loader').css('visibility', 'hidden');
      }
    });
  }

  $(function() {
    $('#input-array #type').change(function() {
      if (!$('#input-array #number').val()) {
        $('#result').text('');
        return;
      }

      $('#loader').css('visibility', 'visible');
      convertNumber($(this).val(), $('#number').val());
    });

    var timeoutid;
    $('#input-array #number').keyup(function() {
      if (!$(this).val()) {
        $('#result').text('');
        return;
      }

      if (timeoutid) {
        clearTimeout(timeoutid);
      }

      $('#loader').css('visibility', 'visible');
      var fn = _.bind(convertNumber, {}, $('#type').val(), $(this).val());
      timeoutid = setTimeout(fn, 300);
    });

    $(document).on('click', '#align-button label', function(evt) {
      var checkbox = $('#align-button input');
      checkbox.prop('checked', !checkbox.prop('checked'));
      setResult();
    });
  });
});
