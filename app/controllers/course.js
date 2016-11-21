var models = require('../db/models');

module.exports.createCourse = (req, res) => {
  var user = req.user;

  if(!user.isProfessor){
    return res.status(403).json({error: 'User cannot create course as student'});
  }

  models.course.create({
    name: req.body.name,
    code: req.body.code,
    professor_id: user.id
  }).then((course) => {
    var objectsToInsert = [];
    for(var i = 1; i<= 29; i++){
      objectsToInsert.push({
        question_id: i,
        course_id: course.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return models.question_course.bulkCreate(objectsToInsert);
  }).then((qs) => {
    res.status(200).json({message: 'Course created with success!'});
  }).catch((err) => {
    res.status(500).json({
      error: 'couldn\'t create the course!',
      stacktrace: err
    });
  });
};

module.exports.listCourse = (req, res) => {


  var responseObject;
  models.question_course.findAll({
    where: {
      course_id: req.params.course_id
    },
    include: [{
      model: models.course
    },
    {
      model: models.question
    }]
  }).then((qs) => {
    responseObject = {
      courseId: qs[0].course.id,
      prompt: qs[0].course.prompt,
      questions: []
    };

    for(var i = 0; i < qs.length; i++){
      responseObject.questions.push({
        text: qs[i].question.text,
        questionOrder: qs[i].question.question_order,
        questionId: qs[i].id
      });
    }
    
    res.json(responseObject);
  });
};

module.exports.answerCourse = (req, res) => {
  var user = req.user;

  if(user.isProfessor){
    return res.status(403).json({error: 'User cannot be a professor when posting response'});
  }


};
