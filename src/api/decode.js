var errors = require('../lib/errors.js');

function base64(data)
{
  if (!data) {
    /* No data provided. This is an error no matter what */
    throw new errors.MissingArgument('No data provided.');
  }

  data = data.replace(/\s/g, ''); // White space does not matter in base64

  if (data.match(/[^A-Za-z0-9\+\/=]/)) {
    /* Invalid base64 encoded data */
    throw new errors.InvalidArgument('Not valid base64 data.');
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
  try {
    return {
      'utf8' : decodeURIComponent(data)
    };
  } catch (e) {
    throw new errors.InvalidArgument("Unable to decode uri: " + data);
  }
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

  response.send(handler(request.body.data));
  return next();
}

exports.method = 'post';
exports.params = [ 'algorithm' ];
exports.entry  = api;
