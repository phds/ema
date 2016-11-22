'use strict';

var express = require('express');
var router  = express.Router();

var studentController  = require('../controllers/student');
var authController     = require('../controllers/auth');
var overviewController = require('../controllers/overview');
var courseController   = require('../controllers/course');

router.route('/student')
  .post(studentController.postStudent);

router.route('/login')
  .post(authController.generateToken);

router.route('/overview')
  .all(authController.isAuthenticated)
  .get(overviewController.getOverview);

router.route('/course')
  .all(authController.isAuthenticated)
  .post(courseController.createCourse);

router.route('/course/:course_id/list')
  .all(authController.isAuthenticated)
  .get(courseController.listCourse);

router.route('/course/:course_id/answer')
  .all(authController.isAuthenticated)
  .post(courseController.answerCourse);


module.exports = router;
