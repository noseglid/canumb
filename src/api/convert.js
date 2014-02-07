var bin    = require('../lib/numbers/bin.js');
var oct    = require('../lib/numbers/oct.js');
var dec    = require('../lib/numbers/dec.js');
var hex    = require('../lib/numbers/hex.js');
var errors = require('../lib/errors.js');

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
  if (!request.body.number) {
    throw new errors.MissingArgument('No number supplied.');
  }

  if (1000 < request.body.number.length) {
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

exports.method = 'post';
exports.params = [ 'base' ];
exports.entry  = api;
