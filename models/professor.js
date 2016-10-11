'use strict';
module.exports = function(sequelize, DataTypes) {
  var professor = sequelize.define('professor', {
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
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.professor.hasMany(models.course);
      }
    }
  });
  return professor;
};
