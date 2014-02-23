var _   = require('underscore');
var api = require('../helpers/api.js');

exports.testList = function(test) {
  api.request(['doc'], 'GET', {}, function(actual) {
    test.ok(typeof actual.apis    !== 'undefined');
    test.ok(typeof actual.version !== 'undefined');
    _.each(actual.apis, function(entry) {
      test.ok(typeof entry.api         !== 'undefined');
      test.ok(typeof entry.description !== 'undefined');
    });
    test.done();
  });
};

exports.testAll = function(test) {

  api.request(['doc'], 'GET', {}, function(list) {
    test.expect(6 * list.apis.length);
    var testdonecb = _.after(list.apis.length, test.done);

    _.each(list.apis, function(papi) {
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
