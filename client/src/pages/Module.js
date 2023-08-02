import React, {useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import QuizList from '../components/QuizList';
import LessonList from '../components/LessonList';
import { QUIZ_BY_MODULE, LESSON_BY_MODULE } from '../utils/queries';

const Module = () => {
    const { moduleId } = useParams();

    const { data: quizData, loading: quizLoading, error: quizError, refetch: quizRefetch } = useQuery(QUIZ_BY_MODULE, {
    variables: { moduleId: moduleId },
    });

    const quizzesByModuleId = quizData?.quizzesByModuleId || [];

    const { data: lessonData, loading: lessonLoading, error: lessonError, refetch: lessonRefetch } = useQuery(LESSON_BY_MODULE, {
        variables: { moduleId: moduleId },
    });

    const lessonsByModuleId = lessonData?.lessonsByModuleId || [];

    console.log(lessonData);

    return (
        <>
            <div>
                {quizLoading ? (
                    <div>Loading...</div>
                ) : (
                    <QuizList
                        quizzes={quizzesByModuleId}
                    />
                )}
            </div>

            <div>
            {lessonLoading ? (
                <div>Loading...</div>
            ) : (
                <LessonList
                    lessons={lessonsByModuleId}
                />
                )}
            </div>
            <Link to='/quizzes/add' state={{moduleId}}>
                Add Quiz
            </Link>
            <Link to='/lesson/add' state={{moduleId}}>
                Add Lesson
            </Link>
        </>
    );
};

export default Module;