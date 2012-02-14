var exec = require("child_process").exec;
var Location = require("./model/location").init;
var Movie = require("./model/movie").init;
var redbox = require("./redbox").Redbox;

function start (response) {
  console.log("Request handler start was called");
  exec("ls -lah", function (error, stdout, stderr){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload (response) {
  console.log('Request handler upload was called');
  response.writeHead(200, {"Content-Type" : "text/plain"});
  response.write("Hello Upload");
  response.end();
}

function movieLocation (response, params) {
  var loc; 
  var movie;
  
  try {
    loc = new Location(params);
    
  } catch (e) {
    console.log(e);
    reportError(response, e);
    return;
  }
  try {
    movie = new Movie(params);
  } catch (e) {
    console.log(e);
    reportError(response, e);
  }
  try {
    redbox(loc, movie, function (body){
      console.log(movie);
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify(body));
      response.end();
    });
    
  } catch (e) {
    console.log(e);
    reportError(response, e)
  }
}

function reportError (response, e) {
  var output = JSON.stringify(e);   
  response.writeHead(200, {"Content-Type" : "application/json"});
  response.write(output);
  response.end();
}


exports.start = start;
exports.upload = upload;
exports.movieLocation = movieLocation;
