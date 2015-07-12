'use strict';

var _ = require('lodash');
var bookUploader = require('../../components/book-uploader');

// Upload a book
exports.upload = function(req, res) {
  var user = req.user;
  var kindleEmail = user.kindleEmail;
  bookUploader.sendBook(req.body.bookUrl).then(function() {
    res.json({info: 'success'});
  }).catch(function(err) {
    console.log('error occured')
    handleError(res, err);
  })
};

exports.index = function(req, res) {
  res.json({info: 'success'});
}

function handleError(res, err) {
  return res.send(500, err);
}
