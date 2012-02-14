var Movie = require('../src/model/movie').init


// TODO: Finish writing test codes

var tests_passed = true;
function printMessage(message, result, expected) {
  console.log('*********** ' + message + '***************');
  console.log("Result: ", result);
  console.log("EXPECTING: ", expected, "\n");
}
function testCodes (testParams, expected, message, fail) {
  var l;
  try {
    l = new Movie(testParams);
    if(fail === true){
      throw {'error_code' : 'did not fail'};
    }else{
      if(l.q !== expected.q){
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
function setParams(q){
  return {
    q: q
  };
}

/*
 * test null query 
 */

testCodes(setParams(null), 104, 'Testing Null Query', true);




if(tests_passed){
  console.log('********** done running tests WAHOOO *******');
}else{
  console.log('Many Tests failed');
}
