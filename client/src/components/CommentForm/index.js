import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [errors, setErrors] = useState({});

    const [addComment] = useMutation(ADD_COMMENT);

    const handleTextChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSave = async () => {
        // Perform form validation before saving the comment
        const validationErrors = {};
        if (!commentText.trim()) {
            validationErrors.commentText = 'Comment text is required.';
        }

        // If there are validation errors, display them and prevent saving the comment
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Proceed with saving the comment if there are no validation errors
        await addComment({
            variables: { postId: postId, comment: { text: commentText } }
        });

        setCommentText('');
        setErrors({});
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
                {errors.commentText && <span className="error-message">{errors.commentText}</span>}
            </div>

            <button onClick={handleCommentSave}>Create Comment</button>
        </div>
    );
};

export default CommentForm;
