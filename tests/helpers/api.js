var http = require('http');
var _    = require('underscore');

function request(rest, method, data, done)
{
  done = done || data;

  var ctype = 'text/plain';
  if (typeof data === 'object') {
    data = JSON.stringify(data);
    ctype = 'application/json';
  }

  var options = {
    'hostname' : 'localhost',
    'port'     : 5000, /* Default port of canumb */
    'path'     : '/' + rest.join('/'),
    'method'   : method.toUpperCase(),
    'headers'  : {
      'Connection'     : 'close',
      'Content-Type'   : ctype,
    }
  };

  var hasEntityBody = data && _.contains(['POST', 'PUT'], method.toUpperCase());

  if (hasEntityBody) {
    options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
  }

  var req = http.request(options, function(res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function(e) {
      var obj = JSON.parse(data);
      done(obj, res.statusCode);
    })
  });

  req.on('error', function(e) {
    /* Something's wrong... */
    console.log(e);
    done();
  });

  if (hasEntityBody) {
    req.write(data);
  }

  req.end();
}

module.exports.request = request;
