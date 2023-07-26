import React from 'react';
import { Link } from 'react-router-dom';

const QuizList = ({ quizzes, title }) => {
    if (!quizzes.length) {
        return <h3>No Quizzes Yet</h3>;
    }

    return (
        <div>
            <h3 className="text-primary">{title}</h3>
            <div className="flex-row justify-space-between my-4">
                {quizzes &&
                    quizzes.map((quizz) => (
                        <div key={quizz.id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0">
                                    {quizz.title}
                                </h4>

                                <Link
                                    className="btn btn-block btn-squared btn-light text-dark"
                                    to={`/quizzes/${quizz.id}`}
                                >
                                    View quiz.
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default QuizList;
