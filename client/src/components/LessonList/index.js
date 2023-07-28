import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { QUERY_ALL_LESSONS } from '../../utils/queries'
// import { DELETE_QUIZ } from '../../utils/mutations'


const QuizList = ({ lessons, title }) => {
    // const [deleteQuiz, { error }] = useMutation(DELETE_QUIZ, {
    //     update(cache, { data: { removeQuiz } }) {
    //         try {
    //             const { quizzes } = cache.readQuery({ query: QUERY_ALL_QUIZZES });

    //             const updatedQuizzes = quizzes.filter(quiz => quiz.id !== removeQuiz.id);

    //             cache.writeQuery({
    //                 query: QUERY_ALL_QUIZZES,
    //                 data: { quizzes: updatedQuizzes },
    //             });
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     },
    // });

    if (!lessons.length) {
        return <h3>No lessons Yet</h3>;
    }

    // const handleDelete = async (id) => {
    //     console.log("delete: ", id);
    //     try {
    //         const { data } = await deleteQuiz({
    //             variables: { removeQuizId: id },
    //         });

    //         if (!data.removeQuiz) {
    //             throw new Error('Something went wrong!');
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <div>
            <h3 className="text-primary">{title}</h3>
            <div className="flex-row justify-space-between my-4">
                {lessons &&
                    lessons.map((lesson) => (
                        <div key={lesson.id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <Link
                                    className="btn btn-block btn-squared bg-dark text-light"
                                    to={`/lessons/${lesson.id}`}
                                >
                                    {lesson.title}
                                </Link>
                                {/* <button onClick={() => handleDelete(lesson.id)}>Delete</button> */}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default QuizList;