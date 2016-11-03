'use strict';

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
    questionOrder: 1
  },
  {
    id: 2,
    text: "Eu realmente sinto que estou perdendo meu tempo na disciplina.",
    factor: 1,
    questionOrder: 7
  },
  {
    id: 3,
    text: "Eu já tive boas razões para vir à disciplina, mas, agora, tenho dúvidas sobre continuar.",
    factor: 1,
    questionOrder: 9
  },
  {
    id: 4,
    text: "Eu não vejo por que devo vir à disciplina.",
    factor: 1,
    questionOrder: 13
  },
  {
    id: 5,
    text: "Eu não sei, eu não entendo o que estou fazendo na disciplina.",
    factor: 1,
    questionOrder: 16
  },
  {
    id: 6,
    text: "Eu não vejo que diferença faz vir à disciplina.",
    factor: 1,
    questionOrder: 19
  },
  {
    id: 7,
    text: "Porque educação é um privilégio.",
    factor: 6,
    questionOrder: 12
  },
  {
    id: 8,
    text: "Porque o acesso ao conhecimento se dá na disciplina.",
    factor: 6,
    questionOrder: 18
  },
  {
    id: 9,
    text: "Por que estudar amplia os horizontes.",
    factor: 6,
    questionOrder: 26
  },
  {
    id: 10,
    text: "Venho à disciplina porque é isso que escolhi pra mim.",
    factor: 6,
    questionOrder: 27
  },
  {
    id: 11,
    text: "Venho a disciplina porque acho que a frequencia deve ser obrigatória.",
    factor: 2,
    questionOrder: 2
  },
  {
    id: 12,
    text: "Venho à disciplina para não receber faltas.",
    factor: 2,
    questionOrder: 3
  },
  {
    id: 13,
    text: "Venho à disciplina porque a presença é obrigatória.",
    factor: 2,
    questionOrder: 11
  },
  {
    id: 14,
    text: "Venho à disciplina para conseguir a aprovação.",
    factor: 2,
    questionOrder: 14
  },
  {
    id: 15,
    text: "Caso a frequencia não fosse obrigatória, poucos alunos assistiriam às aulas.",
    factor: 2,
    questionOrder: 25
  },
  {
    id: 16,
    text: "Venho à disciplina para provar a mim mesmo que sou capaz de completá-la.",
    factor: 4,
    questionOrder: 5
  },
  {
    id: 17,
    text: "Venho por que é isso que esperam de mim.",
    factor: 4,
    questionOrder: 8
  },
  {
    id: 18,
    text: "Para mostrar a mim mesmo que sou uma pessoa inteligente.",
    factor: 4,
    questionOrder: 10
  },
  {
    id: 19,
    text: "Venho à disciplina porque quando eu sou bem sucedido me sinto importante.",
    factor: 4,
    questionOrder: 15
  },
  {
    id: 20,
    text: "Porque quero mostrar a mim mesmo que posso ser bem sucedido nos meus estudos.",
    factor: 4,
    questionOrder: 20
  },
  {
    id: 21,
    text: "Quero evitar que as pessoas me vejam como um aluno relapso.",
    factor: 4,
    questionOrder: 23
  },
  {
    id: 22,
    text: "Venho à disciplina por para não ficar em casa.",
    factor: 3,
    questionOrder: 6
  },
  {
    id: 23,
    text: "Venho à disciplina porque enquanto estiver estudando não preciso trabalhar.",
    factor: 3,
    questionOrder: 29
  },
  {
    id: 24,
    text: "Ver meus amigos é o principal motivo pelo qual venho à disciplina.",
    factor: 3,
    questionOrder: 30
  },
  {
    id: 25,
    text: "Por que acho que a cobrança de presença é necessária para que os alunos levem a disciplina à sério.",
    factor: 5,
    questionOrder: 22
  },
  {
    id: 26,
    text: "Venho à disciplina porque a frequencia nas aulas é necessaria para a aprendizagem.",
    factor: 5,
    questionOrder: 24
  },
  {
    id: 27,
    text: "Pelo prazer que tenho quando me envolvo em debates com pessoas interessantes.",
    factor: 7,
    questionOrder: 4
  },
  {
    id: 28,
    text: "Porque pra mim a disciplina é um prazer.",
    factor: 7,
    questionOrder: 17
  },
  {
    id: 29,
    text: "Porque gosto muito de vir à disciplina.",
    factor: 7,
    questionOrder: 21
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

    return queryInterface.bulkDelete('questions')
            .then(queryInterface.bulkInsert('questions', questions));
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('questions');

  }
};
