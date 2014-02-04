var _   = require('underscore');
var oct = require('../../../src/lib/numbers/oct.js');
var errors = require('../../../src/lib/errors.js');

exports.errroneous = function(test) {
  _.each([oct.to.bin, oct.to.oct, oct.to.dec, oct.to.hex], function (fn) {
    test.throws(_.bind(fn, {}, '8'), errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '11001f'), errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '-1'), errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '78'), errors.InvalidArgument);
    test.throws(_.bind(fn, {}, 'a8'), errors.InvalidArgument);
    test.throws(_.bind(fn, {}, '100q'), errors.InvalidArgument);
  });
  test.done();
};

exports.toBinBasic = function(test) {
  test.equals(oct.to.bin('0'),    '0');
  test.equals(oct.to.bin('1'),    '1');
  test.equals(oct.to.bin('7'),    '111');
  test.equals(oct.to.bin('10'),   '1000');
  test.equals(oct.to.bin('100'),  '1000000')
  test.equals(oct.to.bin('02'),   '10')
  test.equals(oct.to.bin('0001'), '1')
  test.equals(oct.to.bin(new Array(24 + 1).join('7')), new Array(3 * 24 + 1).join('1'));
  test.done();
};

exports.toOctBasic = function(test) {
  test.equals(oct.to.oct('0'),            '0');
  test.equals(oct.to.oct('1'),            '1');
  test.equals(oct.to.oct('7'),            '7');
  test.equals(oct.to.oct('10'),           '10');
  test.equals(oct.to.oct('0010'),         '10');
  test.equals(oct.to.oct('000777'),       '777');
  test.equals(oct.to.oct('16253'),        '16253');
  test.equals(oct.to.oct('01000000'),     '1000000');
  test.equals(oct.to.oct('170110210130'), '170110210130');
  test.equals(oct.to.oct(new Array(24 + 1).join('7')), new Array(24 + 1).join('7'));
  test.done();
};

exports.toDecBasic = function(test) {
  test.equals(oct.to.dec('0'),    '0');
  test.equals(oct.to.dec('1'),    '1');
  test.equals(oct.to.dec('7'),    '7');
  test.equals(oct.to.dec('10'),   '8');
  test.equals(oct.to.dec('11'),   '9');
  test.equals(oct.to.dec('0002'), '2');
  test.equals(oct.to.dec('0001'), '1');
  test.equals(oct.to.dec('143'),  '99');
  test.equals(oct.to.dec('144'),  '100');
  test.equals(oct.to.dec('6666'), '3510')
  test.equals(oct.to.dec(new Array(24 + 1).join('7')), '4722366482869645213695');
  test.equals(oct.to.dec(new Array(28 + 1).join('7')), '19342813113834066795298815');
  test.done();
};

exports.toHexBasic = function(test) {
  test.equals(oct.to.hex('0'),    '0');
  test.equals(oct.to.hex('1'),    '1');
  test.equals(oct.to.hex('7'),    '7');
  test.equals(oct.to.hex('10'),   '8');
  test.equals(oct.to.hex('11'),   '9');
  test.equals(oct.to.hex('12'),   'a');
  test.equals(oct.to.hex('17'),   'f');
  test.equals(oct.to.hex('20'),   '10');
  test.equals(oct.to.hex('0001'), '1');
  test.equals(oct.to.hex('377'),  'ff');
  test.equals(oct.to.hex('777'),  '1ff');
  test.equals(oct.to.hex('400'),  '100');
  test.equals(oct.to.hex('6666'), 'db6');
  test.equals(oct.to.hex(new Array(24 + 1).join('7')), new Array(18 + 1).join('f'));
  test.done();
};
