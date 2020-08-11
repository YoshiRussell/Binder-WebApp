import React, { useState, useEffect, useRef } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { API_ENDPOINT, REACT_APP_URI } from '../index.js';
import { BrowserRouter as Router, Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import CoursesNavbar from './CoursesNavbar';
import CourseDetail from './CourseDetail';
import CourseForm from './CourseForm';
import MyFetchAPI from '../classes/MyFetchAPI';
import MockMyFetchAPI from '../mock/MockMyFetchAPI';
import useFetchAccessToken from '../hooks/useFetchAccessToken';
import useAPI from '../hooks/useAPI';

/**
 * * Purpose: Renders the UI of a user's profile
 * * Structure: <Navbar>
 * *            <courseDetail> / <courseForm>
 * *            <profile info>
 */
const Profile = () => {

    console.log("PROFILE COMPONENT RENDER");
    
    // ! TESTING VARIABLE THAT TRIGGERS MOCK DATABASE AND API
    const testing = false;

    const { isAuthenticated, user, logout } = useAuth0();
    const { isLoading, 
            error, 
            data, 
            getRequest, 
            postRequest    
    } = useAPI();

    //const [accessToken, setAccessToken] = useState(null);
    const mounted = useRef(false);

    const accessToken = useFetchAccessToken({ audience: 'http://localhost:8080/', scope: 'read:user_courses write:user_courses' });
    const [activeCourse, setActiveCourse] = useState(null);
    const [userCourses, setUserCourses] = useState({});
    const [courseFormActive, activateCourseForm] = useState(false);

    // OnAccessTokenUpdate
    useEffect(() => {
        (async() => {
            if (mounted.current) {
                //const cDB = new MyFetchAPI('http://localhost:8080', user.sub, accessToken);
                //setCloudDB(cDB);
                getRequest(`${API_ENDPOINT}/api/user/courses/${user.sub}`, accessToken);
                //setUserCourses(userCourses);
            }
            else mounted.current = true;
        })();
    },  [accessToken])


    console.log("data: " + data);

    return (
        <div>
            { isLoading && 
                <div>Loading Data</div>
            }
            { error && 
                <div>There was some error</div>
            }
            { !(isLoading || error) &&
                <div className="panel with-nav-tabs panel-default">
                    <CoursesNavbar 
                    userCoursesData={data ? data : []}
                    activeCourse={activeCourse}
                    setActiveCourse={setActiveCourse} 
                    courseFormActive={courseFormActive}
                    activateCourseForm={activateCourseForm} />
                    <div className="tab-content">
                        { courseFormActive && 
                            <CourseForm
                                setActiveCourse={setActiveCourse}
                                setUserCourses={setUserCourses}
                                accessToken={accessToken} />
                        }
                        { activeCourse && 
                            <CourseDetail
                                courseID={activeCourse}
                                accessToken={accessToken} />
                        }
                    </div>         
                </div>
            }
            User email: {user.email} <br />
            Authenticated: {isAuthenticated ? 'Yes' : 'No'} <br />
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div>
    )
}

export default withAuthenticationRequired(Profile);