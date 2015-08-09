'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  url: String,
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  success: Boolean,
  error: String
});

module.exports = mongoose.model('Book', BookSchema);
