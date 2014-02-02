var _   = require('underscore');
var dec = require('../../../src/lib/numbers/dec.js');
var errors = require('../../../src/lib/errors.js');

exports.errroneous = function(test) {
  _.each([dec.to.bin, dec.to.oct, dec.to.dec, dec.to.hex], function (fn) {
    test.throws(_.bind(fn, {}, 'a'),      errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '11001f'), errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '-1'),     errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '100a'),   errors.InvalidArgument);
    test.throws(_.bind(fn, {}, 'a8'),     errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '100q'),   errors.InvalidArgument);
  });
  test.done();
};

exports.toBinBasic = function(test) {
  test.equals(dec.to.bin('0'),    '0');
  test.equals(dec.to.bin('1'),    '1');
  test.equals(dec.to.bin('7'),    '111');
  test.equals(dec.to.bin('10'),   '1010');
  test.equals(dec.to.bin('100'),  '1100100')
  test.equals(dec.to.bin('02'),   '10')
  test.equals(dec.to.bin('0001'), '1')
  test.done();
};

exports.toOctBasic = function(test) {
  test.equals(dec.to.oct('0'),        '0');
  test.equals(dec.to.oct('1'),        '1');
  test.equals(dec.to.oct('7'),        '7');
  test.equals(dec.to.oct('8'),        '10');
  test.equals(dec.to.oct('10'),       '12');
  test.equals(dec.to.oct('0010'),     '12');
  test.equals(dec.to.oct('63'),       '77');
  test.equals(dec.to.oct('64'),       '100');
  test.equals(dec.to.oct('000777'),   '1411');
  test.equals(dec.to.oct('16253'),    '37575');
  test.equals(dec.to.oct('01000000'), '3641100');
  test.done();
};

exports.toDecBasic = function(test) {
  test.equals(dec.to.dec('0'),    '0');
  test.equals(dec.to.dec('000'),  '0');
  test.equals(dec.to.dec('1'),    '1');
  test.equals(dec.to.dec('7'),    '7');
  test.equals(dec.to.dec('9'),    '9');
  test.equals(dec.to.dec('10'),   '10');
  test.equals(dec.to.dec('0002'), '2');
  test.equals(dec.to.dec('0001'), '1');
  test.equals(dec.to.dec('99'),   '99');
  test.equals(dec.to.dec('100'),  '100');
  test.equals(dec.to.dec('6666'), '6666')
  test.done();
};

exports.toHexBasic = function(test) {
  test.equals(dec.to.hex('0'),    '0');
  test.equals(dec.to.hex('1'),    '1');
  test.equals(dec.to.hex('7'),    '7');
  test.equals(dec.to.hex('10'),   'a');
  test.equals(dec.to.hex('11'),   'b');
  test.equals(dec.to.hex('12'),   'c');
  test.equals(dec.to.hex('17'),   '11');
  test.equals(dec.to.hex('255'),  'ff');
  test.equals(dec.to.hex('256'),  '100');
  test.equals(dec.to.hex('0001'), '1');
  test.equals(dec.to.hex('0010'), 'a');
  test.equals(dec.to.hex('400'),  '190');
  test.equals(dec.to.hex('6666'), '1a0a');
  test.done();
};
