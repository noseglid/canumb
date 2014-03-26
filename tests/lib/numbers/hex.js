var _   = require('underscore');
var hex = require('../../../src/lib/numbers/hex.js');
var errors = require('../../../src/lib/errors.js');

exports.errroneous = function(test) {
  _.each([hex.to.bin, hex.to.oct, hex.to.dec, hex.to.hex], function (fn) {
    test.throws(_.bind(fn, {}, 'g'),     errors.InvalidArgument);
    test.throws(_.bind(fn, {}, 'bonk'),  errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '-1'),    errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '12-67'), errors.InvalidArgument);
    test.throws(_.bind(fn, {}, 'bfq'),   errors.InvalidArgument);
    test.throws(_.bind(fn, {}, 'qbf'),   errors.InvalidArgument);
  });
  test.done();
};

exports.toBinBasic = function(test) {
  test.equals(hex.to.bin('0'),    '0');
  test.equals(hex.to.bin('1'),    '1');
  test.equals(hex.to.bin('7'),    '111');
  test.equals(hex.to.bin('a'),    '1010');
  test.equals(hex.to.bin('f'),    '1111');
  test.equals(hex.to.bin('1f'),   '11111');
  test.equals(hex.to.bin('0001'), '1');
  test.equals(hex.to.bin('000a'), '1010');
  test.equals(hex.to.bin('ffffffffffffffffff'), new Array(72 + 1).join('1'));
  test.done();
};

exports.toOctBasic = function(test) {
  test.equals(hex.to.oct('0'),        '0');
  test.equals(hex.to.oct('1'),        '1');
  test.equals(hex.to.oct('2'),        '2');
  test.equals(hex.to.oct('3'),        '3');
  test.equals(hex.to.oct('4'),        '4');
  test.equals(hex.to.oct('5'),        '5');
  test.equals(hex.to.oct('6'),        '6');
  test.equals(hex.to.oct('7'),        '7');
  test.equals(hex.to.oct('8'),        '10');
  test.equals(hex.to.oct('9'),        '11');
  test.equals(hex.to.oct('a'),        '12');
  test.equals(hex.to.oct('A'),        '12');
  test.equals(hex.to.oct('b'),        '13');
  test.equals(hex.to.oct('B'),        '13');
  test.equals(hex.to.oct('c'),        '14');
  test.equals(hex.to.oct('C'),        '14');
  test.equals(hex.to.oct('d'),        '15');
  test.equals(hex.to.oct('D'),        '15');
  test.equals(hex.to.oct('e'),        '16');
  test.equals(hex.to.oct('E'),        '16');
  test.equals(hex.to.oct('f'),        '17');
  test.equals(hex.to.oct('F'),        '17');
  test.equals(hex.to.oct('10'),       '20');
  test.equals(hex.to.oct('0010'),     '20');
  test.equals(hex.to.oct('3f'),       '77');
  test.equals(hex.to.oct('3F'),       '77');
  test.equals(hex.to.oct('40'),       '100');
  test.equals(hex.to.oct('000309'),   '1411');
  test.equals(hex.to.oct('01000000'), '100000000');
  test.equals(hex.to.oct(new Array(18 + 1).join('f')), new Array(24 + 1).join('7'));
  test.done();
};

exports.toDecBasic = function(test) {
  test.equals(hex.to.dec('0'),    '0');
  test.equals(hex.to.dec('000'),  '0');
  test.equals(hex.to.dec('1'),    '1');
  test.equals(hex.to.dec('7'),    '7');
  test.equals(hex.to.dec('9'),    '9');
  test.equals(hex.to.dec('a'),    '10');
  test.equals(hex.to.dec('0002'), '2');
  test.equals(hex.to.dec('0001'), '1');
  test.equals(hex.to.dec('63'),   '99');
  test.equals(hex.to.dec('64'),   '100');
  test.equals(hex.to.dec('ff'),   '255');
  test.equals(hex.to.dec('6666'), '26214');
  test.equals(hex.to.dec('12345678909876543'), '20988295476698113347');
  test.equals(hex.to.dec('ffffffffffffffffff'), '4722366482869645213695');
  test.done();
};

exports.toHexBasic = function(test) {
  test.equals(hex.to.hex('0'),    '0');
  test.equals(hex.to.hex('1'),    '1');
  test.equals(hex.to.hex('7'),    '7');
  test.equals(hex.to.hex('a'),    'a');
  test.equals(hex.to.hex('b'),    'b');
  test.equals(hex.to.hex('c'),    'c');
  test.equals(hex.to.hex('11'),   '11');
  test.equals(hex.to.hex('ff'),   'ff');
  test.equals(hex.to.hex('FF'),   'ff');
  test.equals(hex.to.hex('256'),  '256');
  test.equals(hex.to.hex('0001'), '1');
  test.equals(hex.to.hex('0010'), '10');
  test.equals(hex.to.hex('400'),  '400');
  test.equals(hex.to.hex('6666'), '6666');
  test.equals(hex.to.hex('ffffffffffffffffff'), 'ffffffffffffffffff');
  test.done();
};
