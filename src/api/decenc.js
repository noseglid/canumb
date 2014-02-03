var errors = require('../lib/errors.js');

function base64(encoding, data)
{
  if (!data) {
    /* No data provided. This is an error no matter what */
    throw new errors.MissingArgument('No data provided.');
  }

  if (!encoding) {
    /* Incomming data is requested to be base64 encoded. */
    return {
      'base64' : new Buffer(data).toString('base64')
    }
  } else if (encoding.toLowerCase() === 'base64') {
    /* Incomming data is encoded. Decode it */
    var buffer = new Buffer(data, 'base64');
    return {
      'ascii' : buffer.toString('ascii'),
      'utf8'  : buffer.toString('utf8'),
      'hex'   : buffer.toString('hex')
    }
  }

  throw new errors.InvalidArgument('Unknown Content-Transfer-Encoding: ' + encoding);
}

function uri(encoding, data)
{
  if (!encoding) {
    /* Incomming data is requested to be URL encoded. */
    return {
      'uri' : encodeURIComponent(data)
    };
  } else if (encoding.toLowerCase() === 'x-uri') {
    /* Incomming data is encoded. Decode it. */
    return {
      'utf8' : decodeURIComponent(data)
    };
  }

  throw new errors.InvalidArgument('Unknown Content-Transfer-Encoding: ' + encoding);
}

function api(request, response, next)
{
  var result = {};
  switch(request.params.algorithm.toLowerCase()) {
  case 'base64':
    result = base64(request.headers['content-transfer-encoding'], request.body);
    break;

  case 'uri':
    result = uri(request.headers['content-transfer-encoding'], request.body);
    break;

  default:
    throw new errors.InvalidArgument(
      "Unsupported algorithm: '" + request.params.algorithm + "'"
    );
    break;

  };

  response.send(result);
  return next();
}

exports.method = 'post';
exports.params = [ 'algorithm' ];
exports.entry  = api;
