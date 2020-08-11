import React from 'react';
import Login from './Login';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CourseDetail from './CourseDetail';
import CourseForm from './CourseForm';

export const history = createBrowserHistory();

function App() {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
