import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_LESSON } from '../utils/mutations';
import { DatePicker, Form, Input, Button } from 'antd';
const generateUniqueId = require('generate-unique-id');

const LessonCreator = () => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [sections, setSections] = useState([{ heading: '', subheading: '', text: '' }]);
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const { moduleId } = location.state;

  const [saveLesson] = useMutation(SAVE_LESSON);

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
      if (!section.text.trim()) {
        validationErrors[`text_${index}`] = 'Text is required.';
      }
    });

    // If there are validation errors, display them and prevent saving the lesson
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with saving the lesson if there are no validation errors
    const dataToSend = { id: generateUniqueId(), title: lessonTitle, date: date, sections: sections, moduleId: moduleId };

    try {
      const { data } = await saveLesson({
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
    <>
      <h1>Create Lesson</h1>
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
            style={errors.lessonTitle ? { borderColor: 'red' } : {}}
          />
        </Form.Item>
        {errors.lessonTitle && <span style={{ color: 'red' }}>{errors.lessonTitle}</span>}

        <Form.Item
          label="Due Date:"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            onChange={(date) => handleDateChange(date)}
            style={errors.date ? { borderColor: 'red' } : {}}
          />
        </Form.Item>
        {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}

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
                    style={errors[`heading_${index}`] ? { borderColor: 'red' } : {}}
                  />
                </Form.Item>
                {errors[`heading_${index}`] && <span style={{ color: 'red' }}>{errors[`heading_${index}`]}</span>}
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
                    style={errors[`heading_${index}`] ? { borderColor: 'red' } : {}}
                  />
                </Form.Item>
              </div>

              <div className="text">
                <Form.Item
                  key={`text_${index}`}
                  label="Text"
                  rules={[{ required: true, message: 'Text is required.' }]}
                >
                  <Input.TextArea
                    value={section.text}
                    onChange={(e) => handleTextChange(e, index)}
                    showCount maxLength={1000}
                    style={errors[`text_${index}`] ? { borderColor: 'red' } : {}}
                  />
                </Form.Item>
                {errors[`text_${index}`] && <span style={{ color: 'red' }}>{errors[`text_${index}`]}</span>}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={addSection}>Add Section</Button>
        <Button onClick={handleLessonSave}>Save Lesson</Button>
      </Form>
    </>
  );
};

export default LessonCreator;


