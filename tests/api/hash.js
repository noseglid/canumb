var _   = require('underscore');
var api = require('../helpers/api.js');

exports.testHash = function(test) {
  var tests = [
    {
      'data' : 'Chuck Norris',
      'expected' : {
        'hex' : {
          'sha1'      : '06634164f367887ac6a9809ab23682e76dd5e992',
          'sha224'    : '50bf9da44f57efdd3d96ba1eb7ece260a461c2a1b26e916e6d38ad43',
          'sha256'    : 'cd6808bb2c1f6ef88d457cc9a2ad0edf1656ae73f47fde0fa62602a1a17c4cb8',
          'sha384'    : '78281209a4092e7deb08a96b09054105fe0cec4fcc37e1a3afe981fcaf1f834c454b0fa33b8ace53ab950260a351a6b3',
          'sha512'    : '44eabd8950ae94581d98490278118b534b2f486a9dbeefe4bf5a530141e97e2d49400c5b247e6db66f0e8fca29c60d6972448d6620c90cd7661b626f60796544',
          'mdc2'      : '87ce650f9e401e20fd3967e8e87a47e1',
          'md4'       : 'fed272272643aa6d8e15d5fa4bb8ddc9',
          'md5'       : 'df965c1f51d376e013bb9ce9c89c48e5',
          'ripemd'    : 'adbcf08c49ea4aeb2052c9ff76ef759059cea199',
          'ripemd160' : 'adbcf08c49ea4aeb2052c9ff76ef759059cea199',
          'whirlpool' : '6953b6894ba8a3a2b4e1fac333a06b0805869e4652a23691ce4be85197419b9e009a570538b5efd3d58f050bcd5e7e39a19fd4ba253705937e3fc87f00008764'
        },
        'base64' : {
          'sha1'      : 'BmNBZPNniHrGqYCasjaC523V6ZI=',
          'sha224'    : 'UL+dpE9X7909lroet+ziYKRhwqGybpFubTitQw==',
          'sha256'    : 'zWgIuywfbviNRXzJoq0O3xZWrnP0f94PpiYCoaF8TLg=',
          'sha384'    : 'eCgSCaQJLn3rCKlrCQVBBf4M7E/MN+Gjr+mB/K8fg0xFSw+jO4rOU6uVAmCjUaaz',
          'sha512'    : 'ROq9iVCulFgdmEkCeBGLU0svSGqdvu/kv1pTAUHpfi1JQAxbJH5ttm8Oj8opxg1pckSNZiDJDNdmG2JvYHllRA==',
          'mdc2'      : 'h85lD55AHiD9OWfo6HpH4Q==',
          'md4'       : '/tJyJyZDqm2OFdX6S7jdyQ==',
          'md5'       : '35ZcH1HTduATu5zpyJxI5Q==',
          'ripemd'    : 'rbzwjEnqSusgUsn/du91kFnOoZk=',
          'ripemd160' : 'rbzwjEnqSusgUsn/du91kFnOoZk=',
          'whirlpool' : 'aVO2iUuoo6K04frDM6BrCAWGnkZSojaRzkvoUZdBm54AmlcFOLXv09WPBQvNXn45oZ/UuiU3BZN+P8h/AACHZA=='
        }
      }
    },
    {
      'data' : '',
      'expected' : {
        'hex' : {
          'sha1'      : 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
          'sha224'    : 'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f',
          'sha256'    : 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          'sha384'    : '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b',
          'sha512'    : 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
          'mdc2'      : '52525252525252522525252525252525',
          'md4'       : '31d6cfe0d16ae931b73c59d7e0c089c0',
          'md5'       : 'd41d8cd98f00b204e9800998ecf8427e',
          'ripemd'    : '9c1185a5c5e9fc54612808977ee8f548b2258d31',
          'ripemd160' : '9c1185a5c5e9fc54612808977ee8f548b2258d31',
          'whirlpool' : '19fa61d75522a4669b44e39c1d2e1726c530232130d407f89afee0964997f7a73e83be698b288febcf88e3e03c4f0757ea8964e59b63d93708b138cc42a66eb3'
        },
        'base64' : {
          'sha1'      : '2jmj7l5rSw0yVb/vlWAYkK/YBwk=',
          'sha224'    : '0UoCjCo6K8lHYQK7KII0xBWisB+CjqYqxbPkLw==',
          'sha256'    : '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
          'sha384'    : 'OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb',
          'sha512'    : 'z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==',
          'mdc2'      : 'UlJSUlJSUlIlJSUlJSUlJQ==',
          'md4'       : 'MdbP4NFq6TG3PFnX4MCJwA==',
          'md5'       : '1B2M2Y8AsgTpgAmY7PhCfg==',
          'ripemd'    : 'nBGFpcXp/FRhKAiXfuj1SLIljTE=',
          'ripemd160' : 'nBGFpcXp/FRhKAiXfuj1SLIljTE=',
          'whirlpool' : 'Gfph11UipGabROOcHS4XJsUwIyEw1Af4mv7glkmX96c+g75piyiP68+I4+A8TwdX6olk5Ztj2TcIsTjMQqZusw=='
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
