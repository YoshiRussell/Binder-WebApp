import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App, { history } from './components/App';
import { Auth0Provider } from '@auth0/auth0-react';
import * as serviceWorker from './serviceWorker';

export const API_ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://production';
export const REACT_APP_URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://production';


ReactDOM.render(
    <Auth0Provider
        domain="dev-lkenkzaj.us.auth0.com"
        clientId="Hqq37FWBhQMfkwX6OPMnSn4yEjZrFvYL"
        redirectUri='http://localhost:3000/profile'
        audience="http://localhost:8080/"
        scope="read:user_courses write:user_courses"
    >
        <App />
    </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
