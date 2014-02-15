var fs      = require('fs');
var restify = require('restify');
var util    = require('util');

var _ = require('underscore');

var errors = require('./lib/errors.js');

/* The directory where the APIs are available */
var apidir = __dirname + '/api/';

/* Allows port to be set through environment, e.g. Heroku does this. */
var port = Number(process.env.PORT || 5000);

/* Fetch the version from the package.json file */
var version = require('../package.json').version;

var server = restify.createServer({
  'name'    : 'canumb server',
  'version' : version
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.bodyParser({ mapParams : false }));

fs.readdir(apidir, function(err, files) {
  if (err)
    throw new errors.Error("Could not find APIs. " + err);

  files = _.filter(files, function(file) {
    return file.match('^[a-z]+\.js$');
  });

  var apiList = _.map(files, function(file) {
    return require(apidir + file);
  });

  setupAPI(apiList);
});

function setupAPI(apiList) {

  /* Register the generic documentation */
  server.get('/doc', _.bind(serveDocumentation, {}, apiList));

  _.each(apiList, function(api) {
    var list = _.map(api.rest, function(p) { return p.name });
    var path = util.format('/%s', api.api);
    if (0 < list.length) path += '/:' + list.join('/:');
    console.log("'%s' api '%s', path '%s'", api.method, api.api, path);

    /* Register specific API */
    server[api.method](path, api.entry);

    /* Register documentation for API */
    server.get('/doc/' + api.api, _.bind(serveAPIDocumentation, {}, api));
  });

  var regex = /^\/?.*/;
  var pub   = './public';
  console.log("'get' public pages from '%s', path '%s'", pub, regex);
  server.get(regex, restify.serveStatic({
    'default'   : 'index.html',
    'directory' : pub
  }));
}

function serveDocumentation(apiList, request, response, next) {
  response.send(_.map(apiList, function(api) {
    return {
      'api'         : api.api,
      'description' : api.doc.description
    }
  }));

  return next();
}

function serveAPIDocumentation(api, request, response, next) {
  var errorStruct = _.map(api.doc.errors, function(err) {
    return {
      'name'        : err.type.name,
      'description' : err.description,
      'httpcode'    : new err.type().statusCode,
      'resterror'   : new err.type().restCode
    };
  })

  response.send({
    'api'         : api.api,
    'method'      : api.method,
    'rest'        : api.rest,
    'input'       : api.doc.input,
    'description' : api.doc.description,
    'errors'      : errorStruct
  });

  return next();
}

server.listen(port, function() {
  console.log('%s (%s) listening at %s', server.name, version, server.url);
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
