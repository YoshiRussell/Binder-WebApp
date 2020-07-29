import React, { useState } from 'react';

const Tab = ({ tab_name, tab_list }) => {

    const [showList, toggleShowList] = useState(false);



    return (
        <div className="tab_container">
            <button className={showList ? "tab_name_on" : "tab_name_off"}
                    onClick={() => toggleShowList(prevStatus => !prevStatus)}>
                <h3>{tab_name}</h3>
            </button>
            {showList && tab_list.length > 0 ? (
                <ul>
                    {tab_list.map((desc, index) => {
                        return <li key={index}>{desc}</li>
                    })}
                </ul>
            ) : (
                showList ? (
                    <p>No tasks yet o:</p>
                ) : (
                    null
                )
            )}
        </div>
    )
}

export default Tab;