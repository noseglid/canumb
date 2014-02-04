var _ = require('underscore');

var errors  = require('../errors.js');
var hex     = require('./hex.js');
var numhelp = require('./numhelp.js');

function validate(number)
{
  if (number.length < 1 || number.match(/[^0123456789]/)) {
    throw new errors.InvalidArgument('Invalid decimal number: ' + number);
  }
}

function dec2bin(number)
{
  validate(number);
  return numhelp.unpad(hex.to.bin(dec2hex(number)));
}

function dec2oct(number)
{
  validate(number);
  return numhelp.unpad(hex.to.oct(dec2hex(number)));
}

function dec2dec(number)
{
  validate(number);
  return numhelp.unpad(number);
}

function dec2hex(number)
{
  validate(number);

  var array = number.split('').map(Number).reverse();

  var mult = function(scalar, x) {
    if (0 === scalar) return [];

    var result = [];
    var power  = x;
    while (true) {
      if (scalar & 1) {
        result = add(result, power);
      }
      if (0 === (scalar = (scalar >> 1))) break;
      power = add(power, power);
    }

    return result;
  };


  var add = function(x, y) {
    var ret = [], c = 0;
    x = x.slice(0); /* Copy to allow same value for x and y */
    y = y.slice(0); /* Copy to allow same value for x and y */
    while (0 < x.length || 0 < y.length || c) {
      var o = (x.shift() || 0) + (y.shift() || 0) + c;
      ret.push(o % 16);
      c = Math.floor(o / 16);
    }

    return ret;
  };

  var result = [ 0 ], power = [ 1 ];
  _.each(array, function(digit) {
    if (digit > 0) result = add(result, mult(digit, power));
    power = mult(10, power);
  });

  return result.reverse().map(function(digit) { return digit.toString(16); }).join('');
}

exports.to = {
  bin : dec2bin,
  oct : dec2oct,
  dec : dec2dec,
  hex : dec2hex
};
