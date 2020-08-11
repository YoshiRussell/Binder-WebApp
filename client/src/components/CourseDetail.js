import React, { useEffect, useState } from 'react';
import Tab from './Tab';
import { Redirect } from 'react-router-dom';
import useAPI from '../hooks/useAPI';
import { API_ENDPOINT } from '../index.js';

const CourseDetail = ({ courseID, accessToken }) => {
    console.log("COURSEDETAIL COMPONENT RENDER");

    const {
        isLoading,
        error,
        data,
        getRequest
    } = useAPI();
 
    useEffect(() => {
        let isCancelled = false;
        if (!isCancelled) getRequest(`${API_ENDPOINT}/api/courses/courseDetail/${courseID}`, accessToken);
        return () => {
            console.log("course detail unmounted");
            isCancelled = true;
        }
    }, [])


    return (
        <div>
            { isLoading && 
                <h3>Loading Course's data...</h3>
            }
            { error &&
                <h3>Error loading Course's data</h3>
            }
            { !(isLoading || error) && 
                <div className="tab-pane active">
                    {data.map((courseTab, outerIndex) => {
                        return (
                            <Tab 
                                key={outerIndex} 
                                courseID={courseID}
                                tab_name={courseTab.tab_name} 
                                tab_list={courseTab.tab_list} 
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default CourseDetail;