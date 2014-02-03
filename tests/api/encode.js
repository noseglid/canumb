var _   = require('underscore');
var api = require('../helpers/api.js');

exports.testBase64Encode = function(test) {
  var tests = [
    { 'data' : 'Chuck Norris', 'expected' : 'Q2h1Y2sgTm9ycmlz' },
    { 'data' : 'a',            'expected' : 'YQ==' },
    { 'data' : 'A',            'expected' : 'QQ==' },
    { 'data' : 'Q',            'expected' : 'UQ==' },
    { 'data' : ' ',            'expected' : 'IA==' },
    { 'data' : 'å',            'expected' : 'w6U=' },
    { 'data' : 'åäöüè!f↙↬➿',   'expected' : 'w6XDpMO2w7zDqCFm4oaZ4oas4p6/' },
  ];

  test.expect(tests.length);
  var testdonecb = _.after(tests.length, test.done);

  _.each(tests, function(dp) {
    api.request(['encode', 'base64'], 'POST', dp.data, function(actual) {
      test.equals(actual.base64, dp.expected);
      testdonecb();
    });
  });
};

exports.testUriEncode = function(test) {
  var tests = [
    { 'data' : 'Chuck Norris', 'expected' : 'Chuck%20Norris' },
    { 'data' : 'a',            'expected' : 'a' },
    { 'data' : 'A',            'expected' : 'A' },
    { 'data' : 'q',            'expected' : 'q' },
    { 'data' : ' ',            'expected' : '%20' },
    { 'data' : 'å',            'expected' : '%C3%A5' },
    { 'data' : 'åäöüè!f↙↬➿',   'expected' : '%C3%A5%C3%A4%C3%B6%C3%BC%C3%A8!f%E2%86%99%E2%86%AC%E2%9E%BF' },
  ];

  test.expect(tests.length);
  var testdonecb = _.after(tests.length, test.done);

  _.each(tests, function(dp) {
    api.request(['encode', 'uri'], 'POST', dp.data, function(actual) {
      test.equals(actual.uri, dp.expected);
      testdonecb();
    });
  });
}
