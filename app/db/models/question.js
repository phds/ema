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
      allowNull: true
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.question.belongsToMany(models.course, {through: 'questionCourse'});
        models.question.hasMany(models.answer);
        models.question.belongsTo(models.course);
      }
    },
    timestamps: false
  });
  return question;
};
