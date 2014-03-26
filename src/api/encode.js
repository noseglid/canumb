var base85 = require('base85');

var errors = require('../lib/errors.js');

function api(request, response, next)
{
  if (typeof request.body !== 'object' || !request.body.data) {
    throw new errors.MissingArgument('No data provided.');
  }

  var resp = {};
  switch(request.params.algorithm) {
  case 'base64':
    resp.base64 = new Buffer(request.body.data).toString('base64');
    break;

  case 'uri':
    resp.uri = encodeURIComponent(request.body.data);
    break;

  case 'base85':
    resp.base85 = base85.encode(request.body.data);
    break;

  default:
    throw new errors.InvalidArgument(
      'Unsupported algorithm: \'' + request.params.algorithm + '\''
    );
  }

  response.send(resp);
  return next();
}

exports.api = 'encode';

exports.method = 'post';

exports.rest = [
  {
    'name'        : 'algorithm',
    'description' : 'The algorithm with which supplied data should be encoded.',
    'valid'       : [ 'base64', 'uri', 'base85' ]
  }
];

exports.doc = {};

exports.doc.input = [
  {
    'name'        : 'data',
    'type'        : 'string',
    'description' : 'The data to encode.'
  }
];

exports.doc.description = 'Encodes data using a specified algorithm.';

exports.doc.errors = [
  {
    'type' : errors.InvalidArgument,
    'description' : 'Thrown if the algorithm is invalid.'
  },
  {
    'type' : errors.MissingArgument,
    'description' : 'Thrown if no data to encode is supplied.'
  }
];

exports.entry = [
  require('restify').bodyParser({
    'mapParams' : false,
    'maxBodySize' : 1024 * 1024 * 2 /* Max 2 MB. Should be plenty. */
  }),
  api
];
