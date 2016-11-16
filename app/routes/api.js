'use strict';

var express = require('express');
var router  = express.Router();

var studentController = require('../controllers/student');
var authController    = require('../controllers/auth');
var overview          = require('../controllers/overview');


router.route('/student')
  .post(studentController.postStudent);

router.route('/login')
  .post(authController.generateToken);

router.route('/overview')
  .all(authController.isAuthenticated)
  .get(overview.getOverview);

module.exports = router;
