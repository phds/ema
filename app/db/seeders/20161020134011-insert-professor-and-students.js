'use strict';

var bcrypt = require('bcrypt');

/*

factor enum:

1 - Desmotivação
2 - Regulação externa frequencia
3 - Regulação externa social
4 - Regulação introjetada
5 - Regulação Identificada
6 - Regulação Integrada
7 - Regulação Intrínseca

*/

var questions = [
  {
    id: 1,
    text: "Sinceramente, eu não sei por que venho à disciplina",
    factor: 1,
    questionOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    text: "Eu realmente sinto que estou perdendo meu tempo na disciplina.",
    factor: 1,
    questionOrder: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    text: "Eu já tive boas razões para vir à disciplina, mas, agora, tenho dúvidas sobre continuar.",
    factor: 1,
    questionOrder: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    text: "Eu não vejo por que devo vir à disciplina.",
    factor: 1,
    questionOrder: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    text: "Eu não sei, eu não entendo o que estou fazendo na disciplina.",
    factor: 1,
    questionOrder: 16,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    text: "Eu não vejo que diferença faz vir à disciplina.",
    factor: 1,
    questionOrder: 19,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    text: "Porque educação é um privilégio.",
    factor: 6,
    questionOrder: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    text: "Porque o acesso ao conhecimento se dá na disciplina.",
    factor: 6,
    questionOrder: 18,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    text: "Por que estudar amplia os horizontes.",
    factor: 6,
    questionOrder: 26,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    text: "Venho à disciplina porque é isso que escolhi pra mim.",
    factor: 6,
    questionOrder: 27,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 11,
    text: "Venho a disciplina porque acho que a frequencia deve ser obrigatória.",
    factor: 2,
    questionOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 12,
    text: "Venho à disciplina para não receber faltas.",
    factor: 2,
    questionOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 13,
    text: "Venho à disciplina porque a presença é obrigatória.",
    factor: 2,
    questionOrder: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 14,
    text: "Venho à disciplina para conseguir a aprovação.",
    factor: 2,
    questionOrder: 14,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 15,
    text: "Caso a frequencia não fosse obrigatória, poucos alunos assistiriam às aulas.",
    factor: 2,
    questionOrder: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 16,
    text: "Venho à disciplina para provar a mim mesmo que sou capaz de completá-la.",
    factor: 4,
    questionOrder: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 17,
    text: "Venho por que é isso que esperam de mim.",
    factor: 4,
    questionOrder: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 18,
    text: "Para mostrar a mim mesmo que sou uma pessoa inteligente.",
    factor: 4,
    questionOrder: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 19,
    text: "Venho à disciplina porque quando eu sou bem sucedido me sinto importante.",
    factor: 4,
    questionOrder: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 20,
    text: "Porque quero mostrar a mim mesmo que posso ser bem sucedido nos meus estudos.",
    factor: 4,
    questionOrder: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 21,
    text: "Quero evitar que as pessoas me vejam como um aluno relapso.",
    factor: 4,
    questionOrder: 23,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 22,
    text: "Venho à disciplina por para não ficar em casa.",
    factor: 3,
    questionOrder: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 23,
    text: "Venho à disciplina porque enquanto estiver estudando não preciso trabalhar.",
    factor: 3,
    questionOrder: 29,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 24,
    text: "Ver meus amigos é o principal motivo pelo qual venho à disciplina.",
    factor: 3,
    questionOrder: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 25,
    text: "Por que acho que a cobrança de presença é necessária para que os alunos levem a disciplina à sério.",
    factor: 5,
    questionOrder: 22,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 26,
    text: "Venho à disciplina porque a frequencia nas aulas é necessaria para a aprendizagem.",
    factor: 5,
    questionOrder: 24,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 27,
    text: "Pelo prazer que tenho quando me envolvo em debates com pessoas interessantes.",
    factor: 7,
    questionOrder: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 28,
    text: "Porque pra mim a disciplina é um prazer.",
    factor: 7,
    questionOrder: 17,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 29,
    text: "Porque gosto muito de vir à disciplina.",
    factor: 7,
    questionOrder: 21,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

var users = [
  {
    id: 1,
    name: "Cristiano Araujo",
    email: "cristiano@araujo.com",
    password: bcrypt.hashSync('password', 10),
    isProfessor: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Daniel Oliveira",
    email: "daniel@oliveira.com",
    password: bcrypt.hashSync('password', 10),
    isProfessor: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "Pedro Castilho",
    email: "pedro@castilho.com",
    password: bcrypt.hashSync('password', 10),
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

var student_courses = [
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
];


var question_course = [];
for(var j = 1; j <= 2; j++){
  for(var i = 1; i <= 29; i++){
    question_course.push({
      question_id: i,
      course_id: j,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

var answers = [];
  for(var s = 1; s <= 2; s++){
  for(var qs = 1; qs <= question_course.length; qs++){
    answers.push({
      rating: Math.floor(Math.random() * 7) + 1,
      question_course_id: qs,
      student_id: s,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}


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
        .then(() => queryInterface.bulkDelete('questions'))
        .then(() => queryInterface.bulkDelete('courses'))
        .then(() => queryInterface.bulkDelete('student_course'))
        .then(() => queryInterface.bulkDelete('question_course'))
        .then(() => queryInterface.bulkInsert('questions', questions))
        .then(() => queryInterface.bulkInsert('users', users))
        .then(() => queryInterface.bulkInsert('courses', courses))
        .then(() => queryInterface.bulkInsert('question_course', question_course))
        .then(() => queryInterface.bulkInsert('student_course', student_courses))
        .then(() => queryInterface.bulkInsert('answers', answers))
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
      queryInterface.bulkDelete('student_course'),
      queryInterface.bulkDelete('questions'),
      queryInterface.bulkDelete('answers'),
      queryInterface.bulkDelete('question_course')
    ]
    return Promise.all(promises);

  }
};
