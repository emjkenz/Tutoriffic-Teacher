import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import moment from "moment";

import Questions from '../components/Questions';

import { QUERY_QUIZ } from '../utils/queries';

const Quiz = () => {
    const {quizId} = useParams();

    const { loading, data } = useQuery(QUERY_QUIZ, {
        variables: { quizId: quizId },
    });

    const quiz = data?.quiz || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    const date = moment(quiz.date).format('L')

    return(
        <div>
            <h2>{quiz.title}</h2>
            <h4>{quiz.description}</h4>
            <h4>Due: {date}</h4>

            {quiz.questions?.length > 0 && <Questions questions={quiz.questions} />}
        </div>
    )

};

export default Quiz;