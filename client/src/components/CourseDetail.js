import React from 'react';

const CourseDetail = ({ courseToShow }) => {

    console.log("COURSEDETAIL COMPONENT RENDER");

    return (
        <div>
            {courseToShow.map((courseTab, outerIndex) => {
                return (
                    <div key={outerIndex}>
                        <h1>{courseTab.tab_name}</h1>
                        <ul>
                            {courseTab.tab_list.map((desc, innerIndex) => {
                                return <li key={innerIndex}>{desc}</li>
                            })}
                        </ul> 
                    </div>
                )
            })}
        </div>
    )
}

export default CourseDetail;