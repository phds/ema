'use strict';
module.exports = function(sequelize, DataTypes) {
  var professor = sequelize.define('professor', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return professor;
};