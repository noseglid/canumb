var _ = require('underscore');

var bin = require('./bin.js');

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
  var r = parseInt(number, 10);
  var ret = [ r % 2 ];
  while (0 !== (r = Math.floor(r / 2)))
    ret.push(r % 2);

  return ret.reverse().join('');
}

function dec2oct(number)
{
  return bin.to.oct(dec2bin(number));
}

function dec2dec(number)
{
  return number;
}

function dec2hex(number)
{
  return bin.to.hex(dec2bin(number));
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
