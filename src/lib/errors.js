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

util.inherits(InvalidArgument, Error);

module.exports.Error           = Error;
module.exports.InvalidArgument = InvalidArgument;
