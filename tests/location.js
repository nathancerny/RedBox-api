// running tests for model/location.js

var loc = require('../src/model/location').init; 


var tests_passed = true;
function printMessage(message, result, expected) {
  console.log('*********** ' + message + '***************');
  console.log("Result: ", result);
  console.log("EXPECTING: ", expected, "\n");
}
function testCodes (testParams, expected, message, fail) {
  var l;
  try {
    l = new loc(testParams);
    if(fail === true){
      throw {'error_code' : 'did not fail'};
    }else{
      if(l.lat !== expected.lat && l.lng !== expected.lng){
        tests_passed = false;
        printMessage(message, l, expected);
      }
    }
  }catch(e){
    if(e.error_code !== expected) {
      tests_passed = false;
      printMessage(message, e.error_code, expected);
    }
  }
}
function setParams(lat, lng){
  return {
    lat : lat,
    lng : lng
  };
}

/*
 *  Null Parameters test
 */

testCodes(setParams(null, null), 100, 'Testing Null Params', true);

/*
 * UndefinedParameters
 */
testCodes(setParams(undefined, undefined), 100, 'Testing Undefined Params', true);

/*
 * Testing One param undifined
 */
testCodes(setParams(undefined, 100), 100, 'Testing one Undefined', true);

/*
 * Testing One param undifined
 */
testCodes(setParams(undefined, 100), 100, 'Testing one Undefined', true);

/*
 * Testing Bad Latitude 
 */
testCodes(setParams(1232131.13123123, 100), 100, 'Testing Number latitude', true);

/*
 * Testing bad longitude
 */
testCodes(setParams('121323.123123', 100), 100, 'Testing Number longitude', true);

/*
 * Testing Bad latitude
 */
testCodes(setParams('234234.2423423.242342', '24234.23'), 101, 'Testing Bad latitude', true);

/*
 * Testing Bad Longitude
 */
testCodes(setParams('242342.2342342', '24234.234.234'), 102, 'Testing Bad Longitude', true);

/*
 * Testing One param undifined
 */
testCodes(setParams('-100.01', '+100.01'), {lat : -100.01, lng : 100.01}, 'Testing Good Values');

/*
 * Testing One param undifined
 */
testCodes(setParams(undefined, 100), 100, 'Testing one Undefined');

if(tests_passed){
  console.log('********** done running tests WAHOOO *******');
}else{
  console.log('Many Tests failed');
}
