'use strict';

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isProfessor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    undergrad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    undergradStartDate: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};
