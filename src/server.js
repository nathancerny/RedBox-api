var http = require('http');
var url = require('url');
var querystring = require('querystring');

function start (route, handle) { 
  http.createServer( function (request, response) {
    var url_parts;
    var geturl = url.parse(request.url);
    console.log("Request for " + geturl.pathname + "received");
    if(request.method === 'GET')  {
      route(handle, geturl, response);
    }else {
      response.writeHead(200, {'Content-Type' : 'text/plain'});
      response.write('Only Get requests try again');
      response.end();
    }

    //response.writeHead(200, {'Content-Type' : 'text/plain'});
    //response.write(content);
    //response.end();
  }).listen(8888);

  console.log('listening on port ', 8888);
}
exports.start = start;


