const { Schema, model } = require('mongoose');
const questionSchema = require('./Question')

const quizSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
