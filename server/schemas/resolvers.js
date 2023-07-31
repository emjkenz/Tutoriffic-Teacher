
const { Quiz, Questions, User} = require('../models');
console.log(User); 
const { signToken } = require('../utils/auth');
const { Quiz, Question, Student, Grade } = require('../models');


const resolvers = {
  Query: {
    quizzes: async () => {
      return await Quiz.find();
    },
    quiz: async (parent, { id }) => {
      const foundQuiz = await Quiz.findOne({ id: id });
      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }
      return foundQuiz;
    },

    students: async () => {
      return await Student.find();
    },

    grades: async () => {
      return await Grade.find();
    }
  },
  Mutation: {
    saveQuiz: async (parent, { quizData }) => {
      const { id, title, description, dueDate, questions } = quizData;
      return await Quiz.create({
        id,
        title,
        description,
        dueDate,
        questions,
      });
    },
    removeQuiz: async (parent, { id }) => {
      const foundQuiz = await Quiz.findOne({ id: id });
      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }
      const { title, questions, dueDate } = foundQuiz;
      await Quiz.deleteOne({ id });
      return { id, title, description: foundQuiz.description, dueDate, questions };
    },
    addUser: async (parent, { userData }) => {
      console.log('Received User Data:', userData);
      const { firstName, lastName, email, password } = userData;
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;


