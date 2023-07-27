import React from 'react';
import { useQuery } from '@apollo/client';

import QuizList from '../components/QuizList';

import { QUERY_ALLQUIZZES } from '../utils/queries'

const Quizzes = () => {
    const { loading, data } = useQuery(QUERY_ALLQUIZZES);
    const quizzes = data?.quizzes || [];

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