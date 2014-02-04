var _ = require('underscore');

var bin     = require('./bin.js');
var hex     = require('./hex.js');
var numhelp = require('./numhelp.js');
var errors = require('../errors.js');

function validate(number)
{
  if (number.length < 1 || number.match(/[^01234567]/)) {
    throw new errors.InvalidArgument('Invalid octal number: ' + number);
  }
}

function oct2bin(number)
{
  validate(number);
  return numhelp.unpad(_.map(number.split(''), function(value) {
    return numhelp.lookup('oct', 'bin', value);
  }).join(''));
}

function oct2oct(number)
{
  validate(number);
  return numhelp.unpad(number);
}

function oct2dec(number)
{
  validate(number);
  return numhelp.unpad(hex.to.dec(oct2hex(number)));
}

function oct2hex(number)
{
  validate(number);
  return numhelp.unpad(bin.to.hex(oct2bin(number)));
}

exports.to = {
  bin : oct2bin,
  oct : oct2oct,
  dec : oct2dec,
  hex : oct2hex
};
