var express = require('express');
var router = express.Router();
var Student = require('../models').student;

/* GET home page. */
router.get('/', function(req, res, next) {
  Student.create({
    name: 'a',
    email: 'b'
  }).then(function(){
    res.render('index', { title: 'Express', content: "student created with success" });
  });
});

module.exports = router;
