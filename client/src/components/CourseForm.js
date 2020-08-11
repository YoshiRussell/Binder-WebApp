import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAPI from '../hooks/useAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { API_ENDPOINT } from '../index.js';

const CourseForm = ({ setActiveCourse, setUserCourses, accessToken }) => {
    console.log("COURSE FORM COMPONENT RENDERED");

    const { user } = useAuth0();

    const { isLoading,
            error,
            data,
            postRequest 
    } = useAPI();
    const [newCourse, setNewCourse] = useState("");
    const history = useHistory();

    function addNewCourse(newCourseName) {
        (async() => {
            try {
                //const newCourseID = await cloudDB.postNewCourseToDB(newCourseName); 
                const reqBody = { courseName: newCourseName };
                await postRequest(`${API_ENDPOINT}/api/user/courses/${user.sub}`, reqBody, true, accessToken)
                setActiveCourse(data);
                setUserCourses(prevUserCourses => {
                    const newCourseList = {...prevUserCourses}
                    newCourseList[data] = newCourseName;
                    return newCourseList;
                });
                
            } catch(error) {
                console.log("Error getting new courseID");
            }
        })();
       
    }


    return (
            <div>
                <form>
                    <input 
                        type="text"
                        value={newCourse}
                        placeholder="Add Course Name Here"
                        onChange={e => setNewCourse(e.target.value)}
                    />
                </form>
                <button 
                    className="btn btn-secondary" 
                    onClick={e => {
                        e.preventDefault(); 
                        addNewCourse(newCourse);
                        history.replace('/profile/courseDetail');
                    }}>
                    ADD COURSE
                </button>
            </div>
        )
}

export default CourseForm;  