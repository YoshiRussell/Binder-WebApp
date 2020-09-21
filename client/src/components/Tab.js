import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import useAPI from '../hooks/useAPI';
import { API_ENDPOINT } from '../index.js';

const Tab = ({ courseID, tab_name, tab_list, accessToken }) => {

    console.log("TAB RENDER");
    
    const {
        postRequest
    } = useAPI();

    // * tab states
    const [showList, toggleShowList] = useState(false);
    const [taskDescription, setTaskDescription] = useState("");
    const [tabList, updateTabList] = useState(tab_list);


    // * update tab list view when new detail is added
    function handleSubmit() {        
        if (taskDescription !== "") {
            updateTabList(prevTabList => {
                return [...prevTabList, taskDescription]
            });
            const requestBody = { desc: taskDescription, tabName: tab_name };
            postRequest(`${API_ENDPOINT}/api/courses/courseDetail/${courseID}`, 
                        requestBody,
                        false,
                        accessToken);
            setTaskDescription("");
        }   
    }

    // * delete specific task
    function handleDeleteTask(indexToDelete) {
        
        // update tab list ui and update database after task delete
        updateTabList(prevTabList => {
            const updatedTabList = prevTabList.filter((desc, index) => index !== indexToDelete);
            const reqBody = { tabList: updatedTabList, tabName: tab_name};
            postRequest(`${API_ENDPOINT}/api/courses/courseDetail/delete/${courseID}`, reqBody, false, accessToken);
            return updatedTabList;
        });
    }

    // * create the tab list view
    const tabListView = tabList.map((desc, index) => {
        return (
            <li key={index}>
                {desc}
                <button onClick={() => handleDeleteTask(index)}>DELETE TASK</button>
            </li>
        )
    });


    // * JSX view
    return (
        <div className="tab_container">
            <button className={showList ? "tab_name_on" : "tab_name_off"}
                    onClick={() => toggleShowList(prevStatus => !prevStatus)}>
                <h3>{tab_name}</h3>
            </button>
            {showList ? (
                <div className="opened-tab">
                    {tabList.length > 0 ? (<ul>{tabListView}</ul>) : (<p>No tasks yet o:</p>)}  
                    <div className="add-task-row">
                        <input 
                            type="text"
                            value={taskDescription}
                            placeholder="Add new task"
                            onChange={e => setTaskDescription(e.target.value)} 
                        />
                        <button onClick={e => handleSubmit()}>Add Detail</button>
                    </div>
                </div>
            ) : (
                null
            )}
        </div>
    )
}

export default Tab;