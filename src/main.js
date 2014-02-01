var fs      = require('fs');
var restify = require('restify');

var bin    = require('./numbers/bin.js');
var oct    = require('./numbers/oct.js');
var dec    = require('./numbers/dec.js');
var hex    = require('./numbers/hex.js');
var errors = require('./errors.js');

/* Allows port to be set through environment, e.g. Heroku does this. */
var port = Number(process.env.PORT || 5000);

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

var server = restify.createServer({
  'name'    : 'canumb server',
  'version' : '0.0.1'
});

server.pre(restify.pre.userAgentConnection());

server.get('/convert/:format/:number', api);

server.get(/^\/?.*/, restify.serveStatic({
  'default'   : 'index.html',
  'directory' : './public'
}));

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
})

server.on('uncaughtException', function(request, response, route, error) {
  throw error;
});
