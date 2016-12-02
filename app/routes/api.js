'use strict';

var express = require('express');
var router  = express.Router();

var studentController  = require('../controllers/student');
var authController     = require('../controllers/auth');
var overviewController = require('../controllers/overview');
var courseController   = require('../controllers/course');

//TODO: adicionar authController.isProfessor e authController.isStudent


router.route('/student')
  .post(studentController.postStudent);

router.route('/login')
  .post(authController.generateToken);

router.route('/overview')
  .all(authController.isAuthenticated)
  .get(overviewController.getOverview);

router.route('/professor-overview')
  .all(authController.isAuthenticated)
  .get(overviewController.getProfessorOverview);

router.route('/course')
  .all(authController.isAuthenticated)
  .post(courseController.createCourse);

router.route('/course/add') //talvez isso deva ir pra studentController
  .all(authController.isAuthenticated)
  .post(courseController.addCourse);

router.route('/course/:course_id/list')
  .all(authController.isAuthenticated)
  .get(courseController.listCourse);

router.route('/course/:course_id/answer')
  .all(authController.isAuthenticated)
  .post(courseController.answerCourse);

router.route('/course/:course_id/details')
  .all(authController.isAuthenticated)
  .get(courseController.detailCourse);

module.exports = router;
