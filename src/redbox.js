var request = require('request');
var baseURL = 'http://www.redbox.com/';


var redbox = (function () {
  var that = this,
  needsTokens = ['callStores'],
  callStores,
  getToken;

  callStores = function (search, handler){
    var da = {"filters":{"proximity":{"lat":40.282198,"lng":-111.70766800000001,"radius":5},"inventory":true},"resultOptions":{"max":50,"profile":true,"status":true,"proximity":true,"user":true,"inventory":true,"inventoryProducts":["5213"]}};
    if(typeof that.token === 'undefined'){
      if(typeof handler.error === 'function'){
        handler.error('No RedBox Token');
      }else{
        console.log('callStores called with no redbox token');
      }
    }
    request.post({
      url : baseURL + 'api/Store/GetStores/',
      body : JSON.stringify(da) + '',
      method : 'POST', 
      headers : {
        '__K' : that.token,
        'X-Requested-With' : 'XMLHttpRequest',
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.77 Safari/535.7'
      }
      
    },
    function (e, r, body) {
      var pass;
      if(typeof body === 'string'){
        pass = JSON.parse(body);
      }else{
        pass = body;
      }
      if(typeof handler.success === 'function'){
        handler.success(pass);
      }else{
        handler(pass);
      }

    });
  };

  getToken = function (handler, renew) {
    if(typeof that.token === 'string' && renew !== true){
      return;
    }
    request(baseURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var apiKeyRE = new RegExp(".*rb.api.key.*'(.*?)'.*");
        var match = apiKeyRE.exec(body);
        if (match !== null) {
          that.token = match[1].trim();
          handler();
        }
      }
    });
  };

  that.getStores = function (search, handler) {
    getToken(function () {
      callStores(search, handler); 
    }); 
  }
  
  return that;

}());


redbox.getStores({}, function (resp) { 
  console.log(resp);
});




