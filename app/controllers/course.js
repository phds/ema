var models = require('../db/models');

//TODO testar caso de erro

module.exports.createCourse = (req, res) => {
  var user = req.user;

  if(!user.isProfessor){
    return res.status(403).json({error: 'User cannot create course as student'});
  }

  models.course.create({
    name: req.body.name,
    code: req.body.code,
    prompt: req.body.prompt,
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


module.exports.addCourse = (req, res) => {
  var user = req.user;

  if(user.isProfessor){
    return res.status(403).json({error: 'User cannot create course as student'});
  }

  models.course.findOne({
    where: {
      code: req.body.code
    }
  }).then((course) => {
    if(!course){
      throw {error: 'Course not found!'};
    }
    return models.student_course.create({
      student_id: user.id,
      course_id: course.id,
      answered: false
    });
  }).then((sc) => {
    res.json({
      message: 'Course successfully added!'
    });
  }).catch((err) => {
    res.status(400).json(err);
  });
}

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
        questionOrder: qs[i].question.questionOrder,
        questionId: qs[i].id
      });
    }
    res.json(responseObject);
  }).catch ((err) => {
    res.status(400).json({
      error: 'couldn\'t list the course!',
      stacktrace: err
    });
  });
};

module.exports.answerCourse = (req, res) => {
  var user = req.user;

  if(user.isProfessor){
    return res.status(403).json({error: 'User cannot be a professor when posting response'});
  }

  var answers = req.body.answers;

  var formattedAnswers = [];
  for(i = 0; i < answers.length; i++) {
    formattedAnswers.push({
      rating: answers[i].rating,
      question_course_id: answers[i].questionId,
      student_id: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  models.answer.bulkCreate(formattedAnswers).then(() => {
    models.student_course.findOne({
      where: {
        course_id: req.params.course_id,
        student_id: user.id
      }
    }).then((sc) => {
      return sc.update({answered: true});
    }).then(() => {
      res.json({
        message: "answers added successfully!"
      });
    });
  });
};

//gets all the answers
module.exports.detailCourse = (req, res) => {
}
