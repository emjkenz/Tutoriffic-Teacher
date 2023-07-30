import React from 'react';
import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { QUERY_ALL_POSTS } from '../../utils/queries'
// import { DELETE_POST } from '../../utils/mutations'


const CommentList = ({ comments, title }) => {
    // const [deletePost, { error }] = useMutation(DELETE_POST, {
    //     update(cache, { data: { removePost } }) {
    //         try {
    //             const { posts } = cache.readQuery({ query: QUERY_ALL_POSTS });

    //             const updatedPosts = posts.filter(post => post.id !== removePost.id);

    //             cache.writeQuery({
    //                 query: QUERY_ALL_POSTS,
    //                 data: { posts: updatedPosts },
    //             });
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     },
    // });

    if (!comments.length) {
        return <h3>No Comments Yet</h3>;
    }

    // const handleDelete = async (id) => {
    //     try {
    //         const { data } = await deletePost({
    //             variables: { removePostId: id },
    //         });

    //         if (!data.removePost) {
    //             throw new Error('Something went wrong!');
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <div>
            <div>
                <div className="flex-row justify-space-between my-4">
                    {comments &&
                        comments.map((comment, index) => (
                            <div key={index} className="col-12 col-xl-6">
                                <div className="card mb-3">
                                    <h4>{comment.text}</h4>
                                    {/* <button onClick={() => handleDelete(post.id)}>Delete</button> */}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    );
};

export default CommentList;
