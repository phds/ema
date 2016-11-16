'use strict';
var models = require('../db/models');

module.exports.getOverview = (req, res) => {

  var user = req.user; //user straight from the database
  if(!!user.isProfessor){
    return res.json({
      error: 'logged used is not a student!'
    });
  }

  console.log(user);

  models.student_course.findAll({
    where:{
      student_id: user.id
    }
  }).then((sc) => {

    var response = [];

    if(sc.length == 0){
      return res.json(response);
    }

    var j = 0;
    for(var i = 0; i< sc.length; i++){
      models.course.findOne({
          where: {
            id: sc[i].courseId
          }
        }).then((course) => {
          var instance = sc[j++];

          response.push({
            courseId: course.id,
            courseName: course.name,
            answered: instance.answered
          });

          if(j == sc.length){
            console.log(response);
            return res.json(response);
          }
      });
    }
  })
};
