import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_LESSON } from '../utils/mutations';
const generateUniqueId = require('generate-unique-id');

const LessonCreator = () => {
    const [lessonTitle, setLessonTitle] = useState('');
    const [sections, setSections] = useState([{ heading: '', subheading: '', text: '' }]);
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});

    const [saveLesson] = useMutation(SAVE_LESSON);

    const handleTitleChange = (e) => {
        setLessonTitle(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleHeadingChange = (e, index) => {
        const newSections = [...sections];
        newSections[index].heading = e.target.value;
        setSections(newSections);
    };

    const handleSubheadingChange = (e, headingIndex) => {
        const newSections = [...sections];
        newSections[headingIndex].subheading = e.target.value;
        setSections(newSections);
    };

    const handleTextChange = (e, headingIndex) => {
        const newSections = [...sections];
        newSections[headingIndex].text = e.target.value;
        setSections(newSections);
    };

    const addSection = () => {
        setSections([...sections, { heading: '', subheading: '', text: '' }]);
    };

    const handleLessonSave = async () => {
        // Perform form validation before saving the lesson
        const validationErrors = {};
        if (!lessonTitle.trim()) {
            validationErrors.lessonTitle = 'Lesson title is required.';
        }
        if (!date) {
            validationErrors.date = 'Lesson date is required.';
        }
        sections.forEach((section, index) => {
            if (!section.heading.trim()) {
                validationErrors[`heading_${index}`] = 'Section heading is required.';
            }
        });

        // If there are validation errors, display them and prevent saving the lesson
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Proceed with saving the lesson if there are no validation errors
        const dataToSend = { id: generateUniqueId(), title: lessonTitle, date: date, sections: sections };
        console.log(dataToSend);

        try {
            await saveLesson({
                variables: { lessonData: dataToSend }
            });

            // Clear form data after successful save
            setLessonTitle('');
            setDate('');
            setSections([{ heading: '', subheading: '', text: '' }]);
            setErrors({});
        } catch (error) {
            // Handle error here if needed
            console.error(error);
        }
    };

    return (
        <div className='lesson-creator'>
            <label htmlFor="lessontitle">Lesson Title:</label>
            <input type="text" id="lesson_title" value={lessonTitle} onChange={handleTitleChange} />
            {errors.lessonTitle && <span className="error-message">{errors.lessonTitle}</span>}

            <label htmlFor="lesson_date">When will this lesson be held?:</label>
            <input type="date" id="lesson_date" value={date} onChange={handleDateChange} />
            {errors.date && <span className="error-message">{errors.date}</span>}

            <div id="sections_section">
                {sections.map((section, index) => (
                    <div key={index} className="heading">
                        <input
                            type="text"
                            className="heading_input"
                            placeholder="Enter your heading here"
                            value={section.heading}
                            onChange={(e) => handleHeadingChange(e, index)}
                        />
                        {errors[`heading_${index}`] && <span className="error-message">{errors[`heading_${index}`]}</span>}
                        <input
                            type="text"
                            className="subheading_input"
                            placeholder="Enter your subheading here"
                            value={section.subheading}
                            onChange={(e) => handleSubheadingChange(e, index)}
                        />
                        <div className="text">
                            <textarea
                                key={section.textIndex}
                                className="text"
                                placeholder="Enter text"
                                value={section.text}
                                onChange={(e) => handleTextChange(e, index)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={addSection}>Add Section</button>
            <button onClick={handleLessonSave}>Save Lesson</button>
        </div>
    );
};

export default LessonCreator;
