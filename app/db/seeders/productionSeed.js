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
    question_order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    text: "Eu realmente sinto que estou perdendo meu tempo na disciplina.",
    factor: 1,
    question_order: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    text: "Eu já tive boas razões para vir à disciplina, mas, agora, tenho dúvidas sobre continuar.",
    factor: 1,
    question_order: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    text: "Eu não vejo por que devo vir à disciplina.",
    factor: 1,
    question_order: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    text: "Eu não sei, eu não entendo o que estou fazendo na disciplina.",
    factor: 1,
    question_order: 16,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    text: "Eu não vejo que diferença faz vir à disciplina.",
    factor: 1,
    question_order: 19,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    text: "Porque educação é um privilégio.",
    factor: 6,
    question_order: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    text: "Porque o acesso ao conhecimento se dá na disciplina.",
    factor: 6,
    question_order: 18,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    text: "Por que estudar amplia os horizontes.",
    factor: 6,
    question_order: 26,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    text: "Venho à disciplina porque é isso que escolhi pra mim.",
    factor: 6,
    question_order: 27,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 11,
    text: "Venho a disciplina porque acho que a frequência deve ser obrigatória.",
    factor: 2,
    question_order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 12,
    text: "Venho à disciplina para não receber faltas.",
    factor: 2,
    question_order: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 13,
    text: "Venho à disciplina porque a presença é obrigatória.",
    factor: 2,
    question_order: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 14,
    text: "Venho à disciplina para conseguir a aprovação.",
    factor: 2,
    question_order: 14,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 15,
    text: "Caso a frequência não fosse obrigatória, poucos alunos assistiriam às aulas.",
    factor: 2,
    question_order: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 16,
    text: "Venho à disciplina para provar a mim mesmo que sou capaz de completá-la.",
    factor: 4,
    question_order: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 17,
    text: "Venho por que é isso que esperam de mim.",
    factor: 4,
    question_order: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 18,
    text: "Para mostrar a mim mesmo que sou uma pessoa inteligente.",
    factor: 4,
    question_order: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 19,
    text: "Venho à disciplina porque quando eu sou bem sucedido me sinto importante.",
    factor: 4,
    question_order: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 20,
    text: "Porque quero mostrar a mim mesmo que posso ser bem sucedido nos meus estudos.",
    factor: 4,
    question_order: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 21,
    text: "Quero evitar que as pessoas me vejam como um aluno relapso.",
    factor: 4,
    question_order: 23,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 22,
    text: "Venho à disciplina por para não ficar em casa.",
    factor: 3,
    question_order: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 23,
    text: "Venho à disciplina porque enquanto estiver estudando não preciso trabalhar.",
    factor: 3,
    question_order: 28,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 24,
    text: "Ver meus amigos é o principal motivo pelo qual venho à disciplina.",
    factor: 3,
    question_order: 29,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 25,
    text: "Por que acho que a cobrança de presença é necessária para que os alunos levem a disciplina à sério.",
    factor: 5,
    question_order: 22,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 26,
    text: "Venho à disciplina porque a frequência nas aulas é necessaria para a aprendizagem.",
    factor: 5,
    question_order: 24,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 27,
    text: "Pelo prazer que tenho quando me envolvo em debates com pessoas interessantes.",
    factor: 7,
    question_order: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 28,
    text: "Porque pra mim a disciplina é um prazer.",
    factor: 7,
    question_order: 17,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 29,
    text: "Porque gosto muito de vir à disciplina.",
    factor: 7,
    question_order: 21,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

var users = [
  {
    id: 1,
    name: "Cristiano Araujo",
    email: "cca2@cin.ufpe.br",
    password: bcrypt.hashSync('123', 10),
    isProfessor: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

var courses = [
  {
    id: 1,
    name: 'Projetão 2016.2',
    code: 'PROJ20162',
    prompt: 'Por que venho a aula de projetão?',
    professor_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Empreendimentos 2016.2',
    code: 'EMPR20162',
    prompt: 'Por que venho a aula de Empreendimentos?',
    professor_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()

  }
];

var question_course = [];
var id = 1;
for(var j = 1; j <= 2; j++){
  for(var i = 1; i <= 29; i++){
    question_course.push({
      id: id++,
      question_id: i,
      course_id: j,
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
        .then(() => queryInterface.bulkDelete('question_course'))
        .then(() => queryInterface.bulkInsert('questions', questions))
        .then(() => queryInterface.bulkInsert('users', users))
        .then(() => queryInterface.bulkInsert('courses', courses))
        .then(() => queryInterface.bulkInsert('question_course', question_course))
        .then(() => models.sequelize.query("ALTER SEQUENCE questions_id_seq RESTART WITH 30"))
        .then(() => models.sequelize.query("ALTER SEQUENCE users_id_seq RESTART WITH 2"))
        .then(() => models.sequelize.query("ALTER SEQUENCE courses_id_seq RESTART WITH 3"))
        .then(() => models.sequelize.query("ALTER SEQUENCE question_course_id_seq RESTART WITH 59"))
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
      queryInterface.bulkDelete('users'),
      queryInterface.bulkDelete('questions'),
    ]
    return Promise.all(promises);

  }
};
