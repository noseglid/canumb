var errors = require('../lib/errors.js');
var base85 = require('base85');

function base64(data)
{
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
    return { 'utf8' : decodeURIComponent(data) };
  } catch (e) {
    throw new errors.InvalidArgument("Unable to decode uri: " + data);
  }
}

function fnbase85(data)
{
  /* Ignore leading and trailing white spaces for easier verification */
  data = data.trim();

  if (data[0]               !== '<' ||
      data[1]               !== '~' ||
      data[data.length - 2] !== '~' ||
      data[data.length - 1] !== '>') {
    throw new errors.InvalidArgument("Base85 data must be enclosed by '<~' and '~>'.");
  }

  var re =
    /[^\n !"#$%&'()*+,\-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\]\^_`abcdefghijklmnopqrstu]/;
  if (re.test(data.slice(2, -2))) {
    throw new errors.InvalidArgument('Invalid characters in base85 data.');
  }

  var decoded = base85.decode(data);
  if (false === decoded) {
    throw new errors.InvalidArgument('Failed to decode base85 data.');
  }

  return { 'utf8' : decoded.toString('utf8') };
}


function api(request, response, next)
{
  if (typeof request.body !== 'object' || !request.body.data) {
    throw new errors.MissingArgument('No data provided.');
  }

  var handler;
  switch(request.params.algorithm) {
  case 'base64':
    handler = base64;
    break;

  case 'uri':
    handler = uri;
    break;

  case 'base85':
    handler = fnbase85;
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

exports.api = 'decode';

exports.method = 'post';

exports.rest = [
  {
    'name'        : 'algorithm',
    'description' : 'The algorithm with which supplied data should be decoded.',
    'valid'       : [ 'base64', 'uri', 'base85' ]
  }
];

exports.doc = {};

exports.doc.input = [
  {
    'name'        : 'data',
    'type'        : 'string',
    'description' : 'The data to decode.'
  }
];

exports.doc.description = 'Decodes data using a specified algorithm.';

exports.doc.errors = [
  {
    'type' : errors.InvalidArgument,
    'description' : 'Thrown if the algorithm is invalid, or the supplied ' +
                    'data can not be decoded with the chosen algorithm.'
  },
  {
    'type' : errors.MissingArgument,
    'description' : 'Thrown if no data to encode is supplied.'
  }
];

exports.entry = [
  require('restify').bodyParser({
    'mapParams' : false,
    'maxBodySize' : 1024 * 1024 * 2 /* Max 2 MB. should be plenty. */
  }),
  api
];
