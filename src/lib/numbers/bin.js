var _ = require('underscore');

var numhelp = require('./numhelp.js');
var hex     = require('./hex.js');
var errors  = require('../errors.js');

function validate(number)
{
  if (number.length < 1 || number.match(/[^01]/)) {
    throw new errors.InvalidArgument('Invalid binary number: ' + number);
  }
}

function groupBinary(count, number)
{
  var lengthWithPadding = Math.ceil(number.length / count) * count;
  var padded = numhelp.pad(lengthWithPadding, number);

  return padded.match(new RegExp('.{' + count + '}', 'g'), padded);
}

function bin2bin(number)
{
  validate(number);
  return numhelp.unpad(number);
}

function bin2oct(number)
{
  validate(number);
  return numhelp.unpad(_.map(groupBinary(3, number), function(value) {
    return numhelp.lookup('bin', 'oct', value);
  }).join(''));
}

function bin2dec(number)
{
  validate(number);
  return hex.to.dec(bin2hex(number));
}

function bin2hex(number)
{
  validate(number);
  return numhelp.unpad(_.map(groupBinary(4, number), function(value) {
    return numhelp.lookup('bin', 'hex', value);
  }).join(''));
}

function groupFormat(count, number)
{
  return groupBinary(count, number).join(' ');
}

exports.to = {
  bin : bin2bin,
  oct : bin2oct,
  dec : bin2dec,
  hex : bin2hex
};

exports.format = {
  group : groupFormat,
};
