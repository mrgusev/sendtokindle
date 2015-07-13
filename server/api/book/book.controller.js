'use strict';

var _ = require('lodash');
var bookUploader = require('../../components/book-uploader');

// Upload a book
exports.upload = function(req, res, next) {
  var user = req.user;
  var kindleEmail = user.kindleEmail;

  bookUploader.sendBook(req.body.bookUrl, kindleEmail)
    .then(function() {
      res.json({ info: 'success' });
    }).catch(function(err) {
      next(err);
    })
};

exports.index = function(req, res) {
  res.json({ info: 'success' });
};
