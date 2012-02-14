var errors = require('../config/error_codes').errors;

function safeParseInt(str){
  var num = parseInt(str);
  if( isNaN(num) === true){
    num = 0;
  }
  return num;
} 
// PARAMS year = 0 means search for any year
// Validate function does to much oh well
function validate (params) {
  var yearReg = /^[0-9]{4}$/,
      match
  if ( !((typeof params.q === "string")) ) {
    throw errors[104];
  }
  if ( typeof params.year === 'string' ) {
    match = params.year.match(yearReg);
    if(match === null){
      params.year = '0';
    }
  }else{
    params.year = '0';
  }
  if ( typeof params.actor !== 'string' || params.actor.length === 0) {
    params.actor = 'any';
  }
  return true;
}

function build (params) {
  if( validate(params) === true) {
    return {
      q: params.q,
      actor: params.actor.split(','),
      year: safeParseInt(params.year)
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
