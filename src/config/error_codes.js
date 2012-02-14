/*
 *
 *  Error Codes
 *
 *  100 - 103 : sent invalid location parameters 
 *  104 - 105 : sent invalid movie parameters
 *
 *
 */

var error_codes = {
  100: {
      message: "Location Not Set",
      error_code: 100
  },
  101: {
      message: 'Invalid Latitude',
      error_code: 101
  },
  102: {
      message: "Invalid Longitude",
      error_code: 102
  },
  103: {
      message: "Invalid Location",
      error_code: 103
  },
  104: {
      message: "Movie Not Set",
      error_code: 104
  },
  105: {
      message: "Invalid Movie",
      error_code:105
  }

  

};


exports.errors = error_codes;
