var _ = require('underscore');

var numhelp = require('./numhelp.js');
var dec     = require('./dec.js');

function groupBinary(count, number)
{
  var ret = [];
  var ctx = { current : ''};

  _.each(number.split('').reverse(), function(element, index, list) {
    this.current = element + this.current;
    if (count - 1 === index % count) {
      ret.push(this.current); /* No need to pad here */
      this.current = '';
    }
  }, ctx);

  ret.push(numhelp.pad(count, ctx.current));
  return ret.reverse();
}

function bin2bin(number)
{
  return number;
}

function bin2oct(number)
{
  return _.map(groupBinary(3, number), function(value, key, list) {
    return numhelp.lookup('bin', 'oct', value);
  }).join('');
}

function bin2dec(number)
{
  return dec.from.any(2, number);
}

function bin2hex(number)
{
  return _.map(groupBinary(4, number), function(value, key, list) {
    return numhelp.lookup('bin', 'hex', value);
  }).join('');
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
  group : _.bind(groupFormat, {}),
};
