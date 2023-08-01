import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from 'antd';
import { QUERY_ALL_LESSONS } from '../../utils/queries'
import { DELETE_LESSON } from '../../utils/mutations'


const LessonList = ({ lessons, title }) => {
    const [deleteLesson, { error }] = useMutation(DELETE_LESSON, {
        update(cache, { data: { removeLesson } }) {
            try {
                const { lessons } = cache.readQuery({ query: QUERY_ALL_LESSONS });

                const updatedLessons = lessons.filter(lesson => lesson.id !== removeLesson.id);

                cache.writeQuery({
                    query: QUERY_ALL_LESSONS,
                    data: { lessons: updatedLessons },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    if (!lessons.length) {
        return <h3>No lessons Yet</h3>;
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await deleteLesson({
                variables: { removeLessonId: id },
            });

            if (!data.removeLesson) {
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
                                <Button onClick={() => handleDelete(lesson.id)}>Delete</Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default LessonList;