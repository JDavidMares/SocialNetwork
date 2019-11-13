'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//
//Load routes
//


//
//middleware
//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//
//cors
//


//
//routes
//
app.get('/', function(req, res){
  res.status(200).send({
      message:"Hello World"
  });
});

app.get('/pruebas', function(req, res){
  res.status(200).send({
      message:"Test response server route NodeJS"
  });
});


//export
module.exports = app;
