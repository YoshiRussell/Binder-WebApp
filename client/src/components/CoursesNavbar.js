import React, { useState } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Link, useRouteMatch } from 'react-router-dom';
 
const CoursesNavbar = ({ courseMetaData, setCourseToShow, activeCourse, setActiveCourse }) => {

    console.log("COURSENAVBAR COMPONENT RENDER");

    const { url } = useRouteMatch();

    const renderCourses = courseMetaData.map((course, index) => {
        return (
            <li key={index}>
                <Link 
                    id={course._id}
                    onClick={e => {
                        setCourseToShow(courseMetaData.find(course => course._id === e.target.id).tabs);
                        setActiveCourse(e.target.id);
                    }}
                    className={course._id === activeCourse ? "active" : ""}
                    style={course._id === activeCourse ? {backgroundColor: 'white'} : null }
                    to={`${url}/courseDetail`}>
                    {course.course_name}
                </Link>
            </li>
        )
    });

    return (
        <div className="panel-heading">
            <ul className="nav nav-tabs">
                {renderCourses}
                <li>
                        <Link 
                            id="add_course"
                            onClick={e => setActiveCourse(e.target.id)}
                            className={activeCourse === "add_course" ? "active" : ""}
                            style={activeCourse === "add_course" ? {backgroundColor: '#ddd'} : null }
                            to={`${url}/courseForm`}>
                            Add Course +
                        </Link>
                </li>
            </ul>
        </div>
    )
}

export default withAuthenticationRequired(CoursesNavbar);