'use strict';
module.exports = function(sequelize, DataTypes) {
  var course = sequelize.define('course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.course.belongsToMany(models.user, {through: 'studentCourse'});
        models.course.belongsToMany(models.question, {through: 'questionCourse'})
        models.course.belongsTo(models.user, {as: 'professor'});
        models.course.hasOne(models.answer);
        models.course.hasOne(models.question);
      }
    }
  });
  return course;
};
