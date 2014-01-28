var errors = require('../errors.js');

function lookup(input, output, key) {
  var table = {
    'hex' : {
      'bin' : {
        '0' : '0000',
        '1' : '0001',
        '2' : '0010',
        '3' : '0011',
        '4' : '0100',
        '5' : '0101',
        '6' : '0110',
        '7' : '0111',
        '8' : '1000',
        '9' : '1001',
        'a' : '1010',
        'b' : '1011',
        'c' : '1100',
        'd' : '1101',
        'e' : '1110',
        'f' : '1111'
      },
    },

    'bin' : {
      'oct' : {
        '000' : '0',
        '001' : '1',
        '010' : '2',
        '011' : '3',
        '100' : '4',
        '101' : '5',
        '110' : '6',
        '111' : '7'
      },
      'hex' : {
        '0000' : '0',
        '0001' : '1',
        '0010' : '2',
        '0011' : '3',
        '0100' : '4',
        '0101' : '5',
        '0110' : '6',
        '0111' : '7',
        '1000' : '8',
        '1001' : '9',
        '1010' : 'a',
        '1011' : 'b',
        '1100' : 'c',
        '1101' : 'd',
        '1110' : 'e',
        '1111' : 'f'
      }
    },

    'oct' : {
      'bin' : {
        '0' : '000',
        '1' : '001',
        '2' : '010',
        '3' : '011',
        '4' : '100',
        '5' : '101',
        '6' : '110',
        '7' : '111'
      }
    }
  };

  if ('undefined' === typeof(table[input]) ||
      'undefined' === typeof(table[input][output]) ||
      'undefined' === typeof(table[input][output][key]))
    throw new errors.InvalidArgument(
      'Invalid input number \'' + key + '\' when interpreted as \'' + input + '\'');

  return table[input][output][key];
}

function pad(width, number)
{
  return Array(1 + width - number.length).join('0') + number;
}

exports.lookup = lookup;
exports.pad    = pad;
