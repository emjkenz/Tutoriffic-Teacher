import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_LESSON } from '../utils/mutations';
const generateUniqueId = require('generate-unique-id');

const LessonCreator = () => {
    const [lessonTitle, setLessonTitle] = useState('');
    const [sections, setSections] = useState([{ heading: '', subheading: '', text: '' }]);

    const [saveLesson, {error}] = useMutation(SAVE_LESSON);

    const handleTitleChange = (e) => {
        setLessonTitle(e.target.value);
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
        const dataToSend = { id: generateUniqueId(), title: lessonTitle, sections: sections };

        const { data } = await saveLesson({
            variables: { lessonData: dataToSend }
        })

        setLessonTitle('');
        setSections([{ heading: '', subheading: '', text: '' }]);
    };

    return (
        <div className='lesson-creator'>
            <label htmlFor="lessontitle">Lesson Title:</label>
            <input type="text" id="lesson_title" value={lessonTitle} onChange={handleTitleChange} />

            <div id="sections_section">
                {sections.map((section, index) => (
                    <div key={index} className="heading">
                        <input type="text" className="heading_input" placeholder="Enter your heading here" value={section.heading} onChange={(e) => handleHeadingChange(e, index)} />
                        <input type="text" className="subheading_input" placeholder="Enter your subheading here" value={section.subheading} onChange={(e) => handleSubheadingChange(e, index)} />
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
    )
};

export default LessonCreator