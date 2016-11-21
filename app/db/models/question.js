'use strict';
module.exports = function(sequelize, DataTypes) {
  var question = sequelize.define('question', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    factor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    questionOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'question_order'
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.question.belongsToMany(models.course, {
          through: 'question_course',
          foreignKey: 'question_id'
        });
        models.question.hasMany(models.question_course, {
          foreignKey: 'question_id'
        });
      }
    }
  });
  return question;
};
