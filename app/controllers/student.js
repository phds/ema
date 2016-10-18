var user = require('../db/models').user;

module.exports.postStudent = (req, res) => {
  user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isProfessor: false,
    gender: req.body.gender ? req.body.gender : null,
    birthday: null, //TODO: set birthday
    undergrad: req.body.undergrad ? req.body.undergrad : null,
    undergradStartDate: req.body.undergradStartDate ? req.body.undergradStartDate : null
  }).then((user) => {
    res.json({
      message: 'User ' + user.name + ' created with success!',
      password: user.password
    });
  }).catch((err) =>{
    //TODO: send clearer messages for specific errors
    res.status(500).json({error: err.errors[0].message});
  })
};
