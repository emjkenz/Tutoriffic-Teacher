import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../utils/mutations'
import { Card, Button } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";


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
        <div style={styles.container}>
            <div>
                <div className="my-4">
                    {comments &&
                        comments.map((comment, index) => (
                            // <div key={index} className="col-12 col-xl-6">
                            //     <div className="card mb-3">
                            //         <h4>{comment.text}</h4>
                            //         <button onClick={() => handleDelete(postId, comment._id)}>Delete</button>
                            //     </div>
                            // </div>
                            //  <Row >
                            //     <Col span={24}>
                                <Card title={comment.text} bordered={false} style={styles.card} >
                                    <Button styles={styles.button} onClick={() => handleDelete(postId, comment._id)}><DeleteOutlined /></Button>
                                </Card>
                            //     </Col>
                            // </Row>
                        ))}
                </div>
            </div>
        </div>
       
    );
};

const styles = {
    container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '1000px',
    paddingLeft: '100px',
    },
    card: {
    backgroundColor: '#d4e6f1',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
    margin: '20px',
    height: '80px',
    boxShadow: '2px 2px 10px rgb(216, 215, 215',
    },

}

export default CommentList;
