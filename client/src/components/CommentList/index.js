import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../../utils/mutations";
import { Card, Button, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import '../../pages/forum.css'

const CommentList = ({ postId, comments, title }) => {
  const [deleteComment, { error }] = useMutation(DELETE_COMMENT);

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  const handleDelete = async (postId, commentId) => {
    try {
      const { data } = await deleteComment({
        variables: { postId: postId, commentId: commentId },
      });

      if (!data.removePost) {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
<div className="card-container">
  <div>
    <div className="my-4">
      {comments &&
        comments.map((comment, index) => (
          <Card key={index} bordered={false} style={styles.card} className='comment'>
            <div style={{ display: 'flex' }}>
              <div >
                <h4 style={styles.text}>{comment.text}</h4>
              </div>
              <div className="delete-button">
                <Button
                  style={styles.button}
                  onClick={() => handleDelete(postId, comment._id)}
                  icon={<DeleteOutlined />}
                />
              </div>
            </div>
          </Card>
        ))}
    </div>
  </div>
</div>

  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "1000px",
    paddingLeft: "100px",
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#d4e6f1",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "black",
    margin: "30px",
    height: "80px",
    boxShadow: "2px 2px 10px rgb(216, 215, 215",
    left: '10%',
    fontWeight: '100',
     fontSize: '10px'
  },
  text: {
     flex: '1',
     fontWeight: '200',
     fontSize: '22px'
  },
  button: {
    width: '30px',
  textAlign: 'center',
  padding: 'auto', 
  background: 'transparent',
  }
};

export default CommentList;
