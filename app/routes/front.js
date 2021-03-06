'use strict';

var express = require('express');
var router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Homepage'
  });
});

router.get('/overview', (req, res, next) => {
  res.render('overview', {
    title: 'Overview'
  });
});

router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Registrar Nova Conta'
  });
});

router.get('/questions/:course_id', (req, res, next) => {
  res.render('questions', {
    course_id: req.params.course_id,
    title: 'Responder Questionário'
  });
});

router.get('/professor/overview/', (req, res, next) => {
  res.render('professor-overview', {
    title: 'Overview'
  });
});

router.get('/course/:course_id', (req, res) => {
  res.render('course', {
    course_id: req.params.course_id,
    title: 'Detalhes do curso'
  });
});

module.exports = router;
