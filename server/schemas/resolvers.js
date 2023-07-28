const { Quiz, Lesson } = require('../models');

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
    },
    lessons: async () => {

      return await Lesson.find();
    },
    lesson: async (parent, { id }) => {

      const foundLesson = await Lesson.findOne({ id: id });

      if (!foundLesson) {
        throw new Error('Cannot find a lesson with this id!');
      }

      return foundLesson;
    },
  },
  Mutation: {
    saveQuiz: async (parent, {quizData}) => {
      const { id, title, description, dueDate, questions } = quizData;

      return await Quiz.create({
        id,
        title,
        description,
        dueDate,
        questions
      })
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
    saveLesson: async (parent, { lessonData }) => {
      const { id, title, sections } = lessonData;

      return await Lesson.create({
        id,
        title,
        sections
      })
    },
    removeLesson: async (parent, { id }) => {
      const foundLesson = await Lesson.findOne({ id: id });

      if (!foundLesson) {
        throw new Error('Cannot find a lesson with this id!');
      }

      const { title, sections } = foundLesson;

      await Lesson.deleteOne({ id });

      return { id, title, sections };
    },
  },
};

module.exports = resolvers;
