/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import axios from 'axios';
// import { genRequestId } from './common';
import { baseApi } from './constant';

const baseApiUrl = `${baseApi}/`;

const baseInstance = axios.create({
    baseURL: baseApiUrl,
});

baseInstance.interceptors.request.use(
    (config) => {
        // config.headers['Content-Type'] = 'multipart/form-data';
        // config.headers["X-Request-ID"] = genRequestId();
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => Promise.reject(error),
);

baseInstance.defaults.timeout = 60000;

baseInstance.interceptors.response.use(
    (response) => {
        console.log('res: ', response);
        return response;
    },
    (error) => {
        // eslint-disable-next-line no-console
        // console.log(error.message);
        //  message = error.message;
        // if (error.response.data && error.response.data.errors) {
        //   message = error.response.data.errors;
        // } else if (error.response.data && error.response.data.error) {
        //   message = error.response.data.error;
        // }
        return Promise.reject(error);
    },
);

export default baseInstance;
