import { useState } from 'react';

const MockMyFetchAPI = () => {
    
        const [mockDB, setMockDB] = useState({
            '1' : {
                course_name: "CSE 101",
                details: [
                    {
                        tab_name: "HOMEWORK",
                        tab_list: ["read pages for cse 101", "program this for cse 101"]
                    },
                    {
                        tab_name: "QUIZZES/TESTS",
                        tab_list: ["quiz next week for cse 101", "test tomorrow for cse 101"]
                    }
                ]
            },
            '2': {
                course_name: "CSE 150",
                details: [
                    {
                        tab_name: "HOMEWORK",
                        tab_list: ["read pages for cse 150", "program this for cse 150"]
                    },
                    {
                        tab_name: "QUIZZES/TESTS",
                        tab_list: ["quiz tomorrow for cse 150", "test next week for cse 150"]
                    }
                ]
            }
        });
      

    // * This should be called on mount of Navbar and cached
    function getUserCoursesFromDB() {
        const mockCourseList = {};
        Object.keys(mockDB).map(course_key => {
            mockCourseList[course_key] = mockDB[course_key].course_name;
        })
        return mockCourseList;
    }

    // * This should be called on mount of courseDetails and cached
    function getSpecificCourseDetailsFromDB(courseID) {

        console.log(mockDB);
        console.log("course ID: " + courseID);

        const mockDetails = mockDB[courseID].details;

        if (Object.keys(mockDetails).length === 0) console.log("mock tabs is empty");

        return mockDetails;
    }

    // * adds course to DB
    function postNewCourseToDB(courseID, courseName, courseDetail) {
        
        const newCourse = {};
        newCourse[courseID] = {
            course_name: courseName,
            details: courseDetail
        }

        setMockDB(prevDB => {
            return {
                ...prevDB,
                ...newCourse
            }
        });
    }

    // * updates detail to DB
    function postNewDetailToDB(courseID, tabName, updatedDetailList) {
        
        const newCourse = {};
        newCourse[courseID] = {
            ...mockDB[courseID],
            details: updatedDetailList
        }
        setMockDB(prevDB => {
            return {
                ...prevDB,
                ...newCourse
            }
        });

    }

    return {mockDB, getUserCoursesFromDB, getSpecificCourseDetailsFromDB, postNewCourseToDB, postNewDetailToDB};
}

export default MockMyFetchAPI;