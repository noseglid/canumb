var http = require('http');

var port = Number(process.env.PORT || 5000);

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type' : 'text/plain' });
  res.end('Hello, World!');
}).listen(port, function() {
  console.log('Listening on port: ' + port);
});

