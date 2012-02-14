function queryToObj(query) {
  var split, out;
  query = query || '';
  split = query.split('&');
  out = {};
  if(query.length === 0){
    return out;
  }
  split.forEach(function (ele){
    var keyValue = ele.split('=');
    out[keyValue[0]] = keyValue[1]; 
  });
  return out;
}

function route(handle, url, response){
  var pathname = url.pathname;
  var params = queryToObj(url.query); 
  

  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response, params);
  } else {
    console.log('No request handler found for ' + pathname);
    response.writeHead(404, {"Content-Type" : "text/plain"});
    response.write("404 Not Found");
    response.end();
    return "404";
  }
}

exports.route = route;
