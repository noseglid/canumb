var _ = require('underscore');

var bin     = require('./bin.js');
var dec     = require('./dec.js');
var numhelp = require('./numhelp.js');

function oct2bin(number)
{
  return _.map(number.split(''), function(value, key, list) {
    return numhelp.lookup('oct', 'bin', value);
  }).join('');
}

function oct2oct(number)
{
  return number;
}

function oct2dec(number)
{
  return dec.from.any(8, number);
}

function oct2hex(number)
{
  return bin.to.hex(oct2bin(number));
}

exports.to = {
  bin : oct2bin,
  oct : oct2oct,
  dec : oct2dec,
  hex : oct2hex
};
