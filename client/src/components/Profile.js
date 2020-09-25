import React, { useState, useEffect, useRef } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { API_ENDPOINT, REACT_APP_URI } from '../index.js';
import CoursesNavbar from './CoursesNavbar';
import CourseDetail from './CourseDetail';
import CourseForm from './CourseForm';
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
    
    //* hooks
    const { isAuthenticated, user, logout } = useAuth0();
    const { isLoading, error, data, getRequest } = useAPI();
    const mounted = useRef(false);
    const accessToken = useFetchAccessToken({ audience: 'http://localhost:8080/', scope: 'read:user_courses write:user_courses' });
    const [activeCourse, setActiveCourse] = useState(null);
    const [userCourses, setUserCourses] = useState({});
    const [courseFormActive, activateCourseForm] = useState(false);

    //* access token received side effect
    useEffect(() => {
            if (mounted.current) {
                getRequest(`${API_ENDPOINT}/api/user/courses/${user.sub}`, accessToken);
            }
            else mounted.current = true;
    },  [accessToken])

    //* data received side effect
    useEffect(() => {
        setUserCourses(data);
        console.log(data);
    }, [data])

    //* View
    return (
        <>
            { !(isLoading || error) &&
                <div className="panel with-nav-tabs panel-default">
                    <CoursesNavbar 
                    userCoursesData={userCourses ? userCourses : []}
                    activeCourse={activeCourse}
                    setActiveCourse={setActiveCourse} 
                    courseFormActive={courseFormActive}
                    activateCourseForm={activateCourseForm} />
                    <div className="tab-content">
                        { courseFormActive && 
                            <CourseForm
                                setActiveCourse={setActiveCourse}
                                setUserCourses={setUserCourses}
                                activateCourseForm={activateCourseForm}
                                accessToken={accessToken} />
                        }
                        { activeCourse && 
                            <CourseDetail
                                userID={user.sub}
                                courseID={activeCourse}
                                setUserCourses={setUserCourses}
                                setActiveCourse={setActiveCourse}
                                accessToken={accessToken} />
                        }
                    </div>         
                </div>
            }
            User email: {user.email} <br />
            Authenticated: {isAuthenticated ? 'Yes' : 'No'} <br />
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </>
    )
}

export default withAuthenticationRequired(Profile);