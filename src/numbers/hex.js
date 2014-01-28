var _ = require('underscore');

var bin     = require('./bin.js');
var dec     = require('./dec.js');
var numhelp = require('./numhelp.js');

function hex2bin(number)
{
  return _.map(number.split(''), function(value, key, list) {
    return numhelp.lookup('hex', 'bin', value);
  }).join('');
}

function hex2oct(number)
{
  return bin.to.oct(hex2bin(number));
}

function hex2dec(number)
{
  return dec.from.any(16, number);
}

function hex2hex(number)
{
  return number;
}

exports.to = {
  bin : hex2bin,
  oct : hex2oct,
  dec : hex2dec,
  hex : hex2hex
}
