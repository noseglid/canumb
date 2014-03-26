var api = require('../helpers/api.js');
var _   = require('underscore');

/**
 * Generic tests which does not map to a specific API.
 */

exports.largePost = function(test)
{
  var testdonecb = _.after(3, test.done);

  /* 1MB of POST data */
  var okbody = new Array(1024 * 1024 + 1).join('_');
  api.request(['convert', 'bin'], 'POST', okbody, function(actual, code) {
    /* 1 MB should be ok. The request was invalid, but not exceeding. */
    test.equal(code, 400);
    test.equal(actual.code, 'MissingArgument');
    testdonecb();
  });


  /* Just over 2MB of POST data */
  var nokbody = new Array(2048 * 1024 + 1 + 1).join('_');
  api.request(['convert', 'bin'], 'POST', nokbody, function(actual, code) {
    test.equal(code, 413);
    test.equal(actual.code, 'RequestEntityTooLargeError');
    testdonecb();
  });

  /* 4MB of POST data */
  var nokbody2 = new Array(4096 * 1024 + 1).join('_');
  api.request(['convert', 'bin'], 'POST', nokbody2, function(actual, code) {
    test.equal(code, 413);
    test.equal(actual.code, 'RequestEntityTooLargeError');
    testdonecb();
  });
};
