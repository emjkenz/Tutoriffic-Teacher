import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import { Form, Input, Button } from 'antd';

const CommentForm = ( {postId} ) => {
    const [commentText, setCommentText] = useState('');

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleTextChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSave = async () => {

        console.log(postId, commentText)

        const { data } = await addComment({
            variables: { postId: postId, comment: {text: commentText} }
        })

        setCommentText('');
    };

    return (
        <>
            <Form>
                <Form.Item
                label="Text"
                rules={[{ required: true, message: 'Please input Intro' }]}
            >
                <Input.TextArea
                    value={commentText}
                    onChange={handleTextChange}
                    showCount maxLength={1000} 
                />
            </Form.Item>
            </Form>

            <Button onClick={handleCommentSave}>Create Comment</Button>
        </>
    )
};

export default CommentForm