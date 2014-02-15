
function api(request, response, next)
{
  response.send({
    'version' : require('../../package.json').version
  });
}

exports.api  = 'meta';

exports.method = 'get';

exports.rest = [];

exports.doc = {};

exports.doc.input = [];

exports.doc.description = 'Returns meta information, such as version. This is a GET API.'

exports.doc.errors = [ ]

exports.entry  = api;
