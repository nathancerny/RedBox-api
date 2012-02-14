var request = require('request');
var promise = require('./process_queue').promise;
var baseURL = 'http://www.redbox.com/';


/**
 *  Searches redbox.com for the given query
 *  passes the result pack to the handler function
 */
function MovieLookup (search) {
  return Object.create(MovieLookup.prototype).init(search);
  
}
MovieLookup.prototype = {
  init: function (_search) {
    this.domain = "http://search.redbox.com/?";
    this.search = _search;
    this.results = {};

    return this;
  },
  find: function (handler) {
    var that = this;
    var searchUrl = {
      url: that.domain + that.makeQueryString(that.search)
    };
    request.get(searchUrl, function (error, response, body) {
      // filter the results and pass the result back to the body
      that.results = JSON.parse(body);
      handler(that);
    });
  },
  makeQueryString: function (query) {

    var output = '';
    var prop;
    var value;
    for(prop in this.search) {
      value = this.search[prop];
      if(prop === 'q'){
        output += '&' + prop + '=' + value;
      }
    }
    output = output.replace(/\s/g, '+');
    output = output.replace(/^\&/, '');
    output = output.replace(/:/, '%3A');
    return output;
  },
  getResultIDs: function () {
    var out = [];

    out.push(this.results.results[0].ID);
    return out;
  }
  

}

// Object to create the token
function Token (handler) {
  return Object.create(Token.prototype).init(handler)
}
Token.prototype = {
  init: function(_handler) {
    request(baseURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var apiKeyRE = new RegExp(".*rb.api.key.*'(.*?)'.*");
        var match = apiKeyRE.exec(body);
        if (match !== null) {
          this.token = match[1].trim();
          _handler(this.token);
        }
      }
    });
    return this;
  },
  getToken: function () {
    return this.token;
  }
}

function StoreLookup (loc, token, movieIDs) {
  return Object.create(StoreLookup.prototype).init(loc, token, movieIDs);
}


// Store look up objects
StoreLookup.prototype = {
  init: function (_location, _token, _movieIDs) {
    this.loc = _location;
    this.token = _token;
    this.request_with = 'XMLHttpRequest';
    this.user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.77 Safari/535.7';
    this.url = baseURL + 'api/Store/GetStores/';
    this.method = 'POST';
    this.locationBase = {
      "filters": {
          "proximity": {
            "lat":_location.lat,
            "lng":_location.lng,
            "radius":5
          },
          "inventory":true
      },
      "resultOptions": {
        "max":50,
        "profile":true,
        "status":true,
        "proximity":true,
        "user":true,
        "inventory":true,
        "inventoryProducts":_movieIDs
      }
    };
    this.movieIDS = _movieIDs;
    return this;
  },
  callStores: function (handler) {
    request.post({
      url : this.url,
      body : JSON.stringify(this.locationBase) + '',
      method : this.method, 
      headers : {
        '__K' : this.token,
        'X-Requested-With' : this.request_with,
        'User-Agent' : this.user_agent
      }
    },
    function (e, r, body) {
      var pass;
      pass = JSON.parse(body);
      handler(pass);
    });
  }
  
};

function Redbox(loc, search, handler){
  return Object.create(Redbox.prototype).init(loc, search, handler);
}

Redbox.prototype = {
  init: function (_loc, _search, _handler) {
    var that = this;
    that.loc = _loc;
    that.search = _search;
    that.promise = promise();
    that.tokenId = that.promise.newTask('token');
    that.searchingId = that.promise.newTask('searching');
    that.token = Token(function (tok) {
      that.promise.done(that.tokenId, tok)
    });
    that.movieLookup = MovieLookup(that.search); 
    that.movieLookup.find(function (results) {
      that.promise.done(that.searchingId, results);
    });
    that.promise.when(function (outcome) {
      var movieIds = outcome.searching[0].getResultIDs();
      var token = outcome.token[0];
      that.storeLookup = StoreLookup(that.loc, token, movieIds); 
      that.storeLookup.callStores(function (body){
        _handler(body)
      });
    });
    that.promise.endTask();
    return that;
  }
}


  
  

  

//http://localhost:8888/movie-location?lat=40.282198&lng=-111.70766800000001&q=the%20help

exports.Redbox = Redbox;

