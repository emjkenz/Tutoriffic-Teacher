import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList'
import { QUERY_POST, QUERY_COMMENTS_BY_POST } from '../utils/queries';

const Post = () => {
    const {postId} = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { postId: postId },
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <h2>{post.title}</h2>
            <h4>{post.text}</h4>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <CommentList
                        postId={postId}
                        comments={post.comments}
                        title="Here's the current list of avilable comments..."
                />
            )}

            <CommentForm postId={postId} />
        </div>
    )

};

export default Post;