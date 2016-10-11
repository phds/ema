'use strict';
module.exports = function(sequelize, DataTypes) {
  var answer = sequelize.define('answer', {
    rating: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return answer;
};