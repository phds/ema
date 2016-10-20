'use strict';

var users = [
  {
    name: "Cristiano Araujo",
    email: "cristiano@araujo.com",
    password: "password",
    isProfessor: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Daniel Oliveira",
    email: "daniel@oliveira.com",
    password: "password",
    isProfessor: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Pedro Castilho",
    email: "pedro@castilho.com",
    password: "password",
    isProfessor: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

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

    return queryInterface.bulkInsert('users', users);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});

  }
};
