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

  var resultFadeTime = 100;
  var queryDelay     = 300;

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
    })).fadeIn(resultFadeTime);
  }

  function unsetResult()
  {
    $('#loader').css('visibility', 'hidden');
    $('#result').fadeOut(resultFadeTime, function() {
      $('#result').text('');
    });
  }

  function convertNumber(type, number)
  {
    $.ajax('/convert/' + type + '/' + number, {
      'error' : function(jqXHR, textStatus, errorThrown) {
        var data = JSON.parse(jqXHR.responseText);
        $.growl.error({
          'title' : data.code,
          'message' : data.message
        });
        unsetResult();
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
        return unsetResult();
      }

      $('#loader').css('visibility', 'visible');
      convertNumber($(this).val(), $('#number').val());
    });

    var timeoutid;
    $('#input-array #number').keyup(function() {
      if (timeoutid) {
        clearTimeout(timeoutid);
      }

      if (!$(this).val()) {
        return unsetResult();
      }

      $('#loader').css('visibility', 'visible');
      var fn = _.bind(convertNumber, {}, $('#type').val(), $(this).val());
      timeoutid = setTimeout(fn, queryDelay);
    });

    $(document).on('click', '#align-button label', function(evt) {
      var checkbox = $('#align-button input');
      checkbox.prop('checked', !checkbox.prop('checked'));
      setResult();
    });
  });
});
