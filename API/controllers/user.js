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

  bcrypt.hash(params.password, null, null, (err, hash) => {
    user.password = hash;

    user.save((err, userStored) => {
      if(err) return res.status(500).send({message: userRes.userResponse(500)});
      if(!userStored){
        res.status(404).send({message: userRes.userResponse(404)})
      }

      res.status(200).send({user:userStored});
    });
  });

}

module.exports = {
  home,
  test,
  saveUser
}
