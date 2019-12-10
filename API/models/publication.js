'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = Schema({
  text: String,
  create_at: String,
  file: String,
  user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Publication', PublicationSchema);
