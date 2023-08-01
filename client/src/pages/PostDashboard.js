import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import { QUERY_ALL_POSTS } from '../utils/queries'
import { Button } from 'antd';

const Posts = () => {
    const { data, loading, error, refetch } = useQuery(QUERY_ALL_POSTS);

    const posts = data?.posts || [];

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Button>
            <Link
                to={`/posts/add`}
            >
                Add Post
            </Link>
            </Button>
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