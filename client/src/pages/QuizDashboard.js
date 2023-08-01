import React from 'react';
import { useQuery } from '@apollo/client';

import QuizList from '../components/QuizList';

import { QUERY_ALL_QUIZZES } from '../utils/queries'

const Quizzes = () => {
    const { loading, data } = useQuery(QUERY_ALL_QUIZZES);
    const quizzes = data?.quizzes || [];
    console.log("blah");
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <QuizList
                    quizzes={quizzes}
                    title="Here's the current list of avilable quizzes..."
                />
            )}
        </div>
    )
}

export default Quizzes;