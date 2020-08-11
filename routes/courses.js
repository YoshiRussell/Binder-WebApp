const router = require('express').Router();
const Course = require('../models/course');

router.route('/courseDetail/:id').get((req, res) => {
    console.log("Inside get courseDetail");
    const courseId = req.params.id;
    (async() => {
        try {
            const courseDetail = await Course.findOne({ _id: courseId });
            res.json(courseDetail.details);
        } catch(error) {
            console.log("Error getting courseDetail");
        }
    })();   
});

router.route('/courseDetail/:id').post((req, res) => {
    console.log("Inside post courseDetail");
    const courseId = req.params.id;
    const { desc, tabName } = req.body;
    console.log("tabName: " + tabName);
    console.log("desc:" + desc);

    Course.findOneAndUpdate({ '_id': courseId, 'details.tab_name': tabName}, {
        $push: {'details.$.tab_list': desc}
    }, (error, success) => {
        if (error) console.log("Error finding and updating course detail: " + error);
        else {
            console.log("Success finding and updating course detail: " + success);
        }
    });
});
module.exports = router;