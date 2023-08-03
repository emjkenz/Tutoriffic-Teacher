import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Button, Card } from 'antd';
import { DeleteOutlined } from "@ant-design/icons"

import { QUERY_ALL_QUIZZES } from '../../utils/queries'
import { DELETE_QUIZ } from '../../utils/mutations'
import '../../pages/cardDashboard.css'



const QuizList = ({ quizzes, title }) => {
    const [deleteQuiz, { error }] = useMutation(DELETE_QUIZ, {
        update(cache, { data: { removeQuiz } }) {
            try {
                const { quizzes } = cache.readQuery({ query: QUERY_ALL_QUIZZES });

                const updatedQuizzes = quizzes.filter(quiz => quiz.id !== removeQuiz.id);

                cache.writeQuery({
                    query: QUERY_ALL_QUIZZES,
                    data: { quizzes: updatedQuizzes },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    if (!quizzes.length) {
        return <h3>No Quizzes Yet</h3>;
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await deleteQuiz({
                variables: {removeQuizId: id},
            });

            if (!data.removeQuiz) {
                throw new Error('Something went wrong!');
            }       
        } catch (err) {
        console.error(err);
        }
    }

    return (

    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row  my-4" style={{justifyContent: 'center'}}>
        {quizzes &&
          quizzes.map((quizz) => (
            <Card key={quizz.id} className="col-10 col-xl-5 card-dashboard enlarge">
              <Link
                to={`/quizzes/${quizz.id}`}
                className="link"
              >
                {quizz.title}
              </Link>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="delete-button"
                onClick={() => handleDelete(quizz.id)}
              />
            </Card>
          ))}
      </div>
    </div>
  );

};

export default QuizList;
