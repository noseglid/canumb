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

exports.api  = 'encode';

exports.method  = 'post';

exports.rest = [
  {
    'name'        : 'algorithm',
    'description' : 'The algorithm with which supplied data should be encoded.',
    'valid'       : [ 'base64', 'uri' ]
  }
];

exports.doc = {};

exports.doc.input  = [
  {
    'name'        : 'data',
    'type'        : 'string',
    'description' : 'The data to encode. May be any valid JSON string, ' +
                    'so unicode if necessary..'
  }
]

exports.doc.description = 'Encodes base64 and uri (percent)';

exports.doc.errors = [
  {
    'type' : errors.InvalidArgument,
    'description' : 'Thrown if the algorithm is invalid'
  },
  {
    'type' : errors.MissingArgument,
    'description' : 'Thrown if no data to encode is supplied.'
  }
];

exports.entry  = api;
