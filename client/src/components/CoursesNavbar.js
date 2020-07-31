import React, { useState } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Link, useRouteMatch } from 'react-router-dom';
 
// const CoursesNavbar = ({ courseMetaData, setCourseToShow, activeCourse, setActiveCourse, setShowList }) => {

//     console.log("COURSENAVBAR COMPONENT RENDER");

//     const { url } = useRouteMatch();

//     const renderCourses = courseMetaData.map((course, index) => {
//         return (
//             <li key={index}>
//                 <Link 
//                     id={course._id}
//                     onClick={e => {
//                         setCourseToShow(courseMetaData.find(course => course._id === e.target.id));
//                         setActiveCourse(e.target.id);
//                         setShowList(null);
//                     }}
//                     className={course._id === activeCourse ? "active" : ""}
//                     style={course._id === activeCourse ? {backgroundColor: 'white'} : null }
//                     to={`${url}/courseDetail`}>
//                     {course.course_name}
//                 </Link>
//             </li>
//         )
//     });

//     return (
//         <div className="panel-heading">
//             <ul className="nav nav-tabs">
//                 {renderCourses}
//                 <li>
//                         <Link 
//                             id="add_course"
//                             onClick={e => setActiveCourse(e.target.id)}
//                             className={activeCourse === "add_course" ? "active" : ""}
//                             style={activeCourse === "add_course" ? {backgroundColor: '#ddd'} : null }
//                             to={`${url}/courseForm`}>
//                             Add Course +
//                         </Link>
//                 </li>
//             </ul>
//         </div>
//     )
// }

const CoursesNavbar = ({ courseModel, courseView, updateCourseView, setListView }) => {

    console.log("COURSENAVBAR COMPONENT RENDER");

    const { url } = useRouteMatch();

    const [courseFormActive, activateCourseForm] = useState(false);

    const renderCourses = Object.keys(courseModel).map((courseID, index) => {
        return (
            <li key={index}>
                <Link 
                    id={courseID}
                    onClick={e => {
                        activateCourseForm(false);
                        updateCourseView(courseID);
                        // setCourseToShow(courseMetaData.find(course => course._id === e.target.id));
                        // setActiveCourse(e.target.id);
                        // setShowList(null);
                    }}
                    className={courseID === courseView ? "active" : ""}
                    style={courseID ===  courseView ? {backgroundColor: 'white'} : null }
                    to={`${url}/courseDetail`}>
                    {courseModel[courseID].course_name}
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
                        onClick={() => {
                            activateCourseForm(true);
                            setListView(null);
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