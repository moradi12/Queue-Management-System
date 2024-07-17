import axios from 'axios';
import { updateTokenAction } from '../Redux/AuthReducer';
import { Store } from '../Redux/Store';

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
    request => {
        const token = Store.getState().auth.token;
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
            console.log("BEFORE POST", request.headers.Authorization);
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosJWT.interceptors.response.use(
    response => {
        const authorization = response.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            Store.dispatch(updateTokenAction(token));
            sessionStorage.setItem('jwt', token);
        }
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Handle token expiration or unauthorized access
            console.error("Unauthorized or token expired");
            // Optionally, you can dispatch a logout action or redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosJWT;
