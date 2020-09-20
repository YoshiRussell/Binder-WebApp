const router = require('express').Router();
const User = require('../models/users');
const Course = require('../models/course');


router.route('/courses/:id').get((req, res) => {
    console.log("Inside getCourses route");
    const userID = req.params.id;
    (async() => {
        try {
            const user = await User.findOne({ user_id: userID });
            if (!user) {
                console.log("User now found");
                const courses = [];
                const newUser = new User({
                    user_id: userID,
                    courses
                });
        
                const savedNewUser = await newUser.save();
                console.log("New user courses: " + savedNewUser.courses)
                res.json({});
            } else {
                console.log("found user?");
                const response = {};
                user.courses.map(coursePair => {
                    response[coursePair.courseID] = coursePair.courseName;
                })
                console.log(response);
                res.json(response);
            }
        } catch(error) {
            console.log("Error finding or creating user");
        }   
    })();
    
});

router.route('/courses/:id').post(async (req, res) => {
    console.log("post course route");
    const userID = req.params.id;
    const { courseName } = req.body;

    try {

        // Create a new course detail empty template
        const newCourseDetail = new Course({
            details: [
                {
                    tab_name: "HOMEWORK",
                    tab_list: []
                },
                {
                    tab_name: "QUIZZES/TESTS",
                    tab_list: []
                }
            ]
        });

        // save model into DB
        const savedNewCourseDetail = await newCourseDetail.save();
        
        // create { savedNewCourseDetail.ObjectID : courseName } pair to add to User's course list
        const newCourse = {};
        newCourse.courseID = savedNewCourseDetail._id;
        newCourse.courseName = courseName;
        console.log("New course pair is:")
        console.log(newCourse);
        // update User's course list and return the new ID
        User.findOneAndUpdate({ user_id: userID }, {
            $push: {courses: newCourse}
        }, (error, success) => {
            if (error) console.log("Error pushing new course pair: " + error);
            else {
                console.log("Success pushing new course pair: " + success);
                res.json(newCourse);
            }
        });
    } catch(error) {
        console.log("Error adding course");
    }
});

router.route('/courses/delete/:id').post(async (req, res) => {

    const userID = req.params.id;
    const { courseID } = req.body;

    try {
        User.findOneAndUpdate({ user_id: userID }, {
            $pull: { 'courses': { 'courseID': courseID } }
        }, (error, success) => {
            if (error) console.log("Error pulling course from course list");
            else console.log("Success pulling course from course list");
        });

        Course.deleteOne({ 'id': courseID }, (error, success) => {
            if (error) console.log("Error deleting Course Model that matches course ID");
            else console.log("Successfully deleted Course Model that matches course ID");
        });

    } catch(error) {
        console.log("Failed to delete course from either User model or Course model");
    }
})

module.exports = router;