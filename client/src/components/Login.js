import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const { loginWithRedirect, isLoading, isAuthenticated, error } = useAuth0();

    if (isLoading) {
        return <div>Loading your Profile...</div>;
    }

    if (error) {
        return <div>There was an error while authenticating</div>;
    }

    if (isAuthenticated) {
        return <Redirect to="/profile" />;
    }
    
    else {
        return (
            <div>
                <h1>Online Binder Web App</h1>
                <button onClick={() => loginWithRedirect()}>Log In</button>
            </div>
        )
    }
}

export default Login;