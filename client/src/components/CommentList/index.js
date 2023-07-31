import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../utils/mutations'


const CommentList = ({ postId, comments, title }) => {
    const [deleteComment, {error}] = useMutation(DELETE_COMMENT);

    if (!comments.length) {
        return <h3>No Comments Yet</h3>;
    }

    const handleDelete = async (postId, commentId) => {
        try {
            const { data } = await deleteComment({
                variables: { postId: postId, commentId: commentId },
            });

            if (!data.removePost) {
                throw new Error('Something went wrong!');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div>
                <div className="flex-row justify-space-between my-4">
                    {comments &&
                        comments.map((comment, index) => (
                            <div key={index} className="col-12 col-xl-6">
                                <div className="card mb-3">
                                    <h4>{comment.text}</h4>
                                    <button onClick={() => handleDelete(postId, comment._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    );
};

export default CommentList;
