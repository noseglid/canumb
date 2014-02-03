var api = require('../helpers/api.js');
var _   = require('underscore');

/**
 * Tests here are only to test the interface.
 * Actual functionality is tested in corresponding unit tests.
 */

exports.testBinary = function(test) {
  api.request(['convert', 'bin', '1111'], 'GET', function(actual, code) {
    test.equals(code, 200);
    test.equals(actual.bin.standard, '1111');
    test.equals(actual.oct.standard, '17');
    test.equals(actual.dec.standard, '15');
    test.equals(actual.hex.standard, 'f');
    test.done();
  });
}

exports.testInvalidBinary = function(test) {
  var done = _.after(2, test.done);
  api.request(['convert', 'bin', '2'], 'GET', function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });

  api.request(['convert', 'bin', '113'], 'GET', function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });
}

exports.testOctal = function(test) {
  api.request(['convert', 'oct', '77'], 'GET', function(actual, code) {
    test.equals(code, 200);
    test.equals(actual.bin.standard, '111111');
    test.equals(actual.oct.standard, '77');
    test.equals(actual.dec.standard, '63');
    test.equals(actual.hex.standard, '3f');
    test.done();
  });
}

exports.testInvalidOctal = function(test) {
  var done = _.after(2, test.done);
  api.request(['convert', 'oct', '8'], 'GET', function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });

  api.request(['convert', 'oct', '08'], 'GET', function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });
}

exports.testDecimal = function(test) {
  api.request(['convert', 'dec', '99'], 'GET', function(actual, code) {
    test.equals(code, 200);
    test.equals(actual.bin.standard, '1100011');
    test.equals(actual.oct.standard, '143');
    test.equals(actual.dec.standard, '99');
    test.equals(actual.hex.standard, '63');
    test.done();
  });
}

exports.testInvalidDecimal = function(test) {
  var done = _.after(2, test.done);
  api.request(['convert', 'dec', 'a'], 'GET', function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });

  api.request(['convert', 'oct', '1q'], 'GET', function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });
}

exports.testHexadecimal = function(test) {
  api.request(['convert', 'hex', 'ff'], 'GET', function(actual, code) {
    test.equals(code, 200);
    test.equals(actual.bin.standard, '11111111');
    test.equals(actual.oct.standard, '377');
    test.equals(actual.dec.standard, '255');
    test.equals(actual.hex.standard, 'ff');
    test.done();
  });
}

exports.testInvalidHexadecimal = function(test) {
  var done = _.after(2, test.done);
  api.request(['convert', 'dec', 'g'], 'GET', function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });

  api.request(['convert', 'oct', '1h'], 'GET', function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });
}
