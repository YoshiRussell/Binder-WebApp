import React, { useState, useEffect } from 'react';
import { Redirect, useRouteMatch, useHistory } from 'react-router-dom';

const CourseForm = ({ addNewCourse }) => {

    const [newCourse, setNewCourse] = useState("");
    const history = useHistory();

    useEffect(() => {
        console.log("mounted");
        return () => {
            console.log("unmounted")
        }},[]);

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