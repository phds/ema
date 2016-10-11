'use strict';
module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define('student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    undergraduation: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.student.belongsToMany(models.course, {through: 'studentCourse'});
        models.student.hasMany(models.answer);
      }
    }
  });
  return student;
};
