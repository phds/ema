'use strict';

var user = require('../models').user;
var course = require('../models').course;
var studentCourse = require('../models').student_course;

var users = [
  {
    id: 1,
    name: "Cristiano Araujo",
    email: "cristiano@araujo.com",
    password: "password",
    isProfessor: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Daniel Oliveira",
    email: "daniel@oliveira.com",
    password: "password",
    isProfessor: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "Pedro Castilho",
    email: "pedro@castilho.com",
    password: "password",
    isProfessor: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

var courses = [
  {
    id: 1,
    name: 'Projetão 2016.2',
    code: 'PROJ20162',
    professor_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Empreendimentos 2016.2',
    code: 'EMPR20162',
    professor_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()

  }
];

var stud_courses = [
  {
    course_id: 1,
    student_id: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    course_id: 1,
    student_id: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    var finalPromise = new Promise(function(resolve, reject){
      queryInterface.bulkDelete('users')
        .then(() => queryInterface.bulkDelete('courses'))
        .then(() => queryInterface.bulkDelete('student_course'))
        .then(() => queryInterface.bulkInsert('users', users))
        .then(() => queryInterface.bulkInsert('courses', courses))
        .then(() => queryInterface.bulkInsert('student_course', stud_courses))
        .then(resolve)
        .catch((err)=>{
          console.log(err);
        });
    });

    return finalPromise;

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    var promises = [
      queryInterface.bulkDelete('courses'),
      queryInterface.bulkDelete('users'),
      queryInterface.bulkDelete('student_course')
    ]
    return Promise.all(promises);

  }
};
