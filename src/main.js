var fs      = require('fs');
var restify = require('restify');

var errors     = require('./lib/errors.js');
var convertapi = require('./api/convert.js');

/* Allows port to be set through environment, e.g. Heroku does this. */
var port = Number(process.env.PORT || 5000);

var server = restify.createServer({
  'name'    : 'canumb server',
  'version' : '0.0.1'
});

server.pre(restify.pre.userAgentConnection());

server[convertapi.method]('/convert/:' + convertapi.params.join('/:'), convertapi.entry);

server.get(/^\/?.*/, restify.serveStatic({
  'default'   : 'index.html',
  'directory' : './public'
}));

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
})

server.on('uncaughtException', function(request, response, route, error) {
  if (error instanceof errors.Error) {
    /* Send API response based on the error */
    response.send(new restify.RestError(error));
    return;
  }

  /* This will crash the server. Might not be what we want for production */
  throw error;
});

module.exports = server; /* So that it can be shut down if it is included */
