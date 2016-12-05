'use strict';

var user = require('../db/models').user;

module.exports.postStudent = (req, res) => {
  user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isProfessor: false,
    gender: req.body.gender ? req.body.gender : null,
    birthday: req.body.birthday ? req.body.birthday : null,
    undergrad: req.body.undergrad ? req.body.undergrad : null,
    undergradStartDate: req.body.undergradStartDate ? req.body.undergradStartDate : null
  }).then((user) => {
    res.json({
      message: 'User ' + user.name + ' created with success!',
      token: user.getAuthToken(),
    });
  }).catch((err) =>{

    res.status(400).json({error: 'Email already in use!', stacktrace:err});
  });
};
