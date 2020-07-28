import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';
import { API_ENDPOINT, REACT_APP_URI } from '../index.js';
import courseData from '../tempCourseData.js';
import { BrowserRouter as Router, Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import CoursesNavbar from './CoursesNavbar';
import CourseDetail from './CourseDetail';
import CourseForm from './CourseForm';

const Profile = () => {

    console.log("PROFILE COMPONENT RENDER");
    
    const history = useHistory();
    const { url, path } = useRouteMatch();

    // auth0 hooks
    const { user, logout, getAccessTokenSilently } = useAuth0();
    // access token to propogate to children components
    const [accessToken, setAccessToken] = useState(null);
    // user's courses and their data
    const [courseMetaData, setCourseMetaData] = useState(courseData);
    // toggle which course data to show in CourseDetail component
    const [courseToShow, setCourseToShow] = useState([])
    // toggle which course tab to activate 
    const [activeCourse, setActiveCourse] = useState("");

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

    // Functionality for adding a new course 
    function addNewCourse(newCourseName) {

        // create empty template 
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

        // update course meta data, and activate and show new course tab
        setCourseMetaData(prevMetaData => {
            setActiveCourse(newCourse._id);
            setCourseToShow(newCourse.tabs);
            return [...prevMetaData, newCourse]
        });

    }
    
    return (
        <div>
            <CoursesNavbar 
                courseMetaData={courseMetaData} 
                setCourseToShow={setCourseToShow}
                activeCourse={activeCourse}
                setActiveCourse={setActiveCourse} 
            />
            <Switch>
                <Route path={`${path}/courseDetail`} component={() => <CourseDetail courseToShow={courseToShow} />} />
                <Route path={`${path}/courseForm`} component={() => <CourseForm addNewCourse={addNewCourse} />} />
            </Switch>
            
            User email: {user.email} <br />
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div> 
    )
}

export default withAuthenticationRequired(Profile);