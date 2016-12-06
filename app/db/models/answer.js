'use strict';
var jStat = require('jstat').jStat;
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
      getStudentAverage: function (courseId, studentId){
        var meansByFactor = [];
        var query = 'select questions.factor as factor, answers.rating as rating from answers' +
                    ' join question_course on answers.question_course_id = question_course.id' +
                    ' join questions on question_course.question_id = questions.id'+
                    ' where course_id = '+ courseId +' and student_id = ' + studentId;
        return sequelize.query(query, {type: sequelize.QueryTypes.SELECT}).then(function(answers) {

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
      getCourseStats: function (courseId) {
        var query = 'select student_id from student_course where answered = true and course_id = ' + courseId;
        var courseStats = [];
        return sequelize.query(query, {type: sequelize.QueryTypes.SELECT}).then((results) => {


          if(results.length === 0){
            return courseStats;
          }

          var promises = [];
          results.forEach((sc) => {
            promises.push(this.getStudentAverage(courseId, sc.student_id));
          });

          return Promise.all(promises).then((studentAverages) => {
            // console.log(studentAverages);

            for (var i = 1; i <= 7; i++){
              var averagesArray = _.map(studentAverages,(sa)=>{
                for(var j = 0; j< sa.length; j++){
                  if(sa[j].factor === i){
                      return sa[j].average;
                  }
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
          })

        });
      }
    }
  });
  return answer;
};
