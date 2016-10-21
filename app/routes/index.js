'use strict';

var express = require('express');
var router = express.Router();
var Student = require('../models').student;

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express', content: "student created with success" });
    // res.render('overview');
});

module.exports = router;
