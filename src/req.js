var http = require('http');

function postRequest(kVal, cookies) {
  var op = {
    request : {
      host : 'www.redbox.com',
      port : 80,
      path : '/api/Store/GetStores/',
      method : 'POST',
      headers : {
        __K : kVal,
        Cookie : cookies
      }
    },
    write : '',
    success : function (data, res, req) {
      console.log(req)
    },
    error : function (res) {
      console.log(res);
    }
  }
  makeRequest(op);
}

var opts = {
  request : {
    host : 'www.redbox.com',
    port : 80,
    path : '/',
    method : 'GET'
  },
  success : function (data, res, req) {
    console.log('retu');
    var apiKeyRE = new RegExp(".*rb.api.key.*'(.*?)'.*");
    var match = apiKeyRE.exec(data);
    
    if(match !== null){
      console.log('odd');

      postRequest(match[1], res.headers['set-cookie']);
    }
  },
  error : function (res) {
    console.log('error');
  }
}



function makeRequest(options) {
   
  var req = http.request(options.request, function (res) {
    var data = "";
    res.on('data', function (chunck){
      data += chunck;
    });
    res.on('end', function () {
      options.success(data, res, req);
    });
    res.on('error', function () {
      options.error(res);
    });
  });
  if(options.write){
    req.write(options.write + '\n');
  }
  req.end()

}

makeRequest(opts);

