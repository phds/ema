'use strict';
module.exports = function(sequelize, DataTypes) {
  var question = sequelize.define('question', {
    text: DataTypes.STRING,
    factor: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return question;
};