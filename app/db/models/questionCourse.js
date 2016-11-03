'use strict';

var models = require('./index.js');

module.exports = function(sequelize, DataTypes) {
  var questionCourse = sequelize.define('question_course', {
    questionId: {
      type: DataTypes.INTEGER,
      model: models.question,
      key: 'id',
      field: 'question_id'
    },
    courseId: {
      type: DataTypes.INTEGER,
      model: models.course,
      key: 'id',
      field: 'course_id'
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.question_course.hasMany(models.answer, {
          foreignKey: 'question_course_id'
        });
      }
    },
    freezeTableName: true
  });
  return questionCourse;
};
