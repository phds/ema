'use strict';
module.exports = function(sequelize, DataTypes) {
  var answer = sequelize.define('answer', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.answer.belongsTo(models.question_course, {
          foreignKey: 'question_course_id',
          constraints: false
        });
        models.answer.belongsTo(models.user, {foreignKey: 'student_id'});
      }
    }
  });
  return answer;
};
