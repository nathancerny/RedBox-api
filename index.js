var server = require("./src/server");
var router = require('./src/router');
var requestHandlers = require('./src/requestHandlers');

var handle = {};

handle["/"] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

server.start(router.route, handle);

