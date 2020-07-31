import React, { useEffect } from 'react';
import Tab from './Tab';
import { Redirect } from 'react-router-dom';

const CourseDetail = ({ courseModel, courseToShow , propogateUpdate, showList }) => {

    console.log("COURSEDETAIL COMPONENT RENDER");
    console.log(courseToShow);

    function updateList(tabName, updatedList) {
        propogateUpdate(courseToShow, tabName, updatedList);
    }

    useEffect(() => {
        console.log("mounting courseDetail");
        return () => {
            console.log("unmounting courseDetail");
        }
    }, [])

    return (
        courseModel[courseToShow] ? (
            <div className="tab-pane active">
                {courseModel[courseToShow].tabs.map((courseTab, outerIndex) => {
                    return (
                        <Tab 
                            key={outerIndex} 
                            tab_name={courseTab.tab_name} 
                            tab_list={courseTab.tab_list} 
                            propogateUpdate={updateList}
                            showThisList={showList === courseTab.tab_name ? true : false}
                        />
                    )
                })}
            </div>
        ) : (
            <Redirect to="/profile" />
        )
    )
}

export default CourseDetail;