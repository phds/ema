'use strict';
var jStat = require('jStat').jStat;
var _     = require('underscore');
module.exports = function(sequelize, DataTypes) {
  var answer = sequelize.define('answer', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.answer.belongsTo(models.question_course, {foreignKey: 'question_course_id'});
        models.answer.belongsTo(models.user, {foreignKey: 'student_id'});
      },
      //TODO: arrumar essas duas funcoes
      getStudentAverage: function(studentId, courseId){
        var meansByFactor = [];
        var query = 'select questions.factor as factor, answers.rating as rating from answers' +
                    ' join question_course on answers.question_course_id = question_course.id' +
                    ' join questions on question_course.question_id = questions.id'+
                    ' where course_id = '+ courseId +' and student_id = ' + studentId;
        sequelize.query(query, {type: sequelize.QueryTypes.SELECT}).then(function(answers) {

          if(answers.length === 0){
            return meansByFactor;
          }

          for (var i = 1; i <= 7; i++) {
            var answersByFactor = _.where(answers, {factor: i});
            var answersArray    = _.pluck(answersByFactor, 'rating');
            meansByFactor.push({
              factor: i,
              average: jStat.mean(answersArray)
            });
          }
          return meansByFactor;
        });
      },
      getCourseStats: function(courseId){
        var query = 'select student_id from student_course where course_id = ' + courseId;
        var courseStats = [];
        sequelize.query(query, {type: sequelize.QueryTypes.SELECT}).then((studentIds) => {

          if(studentIds.length === 0){
            return courseStats;
          }

          var studentAverages = [];
          studentIds.forEach((studentId) => {
            studentAverages.push(this.getStudentAverage(studentId, courseId));
          });
          console.log(studentAverages);
          for (var i = 1; i <= 7; i++){
            var averagesArray = _.map(studentAverages,(sa)=>{
              if(sa.factor === i){
                  return sa.average;
              }
            });

            courseStats.push({
              factor: i,
              mean: jStat.mean(averagesArray),
              stdev: jStat.stdev(averagesArray),
              min: jStat.min(averagesArray),
              max: jStat.max(averagesArray)
            });
          }
          return courseStats;
        });
      }
    }
  });
  return answer;
};
