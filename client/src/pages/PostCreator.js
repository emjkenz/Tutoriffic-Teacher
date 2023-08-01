import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_POST } from '../utils/mutations';
import { Form, Input, Button } from 'antd';
const generateUniqueId = require('generate-unique-id');

const PostCreator = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [errors, setErrors] = useState({});

    const [savePost] = useMutation(SAVE_POST);

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    const handleTextChange = (e) => {
        setPostText(e.target.value);
    };

    const handlePostSave = async () => {
        // Perform form validation before saving the post
        const validationErrors = {};
        if (!postTitle.trim()) {
            validationErrors.postTitle = 'Post title is required.';
        }
        if (!postText.trim()) {
            validationErrors.postText = 'Post text is required.';
        }

        // If there are validation errors, display them and prevent saving the post
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Proceed with saving the post if there are no validation errors
        const dataToSend = { id: generateUniqueId(), title: postTitle, text: postText };
        console.log(dataToSend);

        try {
            await savePost({
                variables: { postData: dataToSend }
            });

            // Clear form data after successful save
            setPostTitle('');
            setPostText('');
            setErrors({});
        } catch (error) {
            // Handle error here if needed
            console.error(error);
        }
    };
    console.log("blah: ", postText);
    return (
        <>
            <Form>
        <div>

            <Form.Item
                    label="Post Title"
                    rules={[
                        {
                            type: 'text',
                        },
                        {
                            required: true,
                            message: 'Please input a Post Title!',
                        },
                    ]}
                    
                >
                        <Input 
                            value={postTitle}
                            onChange={handleTitleChange} 
                        />
                </Form.Item>
{errors.postTitle && <span className="error-message">{errors.postTitle}</span>}

            <Form.Item
                label="Text"
                rules={[{ required: true, message: 'Please input Intro' }]}
            >
                <Input.TextArea 
                    value={postText} 
                    onChange={handleTextChange} 
                    showCount maxLength={1000} 
                />
            </Form.Item>
 {errors.postText && <span className="error-message">{errors.postText}</span>}




            <Button onClick={handlePostSave}>Create Post</Button>
        </div>
            </Form>
        </>
    )
};

export default PostCreator;
