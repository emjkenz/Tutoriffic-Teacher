import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_LESSON } from '../utils/mutations';
import { DatePicker, Form, Input, Button } from 'antd';
const generateUniqueId = require('generate-unique-id');

const LessonCreator = () => {
    const [lessonTitle, setLessonTitle] = useState('');
    const [sections, setSections] = useState([{ heading: '', subheading: '', text: '' }]);
    const [date, setDate] = useState('');

    const [saveLesson, {error}] = useMutation(SAVE_LESSON);

    const handleTitleChange = (e) => {
        setLessonTitle(e.target.value);
    };

    const handleDateChange = (date) => {
        setDate(date);
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
        const dataToSend = { id: generateUniqueId(), title: lessonTitle, date: date, sections: sections };

        console.log(dataToSend)

        const { data } = await saveLesson({
            variables: { lessonData: dataToSend }
        })

        setLessonTitle('');
        setDate('');
        setSections([{ heading: '', subheading: '', text: '' }]);
    };

    return (
    <>
       <h1>Create Quiz</h1>
            <Form>
                <Form.Item
                    label="Lesson Title"
                    rules={[
                        {
                            type: 'text',
                        },
                        {
                            required: true,
                            message: 'Please input a Lesson Title!',
                        },
                    ]}
                >
                    <Input 
                        value={lessonTitle}
                        onChange={handleTitleChange}
                    />
                </Form.Item>

                <Form.Item
                    label="Due Date:"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker onChange={(date) => handleDateChange(date)} />
                </Form.Item>

                <div id="sections_section">
                    {sections.map((section, index) => (
                        <div key={index}>
                            <div className="heading">
                                <Form.Item
                                    label="Heading"
                                    rules={[
                                        {
                                            type: 'text',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input a Heading!',
                                        },
                                    ]}
                                >
                                    <Input 
                                        value={section.heading}
                                        onChange={(e) => handleHeadingChange(e, index)}
                                    />
                                </Form.Item>
                            </div>

                            <div className="subheading">
                                <Form.Item
                                    label="Subheading"
                                    rules={[
                                        {
                                            type: 'text',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input a Subheading!',
                                        },
                                    ]}
                                >
                                    <Input 
                                        value={section.subheading}
                                        onChange={(e) => handleSubheadingChange(e, index)}
                                    />
                                </Form.Item>
                            </div>

                            <div className="text">
                                <Form.Item
                                    key={`text_${index}`}
                                    label="Text"
                                    rules={[{ required: true, message: 'Please input Intro' }]}
                                >
                                    <Input.TextArea
                                        value={section.text}
                                        onChange={(e) => handleTextChange(e, index)}
                                        showCount maxLength={1000} 
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    ))}
                </div>

                <Button onClick={addSection}>Add Section</Button>
                <Button onClick={handleLessonSave}>Save Lesson</Button>
            </Form>
        </>
    )
};

export default LessonCreator