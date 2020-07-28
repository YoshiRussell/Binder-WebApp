import React, { useState } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Link, useRouteMatch } from 'react-router-dom';
 
const CoursesNavbar = ({ courseMetaData, setCourseToShow, activeCourse, setActiveCourse }) => {

    console.log("COURSENAVBAR COMPONENT RENDER");

    const { url } = useRouteMatch();

    const renderCourses = courseMetaData.map((course, index) => {
        return (
            <li className="nav-item" key={index}>
                <Link 
                    id={course._id}
                    onClick={e => {
                        setCourseToShow(courseMetaData.find(course => course._id === e.target.id).tabs);
                        setActiveCourse(e.target.id);
                    }}
                    className={course._id === activeCourse ? "nav-link active" : "nav-link"}
                    style={course._id === activeCourse ? {backgroundColor: "white", color: "black"} : {backgroundColor: "LightGrey", color: "black"}}
                    to={`${url}/courseDetail`}>
                    {course.course_name}
                </Link>
            </li>
        )
    });

    return (
        <nav>
            <ul className="nav nav-tabs nav-fill">
                {renderCourses}
                <li className="nav-item">
                        <Link 
                            id="add_course"
                            onClick={e => setActiveCourse(e.target.id)}
                            className={activeCourse === "add_course" ? "nav-link active" : "nav-link"}
                            style={activeCourse === "add_course" ? {backgroundColor: "white"} : {backgroundColor: "LightGrey"}}
                            to={`${url}/courseForm`}>
                            Add Course +
                        </Link>
                </li>
            </ul>
        </nav>
    )
}

export default withAuthenticationRequired(CoursesNavbar);