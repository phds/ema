'use strict';

var bcrypt = require('bcrypt');

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
    instanceMethods: {
      comparePassword: function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
      }
    },
    hooks: {
      beforeCreate: function(user, options){
        var hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
      },
      beforeUpdate: function(user, options){
        var hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
      }
    },
    classMethods:{
      associate: function(models) {
        models.user.belongsToMany(models.course,{
          through: 'student_course',
          foreignKey: 'student_id'
        });
      }
    }
  });
  return user;
};
