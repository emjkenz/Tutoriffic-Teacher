const { Schema, model } = require('mongoose');
// const commentSchema = require('./Comment')

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
});

const Post = model('Post', postSchema);

module.exports = Post;
