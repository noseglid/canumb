var _   = require('underscore');
var api = require('../helpers/api.js');

exports.testList = function(test) {
  api.request(['doc'], 'GET', {}, function(actual) {
    _.each(actual, function(entry) {
      test.ok(typeof entry.api         !== 'undefined');
      test.ok(typeof entry.description !== 'undefined');
    });
    test.done();
  });
};

exports.testAll = function(test) {

  api.request(['doc'], 'GET', {}, function(list) {
    test.expect(6 * list.length);
    var testdonecb = _.after(list.length, test.done);

    _.each(list, function(papi) {
      api.request(['doc', papi.api], 'GET', {}, function(actual) {
        test.equal(actual.api, papi.api);
        test.ok(typeof actual.method      !== 'undefined');
        test.ok(typeof actual.rest        !== 'undefined');
        test.ok(typeof actual.input       !== 'undefined');
        test.ok(typeof actual.description !== 'undefined');
        test.ok(typeof actual.errors      !== 'undefined');
        testdonecb();
      });
    });

  });
};
