import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_POST } from '../utils/queries';

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

        </div>
    )

};

export default Post;