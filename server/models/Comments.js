const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    // postId: {
    //     type: String,
    //     required: true,
    // },
});


module.exports = commentSchema;


// const Comments = model('Comments', commentSchema);

// module.exports = Comments;