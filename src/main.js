var fs      = require('fs');
var restify = require('restify');
var util    = require('util');

var _ = require('underscore');

var errors = require('./lib/errors.js');

/* The directory where the APIs are available */
var apidir = __dirname + '/api/';

/* Allows port to be set through environment, e.g. Heroku does this. */
var port = Number(process.env.PORT || 5000);

var server = restify.createServer({
  'name'    : 'canumb server',
  'version' : '0.0.1'
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.bodyParser({ mapParams : false }));

fs.readdir(apidir, function(err, files) {
  if (err)
    throw new errors.Error("Could not find APIs. " + err);

  _.each(files, function(file) {
    if (!file.match('^[a-z]+\.js$'))
      return;

    var api = require(apidir + file);
    var path = util.format('/%s/:', api.api) + api.params.join('/:');
    console.log("registering api '%s' to path '%s'", api.api, path);
    server.post(path, api.entry);
  });
});

server.get(/^\/?.*/, restify.serveStatic({
  'default'   : 'index.html',
  'directory' : './public'
}));

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
})

server.on('uncaughtException', function(request, response, route, error) {
  if (error instanceof errors.APIError) {
    /* Send API response based on the error */
    response.send(new restify.RestError(error));
    return;
  }

  /* This will crash the server. Might not be what we want for production */
  throw error;
});

module.exports = server; /* So that it can be shut down if it is included */
