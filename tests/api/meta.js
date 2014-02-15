var _   = require('underscore');
var api = require('../helpers/api.js');

exports.testVersion = function(test) {
  test.expect(1);
  api.request(['meta'], 'GET', {}, function(actual) {
    test.equals(actual.version, require('../../package.json').version);
    test.done();
  });
};
