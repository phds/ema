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
