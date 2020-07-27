import React, { useEffect } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
 
const CoursesNavbar = ({ courseMetaData, courseDetailToShow }) => {

    return (
        <nav>
            <ul className="nav nav-tabs nav-fill">
                {courseMetaData.map((course, index) => {
                    console.log(course);
                    return (
                        <li className="nav-item" key={index}>
                            <Link 
                                className="nav-link"
                                id={course._id}
                                onClick={e => courseDetailToShow(e)}
                                to="/courseDetail">
                                {course.course_name}
                            </Link>
                        </li>
                    )
                })}
                <li className="nav-item">
                    <Link 
                        className="nav-link"
                        to="/courseForm">
                        Add Course +
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default withAuthenticationRequired(CoursesNavbar);