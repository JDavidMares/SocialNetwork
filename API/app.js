'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//Cargar routes

//middleware

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//routes


//export
module.exports = app;
