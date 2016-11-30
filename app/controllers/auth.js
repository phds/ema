'use strict';

var user = require('../db/models').user;
var jwtToken = require('../util/jwtToken');

module.exports.generateToken = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  if(!email || !password){
    return res.status(400).json({error: 'Missing email and/or password from request body'});
  }

  user.findOne({
    where:{
      email: email
    }
  }).then((user) => {
    user.comparePassword(password, (err, isMatch) => {
      if(err) {
        return res.json({error: err});
      }
      if(isMatch){
        var token = jwtToken.issueToken({id:user.id});
        return res.json({
          token: token,
          isProfessor: user.isProfessor
        });
      }
      else{
        res.status(400).json({error: 'Invalid email/password combination'});
      }
    });
  }).catch((err) => {
    res.status(400).json({error: 'Invalid email/password combination'});
  });
};

module.exports.isAuthenticated = (req, res, next) => {

  var userId = jwtToken.verifyToken(req.header('token'), (err, payload) => {
    if(err) {
      res.status(401).json({error: 'Invalid authentication token!'});
    };

    user.findOne({
      where: {
        id: payload.id
      }
    }).then((user) => {
      req.user = user;
      next();
    }).catch((err) => {
      res.status(401).json({error: 'Authentication failed!'});
      return req.end();
    });
  });
};
