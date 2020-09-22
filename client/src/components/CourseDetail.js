import React, { useEffect, useState, useRef } from 'react';
import Tab from './Tab';
import { Redirect, useRouteMatch } from 'react-router-dom';
import useAPI from '../hooks/useAPI';
import { API_ENDPOINT } from '../index.js';

const CourseDetail = ({ userID, courseID, setUserCourses, setActiveCourse, accessToken }) => {
    console.log("COURSEDETAIL COMPONENT RENDER");
    console.log(`COURSEDETAIL ID: ${courseID}`);
    const {
        isLoading,
        error,
        data,
        getRequest,
        postRequest
    } = useAPI();
    
    
    useEffect(() => {
        console.log("INSIDE COURSEDETAIL USEEFFECT");
        getRequest(`${API_ENDPOINT}/api/courses/courseDetail/${courseID}`, accessToken);
        return () => {
            console.log("course detail unmounted");
        }
    }, [courseID])

    function handleDeleteCourse() {
        if(window.confirm("Are you sure you want to delete this course? There is no way to get this course's information back.")) {
            // delete course from database
            const reqBody = { courseID };
            postRequest(`${API_ENDPOINT}/api/user/courses/delete/${userID}`, reqBody, false, accessToken);

            // delete ui representation of this course
            setUserCourses(prevUserCourses => {
                const updatedUserCourses = {};
                Object.entries(prevUserCourses).map(entry => {
                    if (entry[0] !== courseID) updatedUserCourses[entry[0]] = entry[1];
                });
                return updatedUserCourses;
            });
            setActiveCourse(null);  
        } else {
            return;
        }
    }

    return (
        <div>
            { error &&
                <h3>Error loading Course's data</h3>
            }
            { isLoading &&
                <div className="tab-pane active">
                    <div className="tab_container">
                        <button className="tab_name_off"><h3>HOMEWORK</h3></button>
                    </div>
                    <div className="tab_container">
                        <button className="tab_name_off"><h3>QUIZZES/TESTS</h3></button>
                    </div>
                    <button>Delete this Course</button>
                </div>
            }
            { !(isLoading || error) && 
                <div className="tab-pane active">
                    {data.map((courseTab, outerIndex) => {
                        return (
                            <Tab 
                                key={outerIndex} 
                                courseID={courseID}
                                tab_name={courseTab.tab_name} 
                                tab_list={courseTab.tab_list} 
                                accessToken={accessToken}
                            />
                        )
                    })
                    }
                    <button onClick={() => handleDeleteCourse()}>Delete this Course</button>
                </div>
            }
        </div>
    )
}

export default CourseDetail;