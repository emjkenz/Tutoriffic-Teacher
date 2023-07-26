const { Schema } = require('mongoose');

const questionSchema = new Schema({
    question:
        {
            type: String,
        },
    answers : [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = questionSchema;
