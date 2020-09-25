import { useEffect, useState } from "react"
import { useAuth0 } from '@auth0/auth0-react';
import { API_ENDPOINT, REACT_APP_URI } from '../index';

const useFetchAccessToken = ({ audience, scope }) => {

    console.log("useFetchAccessToken hook render");

    const { getAccessTokenSilently } = useAuth0();

    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        console.log("Inside getAccessTokenSilently useEffect");
        getAccessTokenSilently({audience, scope})
            .then(token => {
                setAccessToken(token);
            })
            .catch(error => {
                console.log("error getting token: " + error);
            });
    }, [getAccessTokenSilently]);

    return accessToken;

}

export default useFetchAccessToken;