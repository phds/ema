'use strict';
module.exports = function(sequelize, DataTypes) {
  var course = sequelize.define('course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.course.belongsToMany(models.user, {
          through: 'student_course',
          foreignKey: 'course_id'
        });
        models.course.belongsToMany(models.question, {
          through: 'question_course',
          foreignKey: 'course_id'
        });
        models.course.belongsTo(models.user, {as: 'professor'});
        models.course.hasOne(models.answer);
      }
    }
  });
  return course;
};
