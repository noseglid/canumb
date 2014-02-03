#!/usr/bin/env node

/* So, we need a server for the API tests */
var server = require('../src/main.js');

/* Run these tests ... */
var tests = [
  'tests/lib/numbers/',
  'tests/api/'
];

/* ... unless overridden by environment */
if (process.argv.length > 2) {
  tests = process.argv.slice(2);
}

var reporter = require('nodeunit').reporters.default;
reporter.run(tests, false, function() {
  server.close();
});
