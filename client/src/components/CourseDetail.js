import React from 'react';
import Tab from './Tab';

const CourseDetail = ({ courseToShow }) => {

    console.log("COURSEDETAIL COMPONENT RENDER");

    return (
        <div className="tab-pane active">
            {courseToShow.map((courseTab, outerIndex) => {
                return (
                    <Tab key={outerIndex} tab_name={courseTab.tab_name} tab_list={courseTab.tab_list} />
                )
            })}
        </div>
    )
}

export default CourseDetail;