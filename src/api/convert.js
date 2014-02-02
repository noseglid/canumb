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
  try {
    var result = {};
    switch(request.params.format) {
    case 'bin': result = convert(bin, request.params.number);               break;
    case 'oct': result = convert(oct, request.params.number);               break;
    case 'dec': result = convert(dec, request.params.number);               break;
    case 'hex': result = convert(hex, request.params.number.toLowerCase()); break;

    default:
      throw new errors.InvalidArgument("Format not supported: \'" + request.params.format + '\'');
      break;

    };

    response.send(result);
    return next();

  } catch (error) {
    if (!(error instanceof errors.Error)) {
      throw error;
    }

    return next(new restify.RestError(error));
  }
}

exports.params = [ 'format', 'number' ];
exports.entry = api;
