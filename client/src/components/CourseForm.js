import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CourseForm = ({ addNewCourse }) => {

    console.log("COURSE FORM COMPONENT RENDERED");

    const [newCourse, setNewCourse] = useState("");
    const history = useHistory();

    return (
        
            <div>
                <form>
                    <input 
                        type="text"
                        value={newCourse}
                        placeholder="Add Course Name Here"
                        onChange={e => setNewCourse(e.target.value)}
                    />
                </form>
                <button 
                    className="btn btn-secondary" 
                    onClick={e => {
                        e.preventDefault(); 
                        addNewCourse(newCourse);
                        history.replace('/profile/courseDetail');
                    }}>
                    ADD COURSE
                </button>
            </div>
        )
}

export default CourseForm;  