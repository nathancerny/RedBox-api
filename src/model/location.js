var errors = require('../config/error_codes').errors;
/*
 *  If it returns nan then throws an error
 */
function safeParseFloat (str) {
  var flo = parseFloat(str);
  if( isNaN(flo) === true ) {
    throw errors[103];
  }
  return flo;
}

function validate (params) {
  var reg = /^[-|+]?[0-9]{0,20}\.?[0-9]*$/,
      matchedLat,
      matchedLon;
  if ( !((typeof params.lat === "string") && (typeof params.lng === 'string')) ) {
    throw errors[100];
  }
  matchedLat = params.lat.match(reg);
  if( (matchedLat === null) || (matchedLat.length > 1) ) {
     throw errors[101];
  }
  matchedLon = params.lng.match(reg);
  if( (matchedLon === null) || (matchedLon.length > 1) ) {
     throw errors[102];
  }
  return true;
}

function build (params) {
  if( validate(params) === true) {
    return {
      lat : safeParseFloat(params.lat),
      lng : safeParseFloat(params.lng)
    }
  }
  return false;
}

function init (params) {
  var that = build(params); 
  if (that === false) {
    throw "Could Not Make Location";
  }
  return that;
}

exports.init = init;
