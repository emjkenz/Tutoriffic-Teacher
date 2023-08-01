import React, { useState } from 'react';
// import './QuizCreator.css'
import { useMutation } from '@apollo/client';
import { SAVE_QUIZ } from '../../utils/mutations';
import { DatePicker, Form, Input, Button } from 'antd';
import './QuizCreator.css'
const generateUniqueId = require('generate-unique-id');

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answers: ['', '', '', ''] }]);
  const [date, setDate] = useState('');

  const [saveQuiz, { error }] = useMutation(SAVE_QUIZ);

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setQuizDescription(e.target.value);
  };

  const handleDateChange = (date) => {
        setDate(date);
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
    const dataToSend = { id: generateUniqueId(), title: quizTitle, description: quizDescription, date: date, questions: questions }; 
    
    const { data } = await saveQuiz({
      variables: { quizData: dataToSend }
    })

    setQuizTitle('');
    setQuizDescription('');
    setQuestions([{ question: '', answers: ['', '', '', ''] }]);
    setDate('');
  };

  

  return (
    <>
      <h1>Create A Quiz</h1>
      <Form>
          <Form.Item
              label="Quiz Title"
              rules={[
                  {
                      type: 'text',
                  },
                  {
                      required: true,
                      message: 'Please input a Quiz Title!',
                  },
              ]}
          >
              <Input
                value={quizTitle}
                onChange={handleTitleChange}
              />
          </Form.Item>

        <Form.Item
              label="Quiz Description"
              rules={[
                  {
                      type: 'text',
                  },
              ]}
          >
              <Input 
              value={quizDescription}
              onChange={handleDescriptionChange}
              />
          </Form.Item>

          <Form.Item
              label="Due Date:"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <DatePicker onChange={(date) => handleDateChange(date)} />
          </Form.Item>
      

        <div id="questions_section">
          {questions.map((question, index) => (
            <div key={index} className="question">
              <h3>Question {index + 1}:</h3>
            <Form.Item
              label="Question"
              rules={[
                {
                    type: 'text',
                },
                {
                  required: true,
                  message: 'Please input a Heading!',
                },
              ]}
            >
              <Input
                  value={question.question}
                  onChange={(e) => handleQuestionChange(e, index)}
              />
            </Form.Item>
              <div className="answers">
                {question.answers.map((answer, answerIndex) => (
                  <Form.Item
                    key={answerIndex}
                    label={`Answer ${answerIndex + 1}`}
                    rules={[
                        {
                            type: 'text',
                        },
                    ]}
                  >
                    <Input 
                      value={answer}
                      onChange={(e) => handleAnswerChange(e, index, answerIndex)}
                    />
                  </Form.Item>

                  
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={addQuestion}>Add Question</Button>
        <Button onClick={handleQuizSave}>Save Quiz</Button>
      </Form>
    </>
  );
};

export default QuizCreator;