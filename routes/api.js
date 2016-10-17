var express = require('express');
var router = express.Router();
var studentController = require('../controllers/student');

router.route('/student')
  .post(studentController.postStudent);

module.exports = router;
