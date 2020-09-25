import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Link, useRouteMatch } from 'react-router-dom';

const CoursesNavbar = ({ userCoursesData, activeCourse, setActiveCourse, courseFormActive, activateCourseForm }) => {
    
    console.log("COURSENAVBAR COMPONENT RENDER");

    const { url } = useRouteMatch();

    const courseListView = Object.keys(userCoursesData).map((courseID, index) => {
        return (
            <li key={index}>
                <Link 
                    id={courseID}
                    onClick={e => {
                        activateCourseForm(false);
                        setActiveCourse(courseID);
                    }}
                    className={courseID === activeCourse ? "active" : ""}
                    style={courseID ===  activeCourse ? {backgroundColor: 'lightsteelblue', color: 'white'} : null }
                    to={`${url}/courseDetail`}>
                    {userCoursesData[courseID]}
                </Link>
            </li>
        )
    });
   
    return (
        <div className="panel-heading">
            <ul className="nav nav-tabs">
                {courseListView}
                <li>
                    <Link 
                        id="add_course"
                        onClick={() => {
                            activateCourseForm(true);
                            setActiveCourse(null);
                        }}
                        className={courseFormActive ? "active" : ""}
                        style={courseFormActive ? {backgroundColor: '#ddd'} : null }
                        to={`${url}/courseForm`}>
                        Add Course +
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default withAuthenticationRequired(CoursesNavbar);