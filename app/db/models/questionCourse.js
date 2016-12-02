'use strict';

var models = require('./index.js');

module.exports = function(sequelize, DataTypes) {
  var questionCourse = sequelize.define('question_course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.question_course.hasMany(models.answer, {
          foreignKey: 'question_course_id'
        });
        models.question_course.belongsTo(models.course, {
          foreignKey: 'course_id'
        });
        models.question_course.belongsTo(models.question, {
          foreignKey: 'question_id'
        });
      }
    },
    freezeTableName: true
  });
  return questionCourse;
};
