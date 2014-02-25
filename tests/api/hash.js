var _   = require('underscore');
var api = require('../helpers/api.js');

exports.testHash = function(test) {
  var tests = [
    {
      'data' : 'Chuck Norris',
      'expected' : {
        'hex' : {
          'sha1'   : '06634164f367887ac6a9809ab23682e76dd5e992',
          'sha256' : 'cd6808bb2c1f6ef88d457cc9a2ad0edf1656ae73f47fde0fa62602a1a17c4cb8',
          'sha512' : '44eabd8950ae94581d98490278118b534b2f486a9dbeefe4bf5a530141e97e2d49400c5b247e6db66f0e8fca29c60d6972448d6620c90cd7661b626f60796544',
          'md4'    : 'fed272272643aa6d8e15d5fa4bb8ddc9',
          'md5'    : 'df965c1f51d376e013bb9ce9c89c48e5'
        },
        'base64' : {
          'sha1'   : 'BmNBZPNniHrGqYCasjaC523V6ZI=',
          'sha256' : 'zWgIuywfbviNRXzJoq0O3xZWrnP0f94PpiYCoaF8TLg=',
          'sha512' : 'ROq9iVCulFgdmEkCeBGLU0svSGqdvu/kv1pTAUHpfi1JQAxbJH5ttm8Oj8opxg1pckSNZiDJDNdmG2JvYHllRA==',
          'md4'    : '/tJyJyZDqm2OFdX6S7jdyQ==',
          'md5'    : '35ZcH1HTduATu5zpyJxI5Q=='
        }
      }
    },
    {
      'data' : '',
      'expected' : {
        'hex' : {
          'sha1'   : 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
          'sha256' : 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          'sha512' : 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
          'md4'    : '31d6cfe0d16ae931b73c59d7e0c089c0',
          'md5'    : 'd41d8cd98f00b204e9800998ecf8427e'
        },
        'base64' : {
          'sha1'   : '2jmj7l5rSw0yVb/vlWAYkK/YBwk=',
          'sha256' : '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
          'sha512' : 'z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==',
          'md4'    : 'MdbP4NFq6TG3PFnX4MCJwA==',
          'md5'    : '1B2M2Y8AsgTpgAmY7PhCfg=='
        }
      }
    }
  ];

  var n = _.reduce(tests, function(memo, test) {
    return memo + _.size(test.expected.hex) + _.size(test.expected.base64);
  }, 0);

  test.expect(n);
  var testdonecb = _.after(n, test.done);

  _.each(tests, function(dp) {
    _.each(dp.expected.hex, function(hash, algorithm) {
      api.request(['hash', algorithm], 'POST', { 'data' : dp.data }, function(actual, code) {
        test.equals(actual.hex, hash);
        testdonecb();
      });
    });

    _.each(dp.expected.base64, function(hash, algorithm) {
      api.request(['hash', algorithm], 'POST', { 'data' : dp.data }, function(actual, code) {
        test.equals(actual.base64, hash);
        testdonecb();
      });
    });
  });
};

exports.testInvalidHash = function(test) {
  var tests = [
    { 'data' : 'hashme', 'algo' : 'md2',  'error' : 'InvalidArgument' },
    { 'data' :  false,   'algo' : 'sha1', 'error' : 'MissingArgument' },
    { 'data' :  false,   'algo' : '2313', 'error' : 'MissingArgument' }
  ];

  test.expect(2 * tests.length);
  var testdonecb = _.after(tests.length, test.done);

  _.each(tests, function(dp) {
    var postData = (dp.data) ? { 'data' : dp.data } : false;
    api.request(['hash', dp.algo], 'POST', postData, function(actual, code) {
      test.equals(code, 400);
      test.equals(actual.code, dp.error);
      testdonecb();
    });
  });
};
