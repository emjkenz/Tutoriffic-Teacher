const { Quiz, Questions } = require('../models');

const resolvers = {
  Query: {
    quizzes: async () => {

      return await Quiz.find();
    },
    quiz: async (parent, { id }) => {

      const foundQuiz = await Quiz.findOne({id: id});

      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }

      return foundQuiz;
    }
  },
  Mutation: {
    saveQuiz: async (parent, {quizData}) => {
      const { id, title, description, questions } = quizData;

      return await Quiz.create({
        id,
        title,
        description,
        questions
      })
    }
  },
};

module.exports = resolvers;
