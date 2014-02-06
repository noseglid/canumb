var util = require('util');

function Error(message, statusCode, restCode)
{
  this.message    = message;    /* A descriptive error message */
  this.statusCode = statusCode; /* The HTTP error code */
  this.restCode   = restCode;   /* An easy-to-read REST error */
};

function InvalidArgument(message)
{
  Error.call(this, message, 400, 'InvalidArgument');
}

function MissingArgument(message)
{
  Error.call(this, message, 400, 'MissingArgument');
}

function TooLarge(message)
{
  Error.call(this, message, 413, 'RequestEntityTooLarge');
}

util.inherits(InvalidArgument, Error);
util.inherits(MissingArgument, Error);
util.inherits(TooLarge, Error);

module.exports.Error           = Error;
module.exports.InvalidArgument = InvalidArgument;
module.exports.MissingArgument = MissingArgument;
module.exports.TooLarge        = TooLarge;
