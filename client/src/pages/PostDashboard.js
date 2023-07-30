import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import { QUERY_ALL_POSTS } from '../utils/queries'

const Posts = () => {
    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    const posts = data?.posts || [];

    return (
        <div>
            <Link
                className="btn btn-block btn-squared bg-dark text-light"
                to={`/posts/add`}
            >
                Add Post
            </Link>
            {loading ? (
                <div>Loading...</div>
            ) : (
                    <PostList
                        posts={posts}
                        title="Here's the current list of avilable posts..."
                    />
            )}
        </div>
    )
}

export default Posts;