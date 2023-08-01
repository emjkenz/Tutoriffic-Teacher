const { Schema, model } = require('mongoose');
const commentSchema = require('./Comments')

const postSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Post = model('Post', postSchema);

module.exports = Post;
