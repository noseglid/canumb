var api = require('../helpers/api.js');
var _   = require('underscore');

/**
 * Tests here are only to test the interface.
 * Actual functionality is tested in corresponding unit tests.
 */

exports.testBinary = function(test) {
  api.request(['convert', 'bin'], 'POST', { 'number' : '1111' }, function(actual, code) {
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
  api.request(['convert', 'bin'], 'POST', { 'number' : '2' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });

  api.request(['convert', 'bin'], 'POST', { 'number' : '113' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });
}

exports.testOctal = function(test) {
  api.request(['convert', 'oct'], 'POST', { 'number' : '77' }, function(actual, code) {
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
  api.request(['convert', 'oct'], 'POST', { 'number' : '8' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });

  api.request(['convert', 'oct'], 'POST', { 'number' : '08' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });
}

exports.testDecimal = function(test) {
  api.request(['convert', 'dec'], 'POST', { 'number' : '99' }, function(actual, code) {
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
  api.request(['convert', 'dec'], 'POST', { 'number' : 'a' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });

  api.request(['convert', 'oct'], 'POST', { 'number' : '1q' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });
}

exports.testHexadecimal = function(test) {
  api.request(['convert', 'hex'], 'POST', { 'number' : 'ff' }, function(actual, code) {
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
  api.request(['convert', 'dec'], 'POST', { 'number' : 'g' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });

  api.request(['convert', 'oct'], 'POST', { 'number' : '1h' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    done();
  });
}

exports.testMultipart = function(test) {
  api.multipartRequest(['convert', 'dec'], { 'number' : '12' }, function(actual, code) {
    test.equals(code, 200);
    test.equals(actual.bin.standard, '1100');
    test.done();
  });
};

exports.testWWWUrlEncoded = function(test) {
  api.wwwFormRequest(['convert', 'dec'], { 'number' : '12' }, function(actual, code) {
    test.equals(code, 200);
    test.equals(actual.bin.standard, '1100');
    test.done();
  });
};
