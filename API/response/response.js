'use strict'

function userResponse(errorNumber){
  switch(errorNumber){
    case 500 :
      return 'Error trying to save user';
      break;

    case 404 :
      return 'User not found or added, please review the information';
      break;

    case 400 :
      return 'please, fill all the labels'
      break;

    case 200 :
      return 'User have not been register'
      break;
  }
}

module.exports = {
  userResponse
}
