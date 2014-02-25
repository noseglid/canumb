var http = require('http');
var _    = require('underscore');

function request(rest, method, data, done)
{
  done = done || data;

  ctype = 'application/json';
  switch(typeof data) {
  case 'object':
    data = JSON.stringify(data);
    break;
  case 'string':
  ctype = 'text/plain';
    break;
  }

  var options = {
    'hostname' : 'localhost',
    'port'     : process.env.PORT,
    'path'     : '/' + rest.join('/'),
    'method'   : method.toUpperCase(),
    'headers'  : {
      'Connection'     : 'close',
      'Content-Type'   : ctype,
    }
  };

  if (_.contains(['POST', 'PUT'], method.toUpperCase())) {
    options.headers['Content-Length'] = data ? Buffer.byteLength(data, 'utf8') : 0;
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

  if (data && _.contains(['POST', 'PUT'], method.toUpperCase())) {
    req.write(data);
  }

  req.end();
}

module.exports.request = request;
