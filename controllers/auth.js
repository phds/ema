var user = require('../models').user;
var jwtToken = require('../util/jwtToken');

module.exports.generateToken = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  user.findOne({email: email}).then((user) => {
    user.comparePassword(password, (err, isMatch) => {
      if(err) {
        return res.json({error: err.name});
      }
      if(isMatch){
        token = jwtToken.issueToken({id:user.id});
        console.log(token);
        res.json({token: token});
      }
      else{
        res.json({error: 'Invalid email/password combination'});
      }
    });
  }).catch((err) => {
    res.json({error: 'Invalid email/password combination'});
  });
}

module.exports.isAuthenticated = (req, res, next) => {

  var userId = jwtToken.verifyToken(req.header('token'), (err, payload) => {
    if(err) return res.json({error: 'Invalid token!'});

    user.findOne({id: userId}).then((user) => {
      req.user = user;
      return next();
    }).catch((err) => {
      return res.json({error: 'Authentication failed!'});
    });
  });
}
