var crypto = require('crypto');
var _      = require('underscore');
var base85 = require('base85');

var errors = require('../lib/errors.js');

function api(request, response, next)
{
  if ('application/json' !== request.headers['content-type']) {
    throw new errors.InvalidArgument("Data must be sent with 'application/json' content type.");
  }

  if (typeof request.body !== 'object' || request.body.data === undefined) {
    throw new errors.MissingArgument('No data provided.');
  }

  var hasher;
  switch(request.params.algorithm) {
  case 'sha1':
  case 'sha256':
  case 'sha512':
  case 'md4':
  case 'md5':
    hasher = crypto.createHash(request.params.algorithm);
    break;

  default:
    throw new errors.InvalidArgument(
      "Unsupported algorithm: '" + request.params.algorithm
    );
    break;
  };

  hasher.update(request.body.data);

  var hash = hasher.digest();

  response.send({
    'hex' : hash.toString('hex'),
    'base64' : hash.toString('base64')
  });
  return next();
}

exports.api = 'hash';

exports.method = 'post';

exports.rest = [
  {
    'name'        : 'algorithm',
    'description' : 'The algorithm with which supplied data should be hashed.',
    'valid'       : [ 'sha1', 'sha256', 'sha512', 'md4', 'md5' ]
  }
];

exports.doc = {};

exports.doc.input = [
  {
    'name'        : 'data',
    'type'        : 'string',
    'description' : 'The data to hash. May be any valid JSON string, ' +
                    'so, unicode for binary data.'
  }
]

exports.doc.description = 'Hashes data using a specified algorithm.';

exports.doc.errors = [
  {
    'type' : errors.InvalidArgument,
    'description' : 'Thrown if the algorithm is invalid.'
  },
  {
    'type' : errors.MissingArgument,
    'description' : 'Thrown if no data to hash is supplied.'
  }
];

exports.entry = api;
