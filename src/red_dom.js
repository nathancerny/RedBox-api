var jsdom = require('jsdom');
var request = require('request');


function han (err, window){
  var $ = window.jQuery,
      $body = window.jQuery;
      $scripts = $body.find('script');
      $($scripts).each(function (i, item) {
      });
      $.post('http://www.redbox.com/api/Store/GetStores/', 
          {'hsibn' : 'dfjadf'},
          function (data) {
            console.log(data);
          });

      console.log('dom finished');
}

function createDom (err, response, body) {
  console.log('request');
  jsdom.env({
    html : body,
    scripts : ['http://code.jquery.com/jquery-1.6.min.js']
  }, han);
}
request({uri : 'http://www.redbox.com'}, createDom); 






