'use strict';

/*
factor enum:

1 - Desmotivação
2 - Regulação externa frequencia
3 - Regulação externa social
4 - Regulação introjetada
5 - Regulação Identificada
6 - Regulação Integrada
7 - Regulação Intrínseca
*/

module.exports = function(sequelize, DataTypes) {
  var question = sequelize.define('question', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    factor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
