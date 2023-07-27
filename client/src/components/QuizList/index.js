import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { QUERY_ALLQUIZZES } from '../../utils/queries'
import { DELETE_QUIZ } from '../../utils/mutations'


const QuizList = ({ quizzes, title }) => {
    const [deleteQuiz, { error }] = useMutation(DELETE_QUIZ, {
        update(cache, { data: { removeQuiz } }) {
            try {
                const { quizzes } = cache.readQuery({ query: QUERY_ALLQUIZZES });

                const updatedQuizzes = quizzes.filter(quiz => quiz.id !== removeQuiz.id);

                cache.writeQuery({
                    query: QUERY_ALLQUIZZES,
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
        console.log("delete: ", id);
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
            <div className="flex-row justify-space-between my-4">
                {quizzes &&
                    quizzes.map((quizz) => (
                        <div key={quizz.id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                {/* <h4 className="card-header bg-dark text-light p-2 m-0">
                                    {quizz.title}
                                </h4> */}

                                <Link
                                    className="btn btn-block btn-squared bg-dark text-light"
                                    to={`/quizzes/${quizz.id}`}
                                >
                                    {quizz.title}
                                </Link>
                                <button onClick={() => handleDelete(quizz.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default QuizList;