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
    }
  }, {
    freezeTableName: true
  });
  return studentCourse;
};
