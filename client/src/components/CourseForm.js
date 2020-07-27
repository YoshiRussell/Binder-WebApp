import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const CourseForm = ({ history, addNewCourse }) => {

    const [newCourse, setNewCourse] = useState("");

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
                    history.goBack();
                }}>
                ADD COURSE
            </button>
        </div>
    )
}

export default withRouter(CourseForm);  