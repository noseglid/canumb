var crypto = require('crypto');
var _      = require('underscore');
var base85 = require('base85');
var fs      = require('fs');

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
    throw new errors.InvalidArgument("Unsupported algorithm: '" + request.params.algorithm);
  }

  var dataProvider;
  if (/^application\/json$/.test(request.headers['content-type'])) {
    if (typeof request.body !== 'object' || request.body.data === undefined) {
      throw new errors.MissingArgument('No data provided.');
    }

    dataProvider = function(datacb, donecb) {
      datacb(request.body.data);
      donecb();
    };
  }

  if (/^multipart\/form-data/.test(request.headers['content-type'])) {
    if (typeof request.files !== 'object' || request.files.data === undefined) {
      throw new errors.MissingArgument('No data provided.');
    }

    dataProvider = function(datacb, donecb) {
      var stream = fs.createReadStream(request.files.data.path);
      stream.on('error', function(err) {
        throw errors.InternalServerError(err.message);
      });
      stream.on('data', datacb)
      stream.on('end', donecb);
    };
  }

  if (!dataProvider) {
    throw new errors.MissingArgument('Data must be sent with \'application/json\' or \'multipart/form-data\'');
  }

  var hasher = crypto.createHash(request.params.algorithm);
  dataProvider(_.bind(hasher.update, hasher), function() {
    var hashBuffer = hasher.digest();
    response.send({
      'hex'    : hashBuffer.toString('hex'),
      'base64' : hashBuffer.toString('base64')
    });
    return next();
  });
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
