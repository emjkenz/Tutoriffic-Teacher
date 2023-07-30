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

    const { loadingComment, dataComment } = useQuery(QUERY_COMMENTS_BY_POST, {
        variables: { postId: postId },
    });

    const comments = dataComment?.comments || {};

    console.log(postId)
    console.log(comments)

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <h2>{post.title}</h2>
            <h4>{post.text}</h4>

            {loadingComment ? (
                <div>Loading...</div>
            ) : (
                <CommentList
                        comments={comments}
                        title="Here's the current list of avilable comments..."
                />
            )}

            <CommentForm postId={postId} />
        </div>
    )

};

export default Post;