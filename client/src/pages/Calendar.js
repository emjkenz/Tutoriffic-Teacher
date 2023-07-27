import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useQuery } from '@apollo/client';

import { GET_DUE_DATES  } from '../utils/queries';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const  ReactBigCalendar = () => {
    const { loading, data } = useQuery(GET_DUE_DATES);
    const quizzes = data?.quizzes || [];
    
    const createCalendarObject = (quizzes) => {
        return {
            id: 0,
            title: quizzes.title,
            allDay: true,
            start: quizzes.dueDate,
            end: quizzes.dueDate,
        };
    };

    const eventsData = quizzes.map((quizData) => createCalendarObject(quizData));


    return (
        <div className="App">
            <Calendar
                views={["day", "agenda", "work_week", "month"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={eventsData}
                style={{ height: "100vh" }}
            />
        </div>
    );
}

export default ReactBigCalendar;