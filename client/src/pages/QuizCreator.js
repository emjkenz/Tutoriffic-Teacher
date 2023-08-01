import React, { useState } from 'react';
import './QuizCreator.css';
import { useMutation } from '@apollo/client';
import { SAVE_QUIZ } from '../utils/mutations';
const generateUniqueId = require('generate-unique-id');

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answers: ['', '', '', ''] }]);
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  const [saveQuiz] = useMutation(SAVE_QUIZ);

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setQuizDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''] }]);
  };

  const handleQuizSave = async () => {
    // Perform form validation before saving the quiz
    const validationErrors = {};
    if (!quizTitle.trim()) {
      validationErrors.quizTitle = 'Quiz title is required.';
    }
    if (!quizDescription.trim()) {
      validationErrors.quizDescription = 'Quiz description is required.';
    }
    if (!date) {
      validationErrors.date = 'Due date is required.';
    }
    questions.forEach((question, index) => {
      if (!question.question.trim()) {
        validationErrors[`question_${index}`] = 'Question is required.';
      }
      question.answers.forEach((answer, answerIndex) => {
        if (!answer.trim()) {
          validationErrors[`answer_${index}_${answerIndex}`] = `Answer ${answerIndex + 1} for question ${index + 1} is required.`;
        }
      });
    });

    // If there are validation errors, display them and prevent saving the quiz
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with saving the quiz if there are no validation errors
    const dataToSend = {
      id: generateUniqueId(),
      title: quizTitle,
      description: quizDescription,
      date: date,
      questions: questions,
    };

    console.log(dataToSend);

    try {
      await saveQuiz({
        variables: { quizData: dataToSend },
      });

      // Clear form data after successful save
      setQuizTitle('');
      setQuizDescription('');
      setQuestions([{ question: '', answers: ['', '', '', ''] }]);
      setDate('');
      setErrors({});
    } catch (error) {
      // Handle error here if needed
      console.error(error);
    }
  };

  return (
    <div className="quiz-creator">
      <h1>Create Quiz</h1>

      <label htmlFor="quiz_title">Quiz Title:</label>
      <input type="text" id="quiz_title" value={quizTitle} onChange={handleTitleChange} />
      {errors.quizTitle && <span className="error-message">{errors.quizTitle}</span>}

      <label htmlFor="quiz_description">Quiz Description:</label>
      <textarea id="quiz_description" value={quizDescription} onChange={handleDescriptionChange} />
      {errors.quizDescription && <span className="error-message">{errors.quizDescription}</span>}

      <label htmlFor="due_date">Due Date:</label>
      <input type="date" id="due_date" value={date} onChange={handleDateChange} />
      {errors.date && <span className="error-message">{errors.date}</span>}

      <div id="questions_section">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <h3>Question {index + 1}:</h3>
            <input type="text" className="question_input" placeholder="Enter your question here" value={question.question} onChange={(e) => handleQuestionChange(e, index)} />
            {errors[`question_${index}`] && <span className="error-message">{errors[`question_${index}`]}</span>}
            <div className="answers">
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <input type="text" className="answer" placeholder={`Enter answer ${answerIndex + 1}`} value={answer} onChange={(e) => handleAnswerChange(e, index, answerIndex)} />
                  {errors[`answer_${index}_${answerIndex}`] && <span className="error-message">{errors[`answer_${index}_${answerIndex}`]}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleQuizSave}>Save Quiz</button>
    </div>
  );
};

export default QuizCreator;
