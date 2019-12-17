'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var userRes = require('../response/response.js');


function home (req, res){
  res.status(200).send({
      message:"Hello World"
  });
}

function test(req, res){
  res.status(200).send({
    message:"Hello test without api route"
  });
}

//
// Function: saveUser
// Description: catch the form to register new user and save it in the DB.
//  Return 3 type of message: user object (200), server error (500), user not found or added (404)
//  incomplete foom (400)
//
function saveUser(req, res){
  var params = req.body;
  var user = new User();

  if(!params.name || !params.email || !params.surname || !params.password || !params.nick){
      return res.status(200).send({
                message: userRes.userResponse(400)
              });
    }

  user.name = params.name;
  user.surname = params.surname;
  user.nick = params.nick;
  user.email = params.email;
  user.role='ROLE_USER';
  user.image = null;

//
//Verify if the user already exist and after save him.
//
  User.find({ $or: [
                    {email: user.email.toLowerCase()},
                    {nick: user.nick.toLowerCase()},
                  ]
      }).exec(function(err, usr){
        if(err) return res.status(500).send({message: userRes.userResponse(500)});
        if(usr && usr.length >=1){
            return res.status(200).send({message: 'The user already exist.'});
        }

        bcrypt.hash(params.password, null, null, (err, hash) => {
          user.password = hash;

          user.save((err, userStored) => {
            if(err) return res.status(500).send({message: userRes.userResponse(500)});
            if(!userStored){
                return res.status(404).send({message: userRes.userResponse(404)})
            }

            res.status(200).send({user:userStored});
          });
        }); //bcrypt
      });
}

//
// Function: login
// Description:
//
//
function login(req, res){

}
//
// Export all the function to use them in the user route file.
//
module.exports = {
  home,
  test,
  saveUser
}
