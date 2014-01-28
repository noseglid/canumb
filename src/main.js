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
  return {
    'bin' : from.to.bin(number),
    'dec' : from.to.dec(number),
    'oct' : from.to.oct(number),
    'hex' : from.to.hex(number)
  };
}

function munch(request, response, next)
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
  'version' : '1.0.0'
});

server.pre(restify.pre.userAgentConnection());

server.get('/:format/:number', munch);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
})

server.on('uncaughtException', function(request, response, route, error) {
  throw error;
});
