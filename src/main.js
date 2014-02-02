var fs      = require('fs');
var restify = require('restify');

var convertapi = require('./api/convert.js');

/* Allows port to be set through environment, e.g. Heroku does this. */
var port = Number(process.env.PORT || 5000);

var server = restify.createServer({
  'name'    : 'canumb server',
  'version' : '0.0.1'
});

server.pre(restify.pre.userAgentConnection());

server.get('/convert/:' + convertapi.params.join('/:'), convertapi.entry);

server.get(/^\/?.*/, restify.serveStatic({
  'default'   : 'index.html',
  'directory' : './public'
}));

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
})

server.on('uncaughtException', function(request, response, route, error) {
  throw error;
});
