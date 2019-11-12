'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//
// DB Connection
//
mongoose.connect('mongodb://localhost:27017/SocialNetwork', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    console.log('Connection succesfull');

    //Create server
    app.listen(port,function () {
      console.log('Server run on localhost:3800');
    });

  })
  .catch( err => console.log(err) );
