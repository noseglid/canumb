var bin    = require('../lib/numbers/bin.js');
var oct    = require('../lib/numbers/oct.js');
var dec    = require('../lib/numbers/dec.js');
var hex    = require('../lib/numbers/hex.js');
var errors = require('../lib/errors.js');

var digitMax = 1000;

function convert(from, number)
{
  var binaryRep      = from.to.bin(number);
  var decimalRep     = from.to.dec(number);
  var octalRep       = from.to.oct(number);
  var hexadecimalRep = from.to.hex(number);
  return {
    'bin' : {
      'standard' : binaryRep,
      'group3'   : bin.format.group(3, binaryRep),
      'group4'   : bin.format.group(4, binaryRep),
      'group8'   : bin.format.group(8, binaryRep),
      'group16'  : bin.format.group(16, binaryRep)
    },
    'dec' : {
      'standard' : decimalRep
    },
    'oct' : {
      'standard' : octalRep
    },
    'hex' : {
      'standard' : hexadecimalRep
    }
  };
}

function api(request, response, next)
{
  if (!request.body || !request.body.number) {
    throw new errors.MissingArgument('No number supplied.');
  }

  if (digitMax < request.body.number.length) {
    throw new errors.TooLarge("Number can't be more than 1000 digits.");
  }

  var result = {};

  switch(request.params.base) {
  case 'bin': result = convert(bin, request.body.number);               break;
  case 'oct': result = convert(oct, request.body.number);               break;
  case 'dec': result = convert(dec, request.body.number);               break;
  case 'hex': result = convert(hex, request.body.number.toLowerCase()); break;

  default:
    throw new errors.InvalidArgument(
      "Base not supported: '" + request.params.base + "'"
    );
    break;

  };

  response.send(result);
  return next();
}

exports.api = 'convert';

exports.method = 'post';

exports.rest = [
  {
    'name'        : 'base',
    'description' : 'The base which the input data is in',
    'valid'       : [ 'bin', 'oct', 'dec', 'hex' ]
  }
];

exports.doc = {};

exports.doc.input = [
  {
    'name'        : 'number',
    'type'        : 'string',
    'description' : 'The number which should be converted. ' +
                    'Note that it should be supplied as a string ' +
                    'so precision is not lost with large numbers.'
  }
];

exports.doc.description =
  'Convert numbers between various bases. Supported bases are 2 (binary), ' +
  '8 (octal), 10 (decimal), 16 (hexadecimal). The conversion is performed ' +
  'with arbitrary precision, meaning it can take a number of any size and ' +
  'persist absolute accuracy in its conversions. This approach, however, ' +
  'is very slow. But you\'d rather have accuracy than speed, right? To not ' +
  'choke the server an upper limit of 1000 digits is enforced.';

exports.doc.errors = [
  {
    'type'        : errors.MissingArgument,
    'description' : 'Thrown if no number is supplied.'
  },
  {
    'type'        : errors.TooLarge,
    'description' : 'Thrown if the number is more than ' + digitMax + ' digits.'
  },
  {
    'type'        : errors.InvalidArgument,
    'description' : 'Thrown if an unknown base is supplied.'
  }
]

exports.entry  = api;
