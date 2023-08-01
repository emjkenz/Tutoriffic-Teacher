import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from 'antd';
import { QUERY_ALL_POSTS } from '../../utils/queries'
import { DELETE_POST } from '../../utils/mutations'


const PostList = ({ posts, title }) => {
    const [deletePost, { error }] = useMutation(DELETE_POST, {
        update(cache, { data: { removePost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_ALL_POSTS });

                const updatedPosts = posts.filter(post => post.id !== removePost.id);

                cache.writeQuery({
                    query: QUERY_ALL_POSTS,
                    data: { posts: updatedPosts },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await deletePost({
                variables: { removePostId: id },
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
                    {posts &&
                        posts.map((post) => (
                            <div key={post.id} className="col-12 col-xl-6">
                                <div className="card mb-3">
                                    <Link
                                        className="btn btn-block btn-squared bg-dark text-light"
                                        to={`/posts/${post.id}`}
                                    >
                                        {post.title}
                                    </Link>
                                    <Button onClick={() => handleDelete(post.id)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            
        </div>
    );
};

export default PostList;
