var crypto = require('crypto');
var _      = require('underscore');

var errors = require('../lib/errors.js');

var hashes = [
  'sha1',
  'sha224',
  'sha256',
  'sha384',
  'sha512',
  'mdc2',
  'md4',
  'md5',
  'ripemd',
  'ripemd160',
  'whirlpool'
];

function api(request, response, next)
{
  if (-1 === hashes.indexOf(request.params.algorithm)) {
    throw new errors.InvalidArgument('Unsupported algorithm: \'' + request.params.algorithm + '\'');
  }

  var dataProvider;
  if (/^application\/json/.test(request.headers['content-type']) ||
      /^application\/x-www-form-urlencoded/.test(request.headers['content-type'])) {
    if (typeof request.body !== 'object' || request.body.data === undefined) {
      throw new errors.MissingArgument('No data provided.');
    }

    dataProvider = function(datacb, donecb) {
      datacb(request.body.data);
      donecb();
    };
  }

  if (/^multipart\/form-data/.test(request.headers['content-type'])) {
    if (typeof request.body === 'object' && request.body.data !== undefined) {
      /* multipart, but not a file upload. The data is in request.body */
      dataProvider = function(datacb, donecb) {
        datacb(request.body.data);
        donecb();
      };
    } else if (request.hasher) {
      /* The hashing was performed during the upload by apiBodyHandler */
      dataProvider = function(datacb, donecb) {
        donecb();
      };
    } else {
      throw new errors.MissingArgument('No data provided.');
    }
  }

  if (!dataProvider && !request.hasher) {
    throw new errors.MissingArgument('Data must be sent with \'application/json\' or \'multipart/form-data\'');
  }

  var finished = function() {
    var hashBuffer = request.hasher.digest();
    response.send({
      'hex'    : hashBuffer.toString('hex'),
      'base64' : hashBuffer.toString('base64')
    });
    request.hasher = null;
    return next();
  };

  if (!request.hasher) {
    request.hasher = crypto.createHash(request.params.algorithm);
  }

  dataProvider(_.bind(request.hasher.update, request.hasher), finished);
}

exports.api = 'hash';

exports.method = 'post';

exports.rest = [
  {
    'name'        : 'algorithm',
    'description' : 'The algorithm with which supplied data should be hashed.',
    'valid'       : hashes
  }
];

exports.doc = {};

exports.doc.input = [
  {
    'name'        : 'data',
    'type'        : 'string',
    'description' : 'The data to hash. May be sent as a file.'
  }
];

exports.doc.description = 'Hashes data using a specified algorithm.';

exports.doc.errors = [
  {
    'type' : errors.InvalidArgument,
    'description' : 'Thrown if the algorithm is invalid.'
  },
  {
    'type' : errors.MissingArgument,
    'description' : 'Thrown if no data to hash is supplied.'
  },
  {
    'type' : errors.InternalServerError,
    'description' : 'Thrown if an unknown error occurs when transferring data as a file.'
  }
];

exports.entry = [
  /* We want the body parser with custom handling of files */
  require('restify').bodyParser({
    'mapParams' : false,
    'multipartFileHandler' : function(part, request) {
      request.hasher = crypto.createHash(request.params.algorithm);
      part.on('data', function(data) {
        request.hasher.update(data);
      });
    }
  }),

  /* And of course the API */
  api
];
