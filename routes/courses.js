const router = require('express').Router();
const Course = require('../models/course');

router.route('/courseDetail/:id').get((req, res) => {
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
    const courseId = req.params.id;
    const { desc, tabName } = req.body;

    Course.findOneAndUpdate({ '_id': courseId, 'details.tab_name': tabName}, {
        $push: {'details.$.tab_list': desc}
    }, (error, success) => {
        if (error) console.log("Error finding and updating course detail: " + error);
        else {
            console.log("Success finding and updating course detail: " + success);
        }
    });
});

router.route('/courseDetail/delete/:id').post((req, res) => {
    const courseId = req.params.id;
    const { tabList, tabName } = req.body;

    Course.findOneAndUpdate({ '_id': courseId, 'details.tab_name': tabName}, {
        'details.$.tab_list' : tabList
    }, (error, success) => {
        if (error) console.log("Error deleting specific task");
        else console.log("Success deleting specific task");
    });
});

module.exports = router;