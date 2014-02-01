var _   = require('underscore');
var bin = require('../../src/numbers/bin.js');
var errors = require('../../src/errors.js');

exports.errroneous = function(test) {
  _.each([bin.to.bin, bin.to.oct, bin.to.dec, bin.to.hex], function (fn) {
    test.throws(_.bind(fn, {}, '2'),      errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '11002'),  errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '01013'),  errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '11001f'), errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '-1'),     errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '78'),     errors.InvalidArgument);
    test.throws(_.bind(fn, {}, 'a8'),     errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '100q'),   errors.InvalidArgument);
  });
  test.done();
};

exports.toBinBasic = function(test) {
  test.equals(bin.to.bin('0'),        '0');
  test.equals(bin.to.bin('1'),        '1');
  test.equals(bin.to.bin('1101'),     '1101');
  test.equals(bin.to.bin('11100101'), '11100101');
  test.equals(bin.to.bin('0001'),     '1');
  test.equals(bin.to.bin('00100101'), '100101');
  test.done();
};

exports.toOctBasic = function(test) {
  test.equals(bin.to.oct('0'),            '0');
  test.equals(bin.to.oct('1'),            '1');
  test.equals(bin.to.oct('111'),          '7');
  test.equals(bin.to.oct('1000'),         '10');
  test.equals(bin.to.oct('0010'),         '2');
  test.equals(bin.to.oct('0001'),         '1');
  test.equals(bin.to.oct('00111111'),     '77');
  test.equals(bin.to.oct('01000000'),     '100');
  test.equals(bin.to.oct('110110110110'), '6666');
  test.done();
};

exports.toDecBasic = function(test) {
  test.equals(bin.to.dec('0'),            '0');
  test.equals(bin.to.dec('1'),            '1');
  test.equals(bin.to.dec('111'),          '7');
  test.equals(bin.to.dec('1000'),         '8');
  test.equals(bin.to.dec('1001'),         '9');
  test.equals(bin.to.dec('1010'),         '10');
  test.equals(bin.to.dec('0010'),         '2');
  test.equals(bin.to.dec('0001'),         '1');
  test.equals(bin.to.dec('01100011'),     '99');
  test.equals(bin.to.dec('01100100'),     '100');
  test.equals(bin.to.dec('110110110110'), '3510')
  test.done();
};

exports.toHexBasic = function(test) {
  test.equals(bin.to.hex('0'),            '0');
  test.equals(bin.to.hex('1'),            '1');
  test.equals(bin.to.hex('111'),          '7');
  test.equals(bin.to.hex('1000'),         '8');
  test.equals(bin.to.hex('1001'),         '9');
  test.equals(bin.to.hex('1010'),         'a');
  test.equals(bin.to.hex('1111'),         'f');
  test.equals(bin.to.hex('0010'),         '2');
  test.equals(bin.to.hex('0001'),         '1');
  test.equals(bin.to.hex('11111111'),     'ff');
  test.equals(bin.to.hex('100000000'),    '100');
  test.equals(bin.to.hex('110110110110'), 'db6');
  test.done();
};
