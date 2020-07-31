import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';
import { API_ENDPOINT, REACT_APP_URI } from '../index.js';
import courseData from '../tempCourseData.js';
import { BrowserRouter as Router, Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import CoursesNavbar from './CoursesNavbar';
import CourseDetail from './CourseDetail';
import CourseForm from './CourseForm';
import { useCourseMVC } from '../hooks/useCourseMVC';

const Profile = () => {

    console.log("PROFILE COMPONENT RENDER");
    
    const { path } = useRouteMatch();

    useEffect(() => {
        console.log("mounting profile");
        return () => {
            console.log("unmounting profile");
        }
    }, []);

    // auth0 hooks
    const { user, logout, getAccessTokenSilently } = useAuth0();
    // access token to propogate to children components
    const [accessToken, setAccessToken] = useState(null);
    // create a custom hook that handles the four hooks above
    const [courseModel, updateCourseModel, updateCourseView, courseView, listView, setListView] = useCourseMVC();
    
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
        const courseID = `${courseModel.length + 1}`;
        const value = newCourseName;
        updateCourseModel('newCourse', { courseID, value });
    }

    // Functionality for adding a new detail
    function updateTabList(courseID, tabName, newList) {
        const value = newList;
        updateCourseModel('newDetail', { courseID, value, tabName })
    }
    
    return (
        <div className="panel with-nav-tabs panel-default">
            <CoursesNavbar 
                courseModel={courseModel}
                courseView={courseView}
                updateCourseView={updateCourseView}
                setListView={setListView}
            />
            <div className="tab-content">
                <Switch>
                    <Route 
                        path={`${path}/courseDetail`} 
                        component={() => <CourseDetail 
                                            courseModel={courseModel}
                                            courseToShow={courseView}
                                            propogateUpdate={updateTabList}
                                            showList={listView}
                                         />
                        } 
                    />
                    <Route 
                        path={`${path}/courseForm`} 
                        component={() => <CourseForm 
                                            addNewCourse={addNewCourse} 
                                         />
                        } 
                    />
                </Switch>
            </div>         
            User email: {user.email} <br />
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div>
    )
}

export default withAuthenticationRequired(Profile);