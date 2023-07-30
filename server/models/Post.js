const { Schema, model } = require('mongoose');
// const Comments = require('./Comments')
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
    // comments: [
    //     {
    //         type: Schema.Types.ObjectId, 
    //         ref: 'Comments',
    //     },
    // ],
    comments: [commentSchema]
});

const Post = model('Post', postSchema);

module.exports = Post;
