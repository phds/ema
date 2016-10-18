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
        models.answer.belongsTo(models.question);
        models.answer.belongsTo(models.user, {as: 'student'});
        models.answer.belongsTo(models.course);
      }
    }
  });
  return answer;
};
