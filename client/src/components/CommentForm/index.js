import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

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
        <div>
            <div className="text">
                <textarea
                    className="text"
                    placeholder="Enter text"
                    value={commentText}
                    onChange={handleTextChange}
                />
            </div>

            <button onClick={handleCommentSave}>Create Comment</button>
        </div>
    )
};

export default CommentForm