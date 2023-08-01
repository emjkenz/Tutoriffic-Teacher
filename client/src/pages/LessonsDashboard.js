import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';

import LesssonList from '../components/LessonList';

import { QUERY_ALL_LESSONS } from '../utils/queries'

const Lessons = () => {
    const { data, loading, error, refetch } = useQuery(QUERY_ALL_LESSONS);

    const lessons = data?.lessons || [];

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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