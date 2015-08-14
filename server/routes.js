/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var auth = require('./auth/auth.service');

module.exports = function(app) {
  // Insert routes below
  app.disable('etag');
  app.use('/api/books', require('./api/book'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/')
    .get(auth.hasAuthHeader(), function(req, res) {
      if(req.user){
        return res.sendfile(app.get('appPath') + '/app.html');
      }
      res.sendfile(app.get('appPath') + '/landing.html');
    });

  app.route('/*')
    .get(auth.hasAuthHeader(), function(req, res) {
      if( req.user || req.originalUrl === '/login' || req.originalUrl === '/signup'){
        return res.sendfile(app.get('appPath') + '/app.html');
      }
      res.redirect('/');
    });
};
