'use strict';
module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define('student', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.CHAR,
    birthday: DataTypes.DATEONLY,
    course: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return student;
};