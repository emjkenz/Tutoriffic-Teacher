import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_POST } from '../utils/mutations';
import { Form, Input, Button } from 'antd';
const generateUniqueId = require('generate-unique-id');

const PostCreator = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    
    const [savePost, { error }] = useMutation(SAVE_POST);

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    const handleTextChange = (e) => {
        setPostText(e.target.value);
    };

    const handlePostSave = async () => {
        const dataToSend = { id: generateUniqueId(), title: postTitle, text: postText };
        console.log(dataToSend);

        const { data } = await savePost({
            variables: { postData: dataToSend }
        })

        setPostTitle('');
        setPostText('');
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

            <Button onClick={handlePostSave}>Create Post</Button>
        </div>
            </Form>
        </>
    )
};

export default PostCreator