import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import LessonSections from '../components/LessonSections';

import { QUERY_LESSON } from '../utils/queries';

const Lesson = () => {
    const { lessonId } = useParams();

    const { loading, data } = useQuery(QUERY_LESSON, {
        variables: { lessonId: lessonId },
    });

    const lesson = data?.lesson || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{lesson.title}</h2>

            {lesson.sections?.length > 0 && <LessonSections sections={lesson.sections} />}
        </div>
    )

};

export default Lesson;