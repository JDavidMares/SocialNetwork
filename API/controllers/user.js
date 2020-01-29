'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var userRes = require('../response/response.js');
var jwt = require('../services/jwt.js');

function home (req, res){
  res.status(200).send({
      message:"Hello World home"
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
// catch the user information, search the email in the DB, if not founf it, return a message.
// if the user is found, compare the password and return a response.
//
function login(req, res){
  var params = req.body;

  var pass= params.password;
  var email = params.email;

  User.findOne({email: email}, function(err, usr){
    if(err) return res.status(500).send({message: err });
    if(!usr) return res.status(404).send({message: 'Error reading the user' });

    if(usr){
      bcrypt.compare(pass, usr.password, function(err, check){
        if(err) return res.status(404).send({message: 'user not found error 500' });
        if(!check)return res.status(404).send({message: 'User not found' });

        if(params.getToken){
          return res.status(200).send({token: jwt.createToken(usr)});
        }else{
           usr.password = undefined;
           return res.status(200).send({usr});
        }

      });
    }
  });

}

//
//Function: getUser.
//Description:
// catch the user Id from the URL and search the user in the DB.
//
function getUser(req, res){
  var userId = req.params.id;

  User.findById(userId, function(err, user){
    if(err) return res.status(500).send({message: 'error getting the user'});
    if(!user) return res.status(404).send({message: 'User does not exist'});

    return res.status(200).send({user});
  });
}

//
//Function: getUsers.
//Description:
// This function catch the number of the current page from the URL, return all the
// users, the total of the users and the number of the page. The number of the page
// is calculate with the elements by page and total.
//
function getUsers(req, res){
  var identityUserId = req.user.sub;
  var page = 1;
  var itemsPerPage= 5;

  if(req.params.page) page = req.params.page;

  User.find().sort('_id').paginate(page, itemsPerPage, function(err, usrs, total){
    if(err) return res.status(500).send({message: 'error getting the users'});
    if(!usrs) return res.status(404).send({message: 'Users does not exist'});

    return res.status(200).send({
        usrs,
        total,
        pages: Math.ceil(total/itemsPerPage)
      });
  });
}


//
// Export all the function to use them in the user route file.
//
module.exports = {
  home,
  saveUser,
  login,
  getUser,
  getUsers
}
