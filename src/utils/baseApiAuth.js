// import React from 'react';
import axios from 'axios';
import { baseApi } from './constant';

const baseApiUrlAuth = `${baseApi}/`;

const baseInstance = axios.create({
    baseURL: baseApiUrlAuth,
});

baseInstance.interceptors.request.use(
    async (config) => {
        try {
            const loginData = await localStorage.getItem('loginPage');
            if (loginData !== undefined) {
                const loginDataParse = JSON.parse(loginData);
                config.headers.Authorization = `Bearer ${loginDataParse?.token}`;
                // config.headers['Content-Type'] = 'multipart/form-data';
            }
        } catch (error) {
            config.validateStatus = (status) => status < 500;
        } finally {
            return config;
        }
    },
    (error) => Promise.reject(error),
);

baseInstance.defaults.timeout = 60000;

baseInstance.interceptors.response.use(
    (response) => {
        // console.log('====================================');
        // console.log('res: ', response.headers['content-disposition']);
        // console.log('====================================');
        return response;
    },
    async (error) => {
        // console.log('====================================');
        // console.log('error', error);
        // console.log('====================================');
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            //   const loginData = await localStorage.getItem('loginPage')

            //   const response = await refreshAccessToken(refreshToken)
            //   if (response && response.data && response.data.access_token) {
            //     // console.log('response success', response);

            //     axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
            //     await localStorage.setItem('loginPage', JSON.stringify(response.data))

            //     return baseInstance(originalRequest)
            //   } else {
            //     eventEmitter.emit('reset')
            //   }
        }

        return Promise.reject(error);
    },
);

export default baseInstance;
