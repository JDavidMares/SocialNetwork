'use strict'

var User = require('../models/user');


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


module.exports = {
  home,
  test
}
