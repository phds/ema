'use strict';

var models = require('./index.js');
var _      = require('underscore');

module.exports = function(sequelize, DataTypes) {
  var studentCourse = sequelize.define('student_course', {
    answered: { // if the questionnarie has been answered
      type: DataTypes.BOOLEAN
    }
  }, {
    freezeTableName: true,
    associate: function(models) {
      models.student_course.belongsTo(models.course, {
        foreignKey: 'course_id'
      });
      models.student_course.belongsTo(models.user, {
        foreignKey: 'student_id',
      });
    },
    classMethods: {
      getTotalNumberOfResponses: function(courseId){
        return this.count({
          where: {
            answered: true,
            course_id: courseId
          }
        });
      },
      getStudentsStats: function(courseId){

        return this.findAll({
          where:{
            course_id: courseId,
            answered: true
          },
        }).then((students)=> {
          var studentIds = [];
          for (var i = 0; i < students.length; i++) {
            studentIds.push(students[i].student_id);
          }
          return studentIds;
        }).then((studentIds) =>{
          return sequelize.models.user.findAll({
            where: {
              id: studentIds
            }
          }).then((students) => {
            var promises = _.map(students, (student) => {
              return sequelize.models.answer.getStudentAverage(courseId, student.id);
            });

            return Promise.all(promises).then((averages) => {
              var responseObject = [];
              for (var i = 0; i < students.length; i++) {
                students[i].stats = averages[i];
                responseObject.push({
                  averages: averages[i],
                  name: students[i].name
                });
              }
              return responseObject;
            });

          });
        });
      }
    }
  });
  return studentCourse;
};
