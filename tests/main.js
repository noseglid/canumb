#!/usr/bin/env node

/* So, we need a server for the API tests */
process.env.PORT = 1024 + Math.ceil(Math.random() * 64511);
var server = require('../src/main.js');
server.on('listening', startTests);

function startTests()
{
  /* Run these tests ... */
  var tests = [
    'tests/lib/numbers/',
    'tests/api/'
  ];

  /* ... unless overridden by argumentlist */
  if (process.argv.length > 2) {
    tests = process.argv.slice(2);
  }

  var reporter = require('nodeunit').reporters.default;
  reporter.run(tests, false, function() {
    server.close();
  });
}
