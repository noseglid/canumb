var http = require('http');
var _    = require('underscore');
var qs   = require('querystring');
var util = require('util');
var request = require('request');

function readJSONResponse(cb, res) {
  var data = '';
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    data += chunk;
  });

  res.on('end', function(e) {
    var obj = JSON.parse(data);
    cb(obj, res.statusCode);
  })
};

function oldRequest(rest, method, data, done)
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

  var req = http.request(options, _.bind(readJSONResponse, null, done));

  req.on('error', function(e) {
    /* Something's wrong... */
    console.log(e);
    done(null, e);
  });

  if (data && _.contains(['POST', 'PUT'], method.toUpperCase())) {
    req.write(data);
  }

  req.end();
}

function wwwFormRequest(rest, params, cb)
{
  var data = qs.stringify(params);
  var options = {
    'hostname' : 'localhost',
    'port'     : process.env.PORT,
    'path'     : '/' + rest.join('/'),
    'method'   : 'POST',
    'headers'  : {
      'Connection'   : 'close',
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Length' : data.length
    }
  };

  var req = http.request(options, _.bind(readJSONResponse, null, cb));
  req.on('error', function(e) {
    console.log(e);
    cb(null, 0);
  });

  req.write(data);
}

function multipartRequest(rest, params, cb)
{
  var url = util.format('http://localhost:%d/%s', process.env.PORT, rest.join('/'));

  var _cb = function(err, res, body) {
    cb(err ? null : JSON.parse(body), res.statusCode)
  };

  var req = request.post(url, _cb);
  var form = req.form();
  _.each(params, function(value, key) {
    form.append(key, value);
  });
}

module.exports.request = oldRequest;
module.exports.wwwFormRequest = wwwFormRequest;
module.exports.multipartRequest = multipartRequest;
