import React from 'react';
import { useQuery } from '@apollo/client';

import LesssonList from '../components/LessonList';

import { QUERY_ALL_LESSONS } from '../utils/queries'

const Lessons = () => {
    const { loading, data } = useQuery(QUERY_ALL_LESSONS);
    const lessons = data?.lessons || [];

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <LesssonList
                    lessons={lessons}
                    title="Here's the current list of avilable lessons..."
                />
            )}
        </div>
    )
}

export default Lessons;