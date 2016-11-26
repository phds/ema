'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/overview', (req, res, next) => {
  res.render('overview');
});

router.get('/questionnarie', (req, res, next) => {
  res.render('questions');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

module.exports = router;
