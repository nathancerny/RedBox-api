var http = require('http');
var url = require('url');

function start (route, handle) { 
  http.createServer( function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + "received");

    route(handle, pathname, response);

    //response.writeHead(200, {'Content-Type' : 'text/plain'});
    //response.write(content);
    //response.end();
  }).listen(8888);

  console.log('listening on port ', 8888);
}
exports.start = start;


