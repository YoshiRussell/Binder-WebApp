const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    details: [{
        tab_name: {
            type: String, 
            required: true, 
            trim: true,
        },
        tab_list: [{type: String}],
    }],
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;