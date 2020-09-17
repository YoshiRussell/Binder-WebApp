import axios from "axios";
import React, { useState } from 'react';

const useAPI = () => {

    const [fetchingState, setFetchingState] = useState({
        isLoading: true,
        error: null,
        data: null
    });

    const setConfig = (accessToken) => {
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    }

    async function getRequest(url, accessToken) {
        console.log("INSIDE GET REQUEST");
        const headerConfig = setConfig(accessToken);
        try {
            setFetchingState({ ...fetchingState, isLoading: true });
            const response = await axios.get(url, headerConfig);
            console.log("RESPONSE DATA: " + JSON.stringify(response.data));
            setFetchingState({ ...fetchingState, isLoading: false, data: response.data });
        } catch(error) {
            setFetchingState({ ...fetchingState, isLoading: false, error: error });
        }
    }

    async function postRequest(url, requestBody, returnResponse, accessToken) {
        const headerConfig = setConfig(accessToken);
        console.log(accessToken);
        try {
            if (returnResponse) {
                setFetchingState({ ...fetchingState, isLoading: true });
                const response = await axios.post(url, requestBody, headerConfig);
                setFetchingState({ ...fetchingState, isLoading: false, data: response.data });
            } else {
                axios.post(url, requestBody, headerConfig);
            }
        } catch(error) {
            setFetchingState({ ...fetchingState, isLoading: false, error: error });
        }
    }

    return {
        ...fetchingState,
        getRequest,
        postRequest
    }
}

export default useAPI;