'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso_desarrollar_red_social_angular';

exports.ensureAuth = function(req, res, next){
  if(!req.headers.authorization){
      return res.status(403).send({message: 'Request does not have the authentication header'})
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');

  try{
    var payload = jwt.decode(token, secret);

    if(payload <= moment().unix()){
      return res.status(401).send({message: 'token expired'});
    }

  }catch(ex){
    return res.status(404).send({message: 'token not valid'});
  }

  req.user = payload;
  next();

}
