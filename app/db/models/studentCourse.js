'use strict';

var models = require('./index.js');

module.exports = function(sequelize, DataTypes) {
  var studentCourse = sequelize.define('student_course', {
    studentId: {
      type: DataTypes.INTEGER,
      model: models.user,
      key: 'id',
      field: 'student_id'
    },
    courseId: {
      type: DataTypes.INTEGER,
      model: models.course,
      key: 'id',
      field: 'course_id'
    },
    answered: { // if the questionnarie has been answered
      type: DataTypes.BOOLEAN
    }
  }, {
    freezeTableName: true,
    classMethods: {
      getTotalNumberOfResponses: function(courseId){
        return this.count({
          where: {
            answered: true,
            courseId: courseId
          }
        });
      }
    }
  });
  return studentCourse;
};
