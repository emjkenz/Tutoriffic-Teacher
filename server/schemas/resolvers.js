const { Quiz, Questions } = require('../models');

const resolvers = {
  Mutation: {
    saveQuiz: async (parent, {quizData}) => {
      const { id, title, description, questions } = quizData;

      console.log(id);
      console.log(title);
      console.log(description);
      console.log(questions);

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
