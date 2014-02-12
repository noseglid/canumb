var errors = require('../lib/errors.js');

function base64(data)
{
  if (!data) {
    /* No data provided. This is an error no matter what */
    throw new errors.MissingArgument('No data provided.');
  }

  return {
    'base64' : new Buffer(data).toString('base64')
  }
}

function uri(data)
{
  if (!data) {
    /* No data provided. This is an error no matter what */
    throw new errors.MissingArgument('No data provided.');
  }

  return {
    'uri' : encodeURIComponent(data)
  };
}

function api(request, response, next)
{
  var handler;
  switch(request.params.algorithm) {
  case 'base64':
    handler = base64;
    break;

  case 'uri':
    handler = uri;
    break;

  default:
    throw new errors.InvalidArgument(
      "Unsupported algorithm: '" + request.params.algorithm
    );
    break;
  };

  response.send(handler(request.body.data));
  return next();
}

exports.api    = 'encode';
exports.params = [ 'algorithm' ];
exports.entry  = api;
