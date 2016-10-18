var express = require('express');
var router = express.Router();
var studentController = require('../controllers/student');
var authController = require('../controllers/auth');



router.route('/student')
  .post(studentController.postStudent);

router.route('/token')
  .post(authController.generateToken);

module.exports = router;
