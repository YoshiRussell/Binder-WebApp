const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectID = mongoose.Types.ObjectId;

const userSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    courses: [{ courseID: ObjectID, courseName: {type: String} }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;