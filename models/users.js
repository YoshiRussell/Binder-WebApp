const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { courseSchema } = require('./course.js');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 
    user_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    courses: [courseSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;