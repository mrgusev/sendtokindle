'use strict';

var _ = require('lodash');
var bookUploader = require('../../components/book-uploader');
var BookModel = require('./book.model');

// Upload a book
exports.upload = function(req, res, next) {
  var user = req.user;
  var kindleEmail = user.email;
  BookModel
    .create({
      _user: user,
      url: req.body.bookUrl
    }, function(err, newBook) {
      bookUploader.sendBook(req.body.bookUrl, kindleEmail)
        .then(function() {
          newBook.update({ success: true }).exec();
          res.json({ info: 'success' });
        }).catch(function(err) {
          newBook.update({ error: err, success: false }).exec();
          next(err);
        });
    });
};

exports.index = function(req, res) {
  res.json({ info: 'success' });
};
