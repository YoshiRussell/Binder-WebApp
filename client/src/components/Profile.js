import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';
import { API_ENDPOINT, REACT_APP_URI } from '../index.js';
import courseData from '../tempCourseData.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CoursesNavbar from './CoursesNavbar';
import CourseDetail from './CourseDetail';
import CourseForm from './CourseForm';

const Profile = () => {

    console.log("PROFILE COMPONENT RENDER");

    const { user, logout, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);
    //const [courseMetaData, setCourseMetaData] = useState([]);
    const [courseMetaData, setCourseMetaData] = useState(courseData);
    const [courseToShow, setCourseToShow] = useState([])

    // FETCH ACCESS TOKEN TO ACCESS PROTECTED ROUTES
    // useEffect(() => {
    //     getAccessTokenSilently({
    //         audience: API_ENDPOINT,
    //         redirect_uri: `${REACT_APP_URI}/profile`
    //     }).then(accessToken => {
    //         setAccessToken(accessToken);
    //     }).catch(err => {
    //         console.log("There was an error getting access token for our API with error: " + err);
    //     });
    // }, [getAccessTokenSilently]);


    function courseDetailToShow(event) {
        setCourseToShow(courseMetaData.find(o => o._id === event.target.id).tabs);
    }

    function addNewCourse(newCourseName) {
        const newCourse = {
            _id: `${(courseMetaData.length + 1)}`,
            course_name: newCourseName,
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
        };
        setCourseMetaData(prevMetaData => [...prevMetaData, newCourse]);
    }
    
    return (
        <div>
            <Router>
                <CoursesNavbar courseMetaData={courseMetaData} courseDetailToShow={courseDetailToShow} />
                <Switch>
                    <Route path="/courseDetail">
                        <CourseDetail courseToShow={courseToShow} />
                    </Route>
                    <Route path="/courseForm">
                        <CourseForm addNewCourse={addNewCourse} />
                    </Route>
                </Switch>
            </Router>
            
            
            User email: {user.email} <br />
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div> 
    )
}

export default withAuthenticationRequired(Profile);