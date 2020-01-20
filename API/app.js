'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//
//Load routes
//
var user_routes = require('./routes/user');

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
app.use(user_routes);


//////////////////////////////////////////////////////////
// app.get('/', function(req, res){
//   res.status(200).send({
//       message:"Hello World"
//   });
// });
//
// app.post('/test', function(req, res){
//   console.log(req.body);
//   res.status(200).send({
//       message:"Test response server route NodeJS"
//   });
// });
//////////////////////////////////////////////////////////




//export
module.exports = app;
