'use strict';

var express = require('express');
var controller = require('./book.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.upload);

module.exports = router;
