var Shred = require('shred');
var surf = new Shred();
console.log(surf);
function postShred (Kvalue){
  var req = shred.post({
    url : "http://www.redbox.com",

    headers: {
      accept : "text/html"
    },
    content : con,
    on : {
      response : function(response) {
        console.log("RESPONDED")
      }
    }
  });
}


var req = surf.get({

  url : "http://www.redbox.com",
  headers : {
    accept : "text/html"
  },
  on : {
    200 : function (response) {
      console.log('works');
    },
    response : function (response) {
      console.log(response);
    }
  }, 



});
