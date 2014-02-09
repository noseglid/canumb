var _   = require('underscore');
var api = require('../helpers/api.js');

exports.testBase64Decode = function(test) {
  var tests = [
    { 'data' : 'YQ==',            'expected' : 'a' },
    { 'data' : 'w6U=',            'expected' : 'å' },
    { 'data' : 'IA==',            'expected' : ' ' },
    { 'data' : 'YSBtYWdpY2FsIGxhbmQgb2YgZmFpcmllcyBhbmQgZ29ibGlucw==', 'expected' : 'a magical land of fairies and goblins' }
  ];

  test.expect(tests.length);
  var testdonecb = _.after(tests.length, test.done);

  _.each(tests, function(dp) {
    api.request(['decode', 'base64'], 'POST', { 'data' : dp.data }, function(actual) {
      test.equals(actual.utf8, dp.expected);
      testdonecb();
    });
  });
}

exports.testUriDecode = function(test) {
  var tests = [
    { 'data' : 'Chuck%20Norris', 'expected' : 'Chuck Norris' },
    { 'data' : 'a',              'expected' : 'a' },
    { 'data' : '%20',            'expected' : ' ' },
    { 'data' : '%C3%A5',         'expected' : 'å' },
    { 'data' : '%C3%A5%C3%A4%C3%B6%C3%BC%C3%A8!f%E2%86%99%E2%86%AC%E2%9E%BF',   'expected' : 'åäöüè!f↙↬➿' },
  ];

  test.expect(tests.length);
  var testdonecb = _.after(tests.length, test.done);

  _.each(tests, function(dp) {
    api.request(['decode', 'uri'], 'POST',  { 'data' : dp.data }, function(actual) {
      test.equals(actual.utf8, dp.expected);
      testdonecb();
    });
  });
}

exports.testInvalidUriDecode = function(test) {
  api.request(['decode', 'uri'], 'POST', { 'data' : '%3' }, function(actual, code) {
    test.equals(code, 400);
    test.equals(actual.code, 'InvalidArgument');
    test.done();
  });
}
