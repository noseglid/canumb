var _ = require('underscore');

var bin     = require('./bin.js');
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

  var add = function(ix, iy) {
    var c = 0, r = [];
    var x = ix.split('').map(Number);
    var y = iy.split('').map(Number);

    while (x.length || y.length) {
      var s = (x.pop() || 0) + (y.pop() || 0) + c;
      r.unshift((s < 10) ? s : s - 10);
      c = (s < 10) ? 0 : 1;
    }
    if (c)
      r.unshift(c);
    return r.join('');
  };

  var decimal = '0';
  _.each(number.split(''), function(c) {
    var n = parseInt(c, 16);
    for (var t = 8; t; t >>= 1) {
      decimal = add(decimal, decimal);
      if (n & t) decimal = add(decimal, '1');
    }
  });

  return decimal;
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
};
