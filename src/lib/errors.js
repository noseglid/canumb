var util = require('util');

function APIError(message, statusCode, restCode)
{
  this.statusCode = statusCode; /* The HTTP error code */
  this.restCode   = restCode;   /* An easy-to-read REST error */
  this.message    = message;
};

/* Funky inheritance since 'Error' constructor
   returns instance rather than manipulatiing 'this' */
APIError.prototype = new Error();
APIError.prototype.constructor = APIError;
APIError.prototype.name = 'APIError';

function InvalidArgument(message)
{
  InvalidArgument.super_.call(this, message, 400, 'InvalidArgument');
}

function MissingArgument(message)
{
  MissingArgument.super_.call(this, message, 400, 'MissingArgument');
}

function TooLarge(message)
{
  TooLarge.super_.call(this, message, 413, 'RequestEntityTooLarge');
}

function InternalServerError(message)
{
  InternalServerError.super._call(this, 500, 'InternalServerError');
}

util.inherits(InvalidArgument, APIError);
util.inherits(MissingArgument, APIError);
util.inherits(TooLarge,        APIError);

module.exports.Error           = Error;
module.exports.APIError        = APIError;
module.exports.InvalidArgument = InvalidArgument;
module.exports.MissingArgument = MissingArgument;
module.exports.TooLarge        = TooLarge;
