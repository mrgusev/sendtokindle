var q = require('q');
var request = require('request');
var nodemailer = require('nodemailer');
var config = require('../../config/environment');

var transporter = nodemailer.createTransport("SMTP", {
  auth: {
    user: config.smtp.username,
    pass: config.smtp.password
  }
});

function downloadBook(bookUrl){

}

exports.sendBook = function(bookUrl, destinationEmail) {
  var deferred = q.defer();
  console.log('Sending an email...');

  if(!bookUrl){
    deferred.reject(new Error('No book url specified'));
  }
  transporter.sendMail({
    from: 'services.mrgusev@gmail.com',
    to: destinationEmail,
    attachments: [{
      filePath: bookUrl,
      fileName: 'newItem.mobi'
      //streamSource
    }]
  }, function(err, info) {
    if(err) {
      console.log(err);
      return deferred.reject(err);}
    console.log('Email sent...');
    deferred.resolve(info);
  });
  return deferred.promise;
};
