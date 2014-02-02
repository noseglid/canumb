var _ = require('underscore');

var bin     = require('./bin.js');
var dec     = require('./dec.js');
var numhelp = require('./numhelp.js');
var errors = require('../errors.js');

function validate(number)
{
  if (number.length < 1 || number.match(/[^0123456789abcdef]/)) {
    throw new errors.InvalidArgument('Invalid hexadecimal number: ' + number);
  }
}

function hex2bin(number)
{
  number = number.toLowerCase();
  validate(number);
  return numhelp.unpad(_.map(number.split(''), function(value) {
    return numhelp.lookup('hex', 'bin', value);
  }).join(''));
}

function hex2oct(number)
{
  number = number.toLowerCase();
  validate(number);
  return numhelp.unpad(bin.to.oct(hex2bin(number.toLowerCase())));
}

function hex2dec(number)
{
  number = number.toLowerCase();
  validate(number);
  return numhelp.unpad(dec.from.any(16, number));
}

function hex2hex(number)
{
  number = number.toLowerCase();
  validate(number);
  return numhelp.unpad(number);
}

exports.to = {
  bin : hex2bin,
  oct : hex2oct,
  dec : hex2dec,
  hex : hex2hex
}
