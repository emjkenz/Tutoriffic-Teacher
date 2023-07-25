import React, { useState } from 'react';
// import '../';
const generateUniqueId = require('generate-unique-id');

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answers: ['', '', '', ''] }]);

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setQuizDescription(e.target.value);
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };
  // console.log(quizTitle)
  // console.log(quizDescription)
  // console.log(questions)

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''] }]);
  };

  const saveQuiz = () => {
    const dataToSend = { id: generateUniqueId(), title: quizTitle, description: quizDescription, questions: questions };
    // Send the quiz data to the server or perform other actions
    console.log(dataToSend);
  };

  

  return (
    <div className="quiz-creator">
      <h1>Create Quiz</h1>

      <label htmlFor="quiz_title">Quiz Title:</label>
      <input type="text" id="quiz_title" value={quizTitle} onChange={handleTitleChange} />

      <label htmlFor="quiz_description">Quiz Description:</label>
      <textarea id="quiz_description" value={quizDescription} onChange={handleDescriptionChange} />

      <div id="questions_section">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <h3>Question {index + 1}:</h3>
            <input type="text" className="question_input" placeholder="Enter your question here" value={question.question} onChange={(e) => handleQuestionChange(e, index)} />
            <div className="answers">
              {question.answers.map((answer, answerIndex) => (
                <input key={answerIndex} type="text" className="answer" placeholder={`Enter answer ${answerIndex + 1}`} value={answer} onChange={(e) => handleAnswerChange(e, index, answerIndex)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={addQuestion}>Add Question</button>
      <button onClick={saveQuiz}>Save Quiz</button>
    </div>
  );
};

export default QuizCreator;