var _ = require('underscore');

var errors  = require('../errors.js');
var bin     = require('./bin.js');
var numhelp = require('./numhelp.js');

function validate(number)
{
  if (number.length < 1 || number.match(/[^0123456789]/)) {
    throw new errors.InvalidArgument('Invalid decimal number: ' + number);
  }
}

/* TODO: Support arbitrary length numbers */
function any2dec(base, number)
{
  return '' + _.reduce(number.split(''), function(memo, value, index, list) {
    return memo + parseInt(value, base) * Math.pow(base, --this.it);
  }, 0, { it : number.length });
}

/* TODO: Support arbitrary length numbers */
function dec2bin(number)
{
  validate(number);
  var r = parseInt(number, 10);
  if (isNaN(r))
    throw new errors.InvalidArgument('Invalid input number \'' + number + '\'');

  var ret = [ r % 2 ];
  while (0 !== (r = Math.floor(r / 2)))
    ret.push(r % 2);

  return numhelp.unpad(ret.reverse().join(''));
}

function dec2oct(number)
{
  validate(number);
  return numhelp.unpad(bin.to.oct(dec2bin(number)));
}

function dec2dec(number)
{
  validate(number);
  return numhelp.unpad(number);
}

function dec2hex(number)
{
  validate(number);
  return numhelp.unpad(bin.to.hex(dec2bin(number)));
}

exports.from = {
  any : any2dec
};

exports.to = {
  bin : dec2bin,
  oct : dec2oct,
  dec : dec2dec,
  hex : dec2hex
};
