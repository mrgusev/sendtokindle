var q = require('q');
var _ = require('lodash');
var request = require('request');
var nodemailer = require('nodemailer');
var config = require('../../config/environment');
var fileType = require('file-type');
var url = require("url");
var path = require("path");
var http = require('http');
var mime = require('mime');

var supprotedFormats = [
  'doc',
  'docx',
  'html',
  'htm',
  'rtf',
  'jepg',
  'jpg',
  'mobi',
  'gif',
  'png',
  'bmp',
  'pdf'
];

var transporter = nodemailer.createTransport("SMTP", {
  auth: {
    user: config.smtp.username,
    pass: config.smtp.password
  }
});

function detectFileType(bookUrl, headers) {
  var regexp = /filename=\"(.*)\"/gi;
  var contentDisposition;
  var urlFileName;
  var contentType;

  if(headers['location']){
    bookUrl = headers['location'];
  }
  var parsed = url.parse(bookUrl);

  contentDisposition = regexp.exec(headers['content-disposition'])
    ? regexp.exec(headers['content-disposition'])[1] : '';
  urlFileName = path.extname(parsed.pathname).substring(1);
  contentType = mime.extension(headers['content-type']);

  if (contentDisposition && _.contains(supprotedFormats, contentDisposition)) {
    return contentDisposition;
  } else if (urlFileName && _.contains(supprotedFormats, urlFileName)) {
    return urlFileName;
  } else if (contentType && _.contains(supprotedFormats, contentType)) {
    return contentType;
  }

  console.log(contentDisposition, ' - ' , urlFileName, ' - ', contentType);
  return '';
}

exports.sendBook = function(bookUrl, destinationEmail) {
  var deferred = q.defer();
  console.log('Sending an email...');

  if (!bookUrl) {
    deferred.reject(new Error('No book url specified'));
  }
  http.get(bookUrl, function(res) {
    var ext = detectFileType(bookUrl, res.headers);
    if(!ext){
      return deferred.reject('No supported file type was found by this link')
    }
    console.log('File type is:', ext);
    transporter.sendMail({
      from: 'services.mrgusev@gmail.com',
      to: destinationEmail,
      attachments: [{
        filePath: bookUrl,
        fileName: 'uploaded-from-justsendtokindle.'+ ext
      }]
    }, function(err, info) {
      if (err) {
        console.log(err);
        return deferred.reject(err);
      }
      console.log('Email sent...');
      deferred.resolve(info);
    });
    deferred.resolve(true);
  });

  return deferred.promise;
};
