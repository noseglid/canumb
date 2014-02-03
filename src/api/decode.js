var errors = require('../lib/errors.js');

function base64(data)
{
  if (!data) {
    /* No data provided. This is an error no matter what */
    throw new errors.MissingArgument('No data provided.');
  }

  var buffer = new Buffer(data, 'base64');
  return {
    'ascii' : buffer.toString('ascii'),
    'utf8'  : buffer.toString('utf8'),
    'hex'   : buffer.toString('hex')
  }
}

function uri(data)
{
  return {
    'utf8' : decodeURIComponent(data)
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
      "Unsupported algorithm: '" + request.params.algorithm + "'"
    );
    break;
  };

  response.send(handler(request.body));
  return next();
}

exports.method = 'post';
exports.params = [ 'algorithm' ];
exports.entry  = api;
