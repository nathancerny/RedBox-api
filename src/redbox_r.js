var restler  = require('restler');
var baseURL = 'http://www.redbox.com';
var da = '{"productType":1,"id":4674,"maxRecommendations":4}:';

function callStores (kValue, cookie) {
  var i;
  var cook = '';
  for(i = 0; i < cookie.length; i++){
    cook += cookie[i];
  }
  restler.post(baseURL + '/api/Marketing/GetRecommendations/', {
    data : da,
    __K : kValue,
    headers : {
      __K : kValue,
      Host : 'www.redbox.com',
      'X-Requested-With' : 'XMLHttpRequest',
      Origin : 'http://www.redbox.com',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.77 Safari/535.7',
      Cookie : cook,
      
    },
    followRedirects : false
  })
  .on('complete', function (data, response) {
    console.log(response);
    console.log(response.statusCode);
  });
}


restler.get(baseURL)
  .on('complete', function (data, response) {
    if (response.statusCode == 200) {
      var apiKeyRE = new RegExp(".*rb.api.key.*'(.*?)'.*");
      var match = apiKeyRE.exec(data);
      if (match !== null) {
        console.log(match[1]);
        callStores(match[1].trim(), response.headers['set-cookie']);
      }
    }
  });





