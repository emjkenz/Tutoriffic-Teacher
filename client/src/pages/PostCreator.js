import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_POST } from '../utils/mutations';
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

        const { data } = await savePost({
            variables: { postData: dataToSend }
        })

        setPostTitle('');
        setPostText('');
    };

    return (
        <div>
            <label htmlFor="posttitle">Title:</label>
            <input type="text" id="post_title" value={postTitle} onChange={handleTitleChange} />
            <div className="text">
                <textarea
                    className="text"
                    placeholder="Enter text"
                    value={postText}
                    onChange={handleTextChange}
                />
            </div>

            <button onClick={handlePostSave}>Create Post</button>
        </div>
    )
};

export default PostCreator