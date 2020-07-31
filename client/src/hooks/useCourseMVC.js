
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_ENDPOINT, REACT_APP_URI } from '../index.js';



// hook to deal with updating course data locally and setting up view
export const useCourseMVC = () => {

    console.log("Render useCourseMVC");

    const [courseModel, setcourseModel] = useState({});
    const [courseView, setCourseView] = useState("");
    const [listView, setListView] = useState(null);

    console.log("---------- courseModel ----------");
    console.log(courseModel);

    useEffect(() => {
        
        console.log("mounting useCourseMVC");
    
        // Temporary metaData template example that I want to cache locally 
        const courseModel = {
            '1' : {
                course_name: "CSE 101",
                tabs: [
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
                tabs: [
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
        }
        
        /** DONT FORGET TO ADD ASYNC LATER FOR AWAIT */
        // const headerConfig = {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     }
        // };
        // const response = await axios.get(`${API_ENDPOINT}/api/courses/${user.sub}`, headerConfig);
        const response = {
            data: courseModel
        }

        const initialDataObj = {};

        Object.keys(response.data).map(course_key => {
            initialDataObj[course_key] = {
                course_name: response.data[course_key].course_name,
                tabs: response.data[course_key].tabs
            }
        });

        console.log(initialDataObj);

        setcourseModel(initialDataObj);
    }, []) 

    // Takes updateType string which maps to different cases
    // Takes newData object that holds values needed to update 
    // This function should be called when we either
    //   1) add a new course
    //   2) add a new detail
    function updateCourseModel(updateType, newData) {

        const { courseID, value, tabName } = newData;

        switch(updateType) {
            case "newCourse":
                const newCourse = {};
                newCourse[courseID] = {
                    course_name: value,
                    tabs: [
                        {
                            tab_name: "HOMEWORK",
                            tab_list: []
                        },
                        {
                            tab_name: "QUIZZES/TESTS",
                            tab_list: []
                        }
                    ]
                }
                setcourseModel({...courseModel, ...newCourse});
                updateCourseView(courseID);
                break;
            
            case "newDetail":
                const updatedTabsList = courseModel[courseID].tabs.map(tab => {
                    if (tab.tab_name === tabName) {
                        return {
                            ...tab,
                            tab_list: value
                        }
                    }
                    return tab;
                });
                
                // Skeptically on whether this is ok
                Object.keys(courseModel).map(course_key => {
                    if (course_key === courseID) {
                        courseModel[course_key].tabs = updatedTabsList;
                    }
                })

                setcourseModel(courseModel);
                setListView(tabName);
                break;

            default:
                console.log("invalid updateType");
        }
    }
    
    // this should be called when we click on a course from the NAVBAR
    function updateCourseView(courseID) {
        setCourseView(courseID);
        setListView(null);
    }


    return [courseModel, updateCourseModel, updateCourseView, courseView, listView, setListView];
    
}
