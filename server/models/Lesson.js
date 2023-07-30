const { Schema, model } = require('mongoose');
const sectionSchema = require('./Section')

const lessonSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    sections: [sectionSchema],
});

const Lesson = model('Lesson', lessonSchema);

module.exports = Lesson;
