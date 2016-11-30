'use strict';

var user = require('../db/models').user;

module.exports.postStudent = (req, res) => {
  user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isProfessor: false,
    gender: req.body.gender ? req.body.gender : null,
    undergrad: req.body.undergrad ? req.body.undergrad : null,
    undergradStartDate: req.body.undergradStartDate ? req.body.undergradStartDate : null
  }).then((user) => {
    res.json({
      message: 'User ' + user.name + ' created with success!',
      password: user.password,
      token: user.getAuthToken()
    });
    //TODO:consider returning the token from here
  }).catch((err) =>{
    res.status(400).json({error: 'Email already in use!'});
  });
};
