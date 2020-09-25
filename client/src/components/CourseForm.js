import React, { useState, useEffect, useRef } from 'react';
import useAPI from '../hooks/useAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { API_ENDPOINT } from '../index.js';

const CourseForm = ({ setActiveCourse, setUserCourses, activateCourseForm, accessToken }) => {

    const { user } = useAuth0();

    const { data, postRequest } = useAPI();
    const [newCourse, setNewCourse] = useState("");
    const mounted = useRef(false);

    function addNewCourse(newCourseName) {
        (async() => {
            try {
                const reqBody = { courseName: newCourseName };
                await postRequest(`${API_ENDPOINT}/api/user/courses/${user.sub}`, reqBody, true, accessToken);
            } catch(error) {
                console.log("Error getting new courseID");
            }
        })();  
    }

    useEffect(() => {
        if (mounted.current) {
            setActiveCourse(data.courseID);
            setUserCourses(prevUserCourses => {
                const newCourseList = {...prevUserCourses};
                newCourseList[data.courseID] = data.courseName;
                return newCourseList;
            });
            activateCourseForm(false);
        } else {
            mounted.current = true;
        }
    }, [data])


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
                    }}>
                    ADD COURSE
                </button>
            </div>
        )
}

export default CourseForm;  