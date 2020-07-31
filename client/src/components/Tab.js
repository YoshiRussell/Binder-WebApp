import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

const Tab = ({ tab_name, tab_list, propogateUpdate, showThisList }) => {

    console.log("TAB RENDER");
    
    const [showList, toggleShowList] = useState(showThisList);
    const [taskDescription, setTaskDescription] = useState("");
    const [tabList, updateTabList] = useState(tab_list);
    const mounted = useRef(true);

    function handleSubmit() {
        console.log("inside handleSubmit");
        updateTabList(prevTabList => {
            return [...prevTabList, taskDescription]
        });
        setTaskDescription("");
    }

    useEffect(() => {
        if (mounted.current) mounted.current = false;
        else propogateUpdate(tab_name, tabList); 
    }, [tabList])

    useEffect(() => {
        console.log("mounting tab");
        return () => {
            console.log("unmounting tabs");
        }     
    }, []);

    return (
        <div className="tab_container">
            <button className={showList ? "tab_name_on" : "tab_name_off"}
                    onClick={() => toggleShowList(prevStatus => !prevStatus)}>
                <h3>{tab_name}</h3>
            </button>
            {showList ? (
                <div>
                    {tabList.length > 0 ? (
                        <ul>
                            {tabList.map((desc, index) => {
                                return <li key={index}>{desc}</li>
                            })}
                        </ul>
                    ) : (
                        <p>No tasks yet o:</p>
                    )}  
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