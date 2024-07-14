import axios from 'axios';
import { updateTokenAction } from '../Redux/AuthReducer';
import { Store } from '../Redux/Store';

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
    request => {       
        request.headers.Authorization = `Bearer ${Store.getState().auth.token}`;
        console.log("BEFORE POST",request.headers.Authorization)
        return request;
    }
);

axiosJWT.interceptors.response.use(
    response => {
        const authorization:string = response.headers.authorization.split(' ')[1];
        Store.dispatch(updateTokenAction(authorization));      
        sessionStorage.setItem('jwt', authorization);               
        return response;
    }
);

export default axiosJWT;
