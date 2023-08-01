import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { QUERY_LESSON } from '../utils/queries';

const Lesson = () => {
    const { lessonId } = useParams();

    const { loading, data } = useQuery(QUERY_LESSON, {
        variables: { lessonId: lessonId },
    });

    if (loading) {
        return <div>Loading...</div>;
    }


    const lesson = data?.lesson || {};

    const carouselData = lesson.sections.map((section, index) => {
        return {
            id: index,
            title: section
        };
    });

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div>
            <h2>{lesson.title}</h2>
            <Carousel responsive={responsive}>
                {carouselData && carouselData.map((item) => (
                    <div style={{backgroundColor: 'blue'}}>
                        <p>{item.title.heading}</p>
                        <p>{item.title.subheading}</p>
                        <p>{item.title.text}</p>
                    </div>
                ))}

            </Carousel>
        </div>
    )

};

export default Lesson;